export const API_URL = 'https://profiseebespokedbikesapi.azurewebsites.net/api/customers';

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};
export const API_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
export const API_ERROR_MESSAGES = {
  FETCH_ERROR: 'Failed to fetch data from the API',
  MUTATION_ERROR: 'Failed to perform the mutation',
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Internal server error',
  UNKNOWN_ERROR: 'An unknown error occurred',
};
export const API_SUCCESS_MESSAGES = {
  FETCH_SUCCESS: 'Data fetched successfully',
  MUTATION_SUCCESS: 'Mutation performed successfully',
  DELETION_SUCCESS: 'Resource deleted successfully',
  UPDATE_SUCCESS: 'Resource updated successfully',
  CREATION_SUCCESS: 'Resource created successfully',
};
export const API_DEFAULT_OPTIONS = {
  method: API_METHODS.GET,
  headers: API_HEADERS,
  body: null,
  skip: false,
};