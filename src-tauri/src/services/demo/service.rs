use std::sync::RwLock;

pub struct DemoService {
    greeting_invocations: RwLock<i32>,
}

impl DemoService {
    pub fn new() -> Self {
        Self {
            greeting_invocations: RwLock::new(0),
        }
    }

    pub fn incr_greeting_invocations(&self) -> Result<(), String> {
        let mut counter = self
            .greeting_invocations
            .write()
            .map_err(|err| err.to_string())?;
        *counter = *counter + 1;
        Ok(())
    }

    pub fn get_greeting_invocations(&self) -> Result<i32, anyhow::Error> {
        match self.greeting_invocations.read() {
            Ok(counter) => Ok(*counter),
            Err(err) => Err(anyhow::anyhow!("Failed to get the greetings lock")),
        }
    }
}
