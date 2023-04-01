pub struct DemoService {
    greeting_invocations: i32,
}

impl DemoService {
    pub fn new() -> Self {
        Self {
            greeting_invocations: 0,
        }
    }

    pub fn incr_greeting_invocations(&mut self) {
        self.greeting_invocations += 1;
    }

    pub fn get_greeting_invocations(&self) -> i32 {
        return self.greeting_invocations;
    }
}
