import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2, Zap } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

interface UpgradeModalProps {
  children: React.ReactNode;
}

export function UpgradeModal({ children }: UpgradeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, update } = useSession();

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
      });
      
      const orderData = await res.json();
      
      if (!res.ok) {
        toast.error("Failed to start checkout. Please try again.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder_key",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "NeeDee",
        description: "Upgrade to Professional Tier",
        order_id: orderData.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          
          if (verifyRes.ok) {
            toast.success("Successfully upgraded to Pro!");
            await update({ isPro: true });
            setIsOpen(false);
          } else {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        theme: {
          color: "#f97316", // orange-500
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        toast.error(response.error.description || "Payment failed. Please try again.");
      });
      rzp.open();

    } catch (error) {
      toast.error("An error occurred starting checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-neutral-900 border border-neutral-800 shadow-2xl p-0 overflow-hidden">
        <div className="p-8 pb-6">
          <DialogHeader className="mb-4 text-left">
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-white mb-2">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
              </div>
              Upgrade to <span className="text-orange-500">Pro</span>
            </DialogTitle>
            <DialogDescription className="text-neutral-400 text-sm leading-relaxed">
              Unlock the full power of NeeDee and land your dream job faster.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-6">
            {[
              "Unlimited AI generation for resumes and cover letters",
              "Advanced ATS keyword optimization",
              "Premium designer templates",
              "Priority customer support"
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-6 pt-0">
          <Button 
            onClick={handleUpgrade} 
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-xl text-md shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
          >
            {isLoading ? "Processing..." : "Upgrade Now for $12/mo"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
