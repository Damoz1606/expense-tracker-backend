import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import PrismaRepository from "src/shared/prisma/prisma.repository";
import { PrismaService } from "src/shared/prisma/prisma.service";

@Injectable()
export class BudgetRepository extends PrismaRepository<Prisma.BudgetDelegate>([
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
        super(prisma.budget);
    }
}