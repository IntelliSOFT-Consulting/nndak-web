-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "pasteurizedBal" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "unPasteurizedBal" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
