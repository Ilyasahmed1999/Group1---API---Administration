/*
  Warnings:

  - You are about to drop the column `delivery_time` on the `Order` table. All the data in the column will be lost.
  - Added the required column `deliverytime` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivery_time",
ADD COLUMN     "deliverytime" TEXT NOT NULL;
