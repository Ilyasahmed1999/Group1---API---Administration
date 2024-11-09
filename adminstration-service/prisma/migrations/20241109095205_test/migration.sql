/*
  Warnings:

  - Added the required column `delivery_time` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "delivery_time" TEXT NOT NULL;
