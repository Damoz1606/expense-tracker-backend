import { Controller, Get } from "@nestjs/common";
import { BudgetActivityService } from "../services/budget-activity.service";
import { ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { plainToInstance } from "class-transformer";
import { BudgetActivityArray } from "../dto/response/budget-activity-array.dto";

@ApiTags('Budget')
@Controller('budget/activity')
export class BudgetActivityController {
    constructor(
        private readonly service: BudgetActivityService
    ) { }

    @Get()
    async findActivity(
        @CurrentUser() user: number
    ): Promise<BudgetActivityArray> {
        const data = await this.service.findMany(user);
        return plainToInstance(BudgetActivityArray, { data });
    }
}