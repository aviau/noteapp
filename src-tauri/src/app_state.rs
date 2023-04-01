use crate::services::demo::DemoService;
use std::sync::Mutex;

pub struct AppState {
    pub demo_service: Mutex<DemoService>,
}

impl AppState {
    pub fn new(demo_service: DemoService) -> Self {
        Self {
            demo_service: Mutex::new(demo_service),
        }
    }
}
