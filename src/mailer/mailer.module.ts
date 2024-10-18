import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigurableModuleClass } from './mailer.module-definition';

@Global()
@Module({
    providers: [MailerService],
    exports: [MailerService]
})
export class MailerModule extends ConfigurableModuleClass { }
