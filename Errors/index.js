class CreateError extends Error {
    constructor(message, code) {
      super(message); // Call the super constructor and pass the error message
  
      this.name = this.constructor.name; // Set the error name to the class name
      this.code = code || 500; // Set a default error code if not provided
  
      // Ensure the error prototype chain is correctly set up
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }

  
export { CreateError };
  