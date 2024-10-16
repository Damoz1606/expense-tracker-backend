import { Inject } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import PrismaRepository from "src/shared/prisma/prisma.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";

export class ExpenseRepository extends PrismaRepository<Prisma.ExpenseDelegate>([
    "aggregate",
    "count",
    "create",
    "createMany",
    "delete",
    "findFirst",
    "findFirstOrThrow",
    "findMany",
    "findUnique",
    "findUniqueOrThrow",
    "update",
    "updateMany",
    "upsert"
]) {
    constructor(
        @Inject(PrismaService) prisma: PrismaService
    ) {
        super(prisma.expense);
    }
}