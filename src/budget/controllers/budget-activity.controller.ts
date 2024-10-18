import { Controller, Get, UseGuards } from "@nestjs/common";
import { BudgetActivityService } from "../services/budget-activity.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { plainToInstance } from "class-transformer";
import { BudgetActivityArray } from "../dto/response/budget-activity-array.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TokenPayload } from "src/auth/token/token.payload";

@ApiTags('Budget')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('budget/activity')
export class BudgetActivityController {
    constructor(
        private readonly service: BudgetActivityService
    ) { }

    @Get()
    async findActivity(
        @CurrentUser() user: TokenPayload
    ): Promise<BudgetActivityArray> {
        const data = await this.service.findMany(user.sub);
        return plainToInstance(BudgetActivityArray, { data });
    }
}