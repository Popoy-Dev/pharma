const projectSchema = {
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string',
      primaryKey: true,
      autoIncrement: true,
      maxLength: 100, // <- the primary key must have set maxLength
    },
    name: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
  required: ['name', 'location', 'status'],
};

const employeeSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100, // <- the primary key must have set maxLength
    },
    name: {
      type: 'string',
    },
    position: {
      type: 'string',
    },
    rate: {
      type: 'number',
    },
    gcash: {
      type: 'number',
    },
  },
  required: ['id', 'name', 'position', 'rate', 'gcash'],
};

const weeklyLogSchema = {
  version: 0, // Schema version (you can increment this if you make changes)
  primaryKey: 'id',
  type: 'object',

  // Properties of the weeklylog document
  properties: {
    id: {
      type: 'string', // Type of the ID (you can use 'string' or other suitable types)
      primary: true, // Marks this field as the primary key
    },
    employeeId: {
      type: 'string', // Type for employee ID (use appropriate type)
      ref: 'employee', // Reference to an "employee" collection/table (if applicable)
    },
    weekNumber: {
      type: 'integer', // Type for weekNumber (assuming it's an integer)
    },
    overTimeHours: {
      type: 'number', // Type for overTimeHours (assuming it's a numeric value)
    },
    overTimePay: {
      type: 'number', // Type for overTimePay (assuming it's a numeric value)
    },
    reimbursement: {
      type: 'number', // Type for reimbursement (assuming it's a numeric value)
    },
    cashAdvance: {
      type: 'number', // Type for cashAdvance (assuming it's a numeric value)
    },
    dailyLog: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string', // Type of the ID (you can use 'string' or other suitable types)
            primary: true, // Marks this field as the primary key
          },
          employeeId: {
            type: 'string', // Type for employee ID (use appropriate type)
            ref: 'employee', // Reference to an "employee" collection/table (if applicable)
          },
          date: {
            type: 'string', // Type for the date (you can use 'string', 'date', or 'timestamp' depending on your needs)
            format: 'date', // Format specifier for the date field
          },
          hasWork: {
            type: 'boolean', // Type for the "hasWork" field (assuming it's a boolean value)
          },
        },
      },
    },
  },

  // Optional indexes for querying
  indexes: ['weekNumber', 'employeeId'],
};

export { projectSchema, employeeSchema, weeklyLogSchema };
