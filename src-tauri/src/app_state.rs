use crate::services::app_config::AppConfigService;
use crate::services::demo::DemoService;

pub struct AppState {
    app_config_service: AppConfigService,
    demo_service: DemoService,
}

impl AppState {
    pub fn new(app_config_service: AppConfigService, demo_service: DemoService) -> Self {
        Self {
            app_config_service: app_config_service,
            demo_service: demo_service,
        }
    }

    pub fn get_app_config_service(&self) -> &AppConfigService {
        return &self.app_config_service;
    }

    pub fn get_demo_service(&self) -> &DemoService {
        return &self.demo_service;
    }
}
