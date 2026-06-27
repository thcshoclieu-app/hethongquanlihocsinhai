# API Documentation

## Firebase Firestore Collections

### 1. `users`
- `uid`: string (Primary Key)
- `email`: string
- `role`: 'ADMIN' | 'TEACHER' | 'ASSISTANT'
- `createdAt`: timestamp

### 2. `students`
- `id`: string
- `name`: string
- `classId`: string
- `dob`: string
- `faceEmbedding`: number[]

### 3. `attendance`
- `id`: string
- `studentId`: string
- `date`: string
- `status`: 'PRESENT' | 'ABSENT' | 'LATE'
- `recordedBy`: string

### 4. `tuitionPlans`
- `id`: string
- `name`: string
- `amount`: number
- `frequency`: 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
