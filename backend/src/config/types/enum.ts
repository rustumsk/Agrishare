export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,      // Optional: when a request has been accepted for processing, but not yet completed
    NO_CONTENT = 204,    // Optional: when the request has been successfully processed, but there's no content to return
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,      // Added: when there's a conflict with the current state of the resource (e.g., user already exists)
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503  // Optional: when the server is temporarily unable to handle the request (e.g., maintenance)
}