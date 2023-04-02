use crate::services::demo::DemoService;

pub struct AppState {
    demo_service: DemoService,
}

impl AppState {
    pub fn new(demo_service: DemoService) -> Self {
        Self {
            demo_service: demo_service,
        }
    }

    pub fn get_demo_service(&self) -> &DemoService {
        return &self.demo_service;
    }
}
