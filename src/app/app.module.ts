import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2bStorefrontModule, defaultB2bOccConfig } from '@spartacus/setup';
import { provideDefaultConfig } from '@spartacus/core';
import { AdministrationRootModule } from '@spartacus/organization/administration/root';
import { provideConfig } from '@spartacus/core';
import { organizationTranslations } from '@spartacus/organization/administration/assets';
import { organizationTranslationChunksConfig } from '@spartacus/organization/administration/assets';
import { OrderApprovalRootModule } from '@spartacus/organization/order-approval/root';
import { orderApprovalTranslations } from '@spartacus/organization/order-approval/assets';
import { orderApprovalTranslationChunksConfig } from '@spartacus/organization/order-approval/assets';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    B2bStorefrontModule.withConfig({
      featureModules: {
        organizationOrderApproval: {
        module: () => import('@spartacus/organization/order-approval').then(
          (m) => m.OrderApprovalModule
        ),
        },
        organizationAdministration: {
          module: () => import('@spartacus/organization/administration').then(
          (m) => m.AdministrationModule
        ),
        },
      },
      backend: {
        occ: {
         // baseUrl: 'https://localhost:9002'
          baseUrl: 'https://spartacus-demo.eastus.cloudapp.azure.com:8443',
          prefix: '/occ/v2/'
        }
      },
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['electronics-spa','apparel-uk-spa', 'powertools-spa'],
        currency: ['USD', 'GBP',]
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      },
      features: {
        level: '3.1'
      }
    }),
    AdministrationRootModule,
    OrderApprovalRootModule
  ],
  providers: [provideDefaultConfig(defaultB2bOccConfig),
    provideConfig({
      i18n: {
        resources: organizationTranslations,
        chunks: organizationTranslationChunksConfig,
      },
    }),
    
    provideConfig({
      i18n: {
        resources: orderApprovalTranslations,
        chunks: orderApprovalTranslationChunksConfig,
      },
    })],
  bootstrap: [AppComponent]
})
export class AppModule { }
