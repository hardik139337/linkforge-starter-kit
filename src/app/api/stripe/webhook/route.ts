import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as { customer: string };
      await prisma.user.update({
        where: { stripeCustomerId: session.customer as string },
        data: { plan: "pro" },
      });
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as unknown as {
        customer: string;
        current_period_end: number;
        plan: { id: string };
      };
      await prisma.user.update({
        where: { stripeCustomerId: subscription.customer as string },
        data: {
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          stripePriceId: subscription.plan?.id,
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const deletedSub = event.data.object as { customer: string };
      await prisma.user.update({
        where: { stripeCustomerId: deletedSub.customer as string },
        data: { plan: "free" },
      });
      break;
    }
  }

  return Response.json({ received: true });
}
