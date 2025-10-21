import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  email?: string;
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, onClose, onVerify, email }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.trim().length === 6) {
      onVerify(otp);
      setOtp("");
    } else {
      alert("Enter a valid 6-digit OTP");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>OTP Verification</DialogTitle>
        </DialogHeader>

        {email && <p className="text-sm text-gray-500 mb-4">OTP sent to {email}</p>}

        <div className="space-y-2">
          <Label htmlFor="otp">Enter OTP</Label>
          <Input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleVerify}>Verify</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPModal;
