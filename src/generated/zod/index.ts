import { z } from 'zod'
import type { Prisma } from '../prisma/client'

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
	'ReadUncommitted',
	'ReadCommitted',
	'RepeatableRead',
	'Serializable',
])

export const CompanyScalarFieldEnumSchema = z.enum(['id', 'name', 'createdAt'])

export const UserScalarFieldEnumSchema = z.enum([
	'id',
	'email',
	'name',
	'role',
	'hours',
	'hourlyRate',
	'companyId',
	'createdAt',
])

export const WorkLogScalarFieldEnumSchema = z.enum(['id', 'userId', 'date', 'hours', 'paid', 'note', 'createdAt'])

export const SortOrderSchema = z.enum(['asc', 'desc'])

export const QueryModeSchema = z.enum(['default', 'insensitive'])

export const NullsOrderSchema = z.enum(['first', 'last'])

export const RoleSchema = z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE'])

export type RoleType = `${z.infer<typeof RoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
	id: z.uuid(),
	name: z.string(),
	createdAt: z.coerce.date(),
})

export type Company = z.infer<typeof CompanySchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
	role: RoleSchema,
	id: z.string(),
	email: z.string(),
	name: z.string(),
	hours: z.number().nullable(),
	hourlyRate: z.number().nullable(),
	companyId: z.string(),
	createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// WORK LOG SCHEMA
/////////////////////////////////////////

export const WorkLogSchema = z.object({
	id: z.uuid(),
	userId: z.string(),
	date: z.coerce.date(),
	hours: z.number(),
	paid: z.boolean(),
	note: z.string().nullable(),
	createdAt: z.coerce.date(),
})

export type WorkLog = z.infer<typeof WorkLogSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// COMPANY
//------------------------------------------------------

export const CompanyIncludeSchema: z.ZodType<Prisma.CompanyInclude> = z
	.object({
		users: z.union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)]).optional(),
		_count: z.union([z.boolean(), z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
	})
	.strict()

export const CompanyArgsSchema: z.ZodType<Prisma.CompanyDefaultArgs> = z
	.object({
		select: z.lazy(() => CompanySelectSchema).optional(),
		include: z.lazy(() => CompanyIncludeSchema).optional(),
	})
	.strict()

export const CompanyCountOutputTypeArgsSchema: z.ZodType<Prisma.CompanyCountOutputTypeDefaultArgs> = z
	.object({
		select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish(),
	})
	.strict()

export const CompanyCountOutputTypeSelectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> = z
	.object({
		users: z.boolean().optional(),
	})
	.strict()

export const CompanySelectSchema: z.ZodType<Prisma.CompanySelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		users: z.union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)]).optional(),
		_count: z.union([z.boolean(), z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
	})
	.strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
	.object({
		company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
		workLogs: z.union([z.boolean(), z.lazy(() => WorkLogFindManyArgsSchema)]).optional(),
		_count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
	})
	.strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
	.object({
		select: z.lazy(() => UserSelectSchema).optional(),
		include: z.lazy(() => UserIncludeSchema).optional(),
	})
	.strict()

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z
	.object({
		select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
	})
	.strict()

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z
	.object({
		workLogs: z.boolean().optional(),
	})
	.strict()

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
	.object({
		id: z.boolean().optional(),
		email: z.boolean().optional(),
		name: z.boolean().optional(),
		role: z.boolean().optional(),
		hours: z.boolean().optional(),
		hourlyRate: z.boolean().optional(),
		companyId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
		workLogs: z.union([z.boolean(), z.lazy(() => WorkLogFindManyArgsSchema)]).optional(),
		_count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
	})
	.strict()

// WORK LOG
//------------------------------------------------------

export const WorkLogIncludeSchema: z.ZodType<Prisma.WorkLogInclude> = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict()

export const WorkLogArgsSchema: z.ZodType<Prisma.WorkLogDefaultArgs> = z
	.object({
		select: z.lazy(() => WorkLogSelectSchema).optional(),
		include: z.lazy(() => WorkLogIncludeSchema).optional(),
	})
	.strict()

export const WorkLogSelectSchema: z.ZodType<Prisma.WorkLogSelect> = z
	.object({
		id: z.boolean().optional(),
		userId: z.boolean().optional(),
		date: z.boolean().optional(),
		hours: z.boolean().optional(),
		paid: z.boolean().optional(),
		note: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
	})
	.strict()

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CompanyWhereInputSchema: z.ZodType<Prisma.CompanyWhereInput> = z.strictObject({
	AND: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
	OR: z
		.lazy(() => CompanyWhereInputSchema)
		.array()
		.optional(),
	NOT: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
	id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
	users: z.lazy(() => UserListRelationFilterSchema).optional(),
})

export const CompanyOrderByWithRelationInputSchema: z.ZodType<Prisma.CompanyOrderByWithRelationInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	name: z.lazy(() => SortOrderSchema).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
	users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
})

export const CompanyWhereUniqueInputSchema: z.ZodType<Prisma.CompanyWhereUniqueInput> = z
	.object({
		id: z.uuid(),
	})
	.and(
		z.strictObject({
			id: z.uuid().optional(),
			AND: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
			OR: z
				.lazy(() => CompanyWhereInputSchema)
				.array()
				.optional(),
			NOT: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
			name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
			users: z.lazy(() => UserListRelationFilterSchema).optional(),
		}),
	)

export const CompanyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		_count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
		_max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
		_min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional(),
	})

export const CompanyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),
				z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => CompanyScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),
				z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
		name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
		createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
	})

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
	AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
	OR: z
		.lazy(() => UserWhereInputSchema)
		.array()
		.optional(),
	NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
	id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
	hours: z
		.union([z.lazy(() => FloatNullableFilterSchema), z.number()])
		.optional()
		.nullable(),
	hourlyRate: z
		.union([z.lazy(() => FloatNullableFilterSchema), z.number()])
		.optional()
		.nullable(),
	companyId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
	company: z.union([z.lazy(() => CompanyScalarRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema)]).optional(),
	workLogs: z.lazy(() => WorkLogListRelationFilterSchema).optional(),
})

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	email: z.lazy(() => SortOrderSchema).optional(),
	name: z.lazy(() => SortOrderSchema).optional(),
	role: z.lazy(() => SortOrderSchema).optional(),
	hours: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
	hourlyRate: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
	companyId: z.lazy(() => SortOrderSchema).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
	company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
	workLogs: z.lazy(() => WorkLogOrderByRelationAggregateInputSchema).optional(),
})

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z
	.union([
		z.object({
			id: z.string(),
			email: z.string(),
		}),
		z.object({
			id: z.string(),
		}),
		z.object({
			email: z.string(),
		}),
	])
	.and(
		z.strictObject({
			id: z.string().optional(),
			email: z.string().optional(),
			AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
			OR: z
				.lazy(() => UserWhereInputSchema)
				.array()
				.optional(),
			NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
			name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
			hours: z
				.union([z.lazy(() => FloatNullableFilterSchema), z.number()])
				.optional()
				.nullable(),
			hourlyRate: z
				.union([z.lazy(() => FloatNullableFilterSchema), z.number()])
				.optional()
				.nullable(),
			companyId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
			company: z
				.union([z.lazy(() => CompanyScalarRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema)])
				.optional(),
			workLogs: z.lazy(() => WorkLogListRelationFilterSchema).optional(),
		}),
	)

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	email: z.lazy(() => SortOrderSchema).optional(),
	name: z.lazy(() => SortOrderSchema).optional(),
	role: z.lazy(() => SortOrderSchema).optional(),
	hours: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
	hourlyRate: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
	companyId: z.lazy(() => SortOrderSchema).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
	_count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
	_avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
	_max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
	_min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
	_sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional(),
})

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
				z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => UserScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
				z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
		email: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
		name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
		role: z.union([z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema)]).optional(),
		hours: z
			.union([z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number()])
			.optional()
			.nullable(),
		hourlyRate: z
			.union([z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number()])
			.optional()
			.nullable(),
		companyId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
		createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
	})

export const WorkLogWhereInputSchema: z.ZodType<Prisma.WorkLogWhereInput> = z.strictObject({
	AND: z.union([z.lazy(() => WorkLogWhereInputSchema), z.lazy(() => WorkLogWhereInputSchema).array()]).optional(),
	OR: z
		.lazy(() => WorkLogWhereInputSchema)
		.array()
		.optional(),
	NOT: z.union([z.lazy(() => WorkLogWhereInputSchema), z.lazy(() => WorkLogWhereInputSchema).array()]).optional(),
	id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	date: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
	hours: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
	paid: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
	note: z
		.union([z.lazy(() => StringNullableFilterSchema), z.string()])
		.optional()
		.nullable(),
	createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
	user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
})

export const WorkLogOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkLogOrderByWithRelationInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	userId: z.lazy(() => SortOrderSchema).optional(),
	date: z.lazy(() => SortOrderSchema).optional(),
	hours: z.lazy(() => SortOrderSchema).optional(),
	paid: z.lazy(() => SortOrderSchema).optional(),
	note: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
	user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
})

export const WorkLogWhereUniqueInputSchema: z.ZodType<Prisma.WorkLogWhereUniqueInput> = z
	.object({
		id: z.uuid(),
	})
	.and(
		z.strictObject({
			id: z.uuid().optional(),
			AND: z.union([z.lazy(() => WorkLogWhereInputSchema), z.lazy(() => WorkLogWhereInputSchema).array()]).optional(),
			OR: z
				.lazy(() => WorkLogWhereInputSchema)
				.array()
				.optional(),
			NOT: z.union([z.lazy(() => WorkLogWhereInputSchema), z.lazy(() => WorkLogWhereInputSchema).array()]).optional(),
			userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			date: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
			hours: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
			paid: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
			note: z
				.union([z.lazy(() => StringNullableFilterSchema), z.string()])
				.optional()
				.nullable(),
			createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
			user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
		}),
	)

export const WorkLogOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkLogOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		date: z.lazy(() => SortOrderSchema).optional(),
		hours: z.lazy(() => SortOrderSchema).optional(),
		paid: z.lazy(() => SortOrderSchema).optional(),
		note: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		_count: z.lazy(() => WorkLogCountOrderByAggregateInputSchema).optional(),
		_avg: z.lazy(() => WorkLogAvgOrderByAggregateInputSchema).optional(),
		_max: z.lazy(() => WorkLogMaxOrderByAggregateInputSchema).optional(),
		_min: z.lazy(() => WorkLogMinOrderByAggregateInputSchema).optional(),
		_sum: z.lazy(() => WorkLogSumOrderByAggregateInputSchema).optional(),
	})

export const WorkLogScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkLogScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => WorkLogScalarWhereWithAggregatesInputSchema),
				z.lazy(() => WorkLogScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => WorkLogScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => WorkLogScalarWhereWithAggregatesInputSchema),
				z.lazy(() => WorkLogScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
		date: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
		hours: z.union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()]).optional(),
		paid: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
		note: z
			.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
			.optional()
			.nullable(),
		createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
	})

export const CompanyCreateInputSchema: z.ZodType<Prisma.CompanyCreateInput> = z.strictObject({
	id: z.uuid().optional(),
	name: z.string(),
	createdAt: z.coerce.date().optional(),
	users: z.lazy(() => UserCreateNestedManyWithoutCompanyInputSchema).optional(),
})

export const CompanyUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> = z.strictObject({
	id: z.uuid().optional(),
	name: z.string(),
	createdAt: z.coerce.date().optional(),
	users: z.lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
})

export const CompanyUpdateInputSchema: z.ZodType<Prisma.CompanyUpdateInput> = z.strictObject({
	id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	users: z.lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema).optional(),
})

export const CompanyUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateInput> = z.strictObject({
	id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	users: z.lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
})

export const CompanyCreateManyInputSchema: z.ZodType<Prisma.CompanyCreateManyInput> = z.strictObject({
	id: z.uuid().optional(),
	name: z.string(),
	createdAt: z.coerce.date().optional(),
})

export const CompanyUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUpdateManyMutationInput> = z.strictObject({
	id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
})

export const CompanyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyInput> = z.strictObject({
	id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
})

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
	id: z.string(),
	email: z.string(),
	name: z.string(),
	role: z.lazy(() => RoleSchema).optional(),
	hours: z.number().optional().nullable(),
	hourlyRate: z.number().optional().nullable(),
	createdAt: z.coerce.date().optional(),
	company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema),
	workLogs: z.lazy(() => WorkLogCreateNestedManyWithoutUserInputSchema).optional(),
})

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
	id: z.string(),
	email: z.string(),
	name: z.string(),
	role: z.lazy(() => RoleSchema).optional(),
	hours: z.number().optional().nullable(),
	hourlyRate: z.number().optional().nullable(),
	companyId: z.string(),
	createdAt: z.coerce.date().optional(),
	workLogs: z.lazy(() => WorkLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
})

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
	id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
	hours: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	hourlyRate: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	company: z.lazy(() => CompanyUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
	workLogs: z.lazy(() => WorkLogUpdateManyWithoutUserNestedInputSchema).optional(),
})

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
	id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
	hours: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	hourlyRate: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	companyId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	workLogs: z.lazy(() => WorkLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
})

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
	id: z.string(),
	email: z.string(),
	name: z.string(),
	role: z.lazy(() => RoleSchema).optional(),
	hours: z.number().optional().nullable(),
	hourlyRate: z.number().optional().nullable(),
	companyId: z.string(),
	createdAt: z.coerce.date().optional(),
})

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
	id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
	hours: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	hourlyRate: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
})

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
	id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
	hours: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	hourlyRate: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	companyId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
})

export const WorkLogCreateInputSchema: z.ZodType<Prisma.WorkLogCreateInput> = z.strictObject({
	id: z.uuid().optional(),
	date: z.coerce.date(),
	hours: z.number(),
	paid: z.boolean().optional(),
	note: z.string().optional().nullable(),
	createdAt: z.coerce.date().optional(),
	user: z.lazy(() => UserCreateNestedOneWithoutWorkLogsInputSchema),
})

export const WorkLogUncheckedCreateInputSchema: z.ZodType<Prisma.WorkLogUncheckedCreateInput> = z.strictObject({
	id: z.uuid().optional(),
	userId: z.string(),
	date: z.coerce.date(),
	hours: z.number(),
	paid: z.boolean().optional(),
	note: z.string().optional().nullable(),
	createdAt: z.coerce.date().optional(),
})

export const WorkLogUpdateInputSchema: z.ZodType<Prisma.WorkLogUpdateInput> = z.strictObject({
	id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	hours: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
	paid: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
	note: z
		.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	user: z.lazy(() => UserUpdateOneRequiredWithoutWorkLogsNestedInputSchema).optional(),
})

export const WorkLogUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkLogUncheckedUpdateInput> = z.strictObject({
	id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]),
	userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]),
	hours: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
	paid: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
	note: z
		.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
})

export const WorkLogCreateManyInputSchema: z.ZodType<Prisma.WorkLogCreateManyInput> = z.strictObject({
	id: z.uuid().optional(),
	userId: z.string(),
	date: z.coerce.date(),
	hours: z.number(),
	paid: z.boolean().optional(),
	note: z.string().optional().nullable(),
	createdAt: z.coerce.date().optional(),
})

export const WorkLogUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkLogUpdateManyMutationInput> = z.strictObject({
	id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	hours: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
	paid: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
	note: z
		.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
})

export const WorkLogUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkLogUncheckedUpdateManyInput> = z.strictObject({
	id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	hours: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
	paid: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
	note: z
		.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
})

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
	equals: z.string().optional(),
	in: z.string().array().optional(),
	notIn: z.string().array().optional(),
	lt: z.string().optional(),
	lte: z.string().optional(),
	gt: z.string().optional(),
	gte: z.string().optional(),
	contains: z.string().optional(),
	startsWith: z.string().optional(),
	endsWith: z.string().optional(),
	mode: z.lazy(() => QueryModeSchema).optional(),
	not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
})

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
	equals: z.coerce.date().optional(),
	in: z.coerce.date().array().optional(),
	notIn: z.coerce.date().array().optional(),
	lt: z.coerce.date().optional(),
	lte: z.coerce.date().optional(),
	gt: z.coerce.date().optional(),
	gte: z.coerce.date().optional(),
	not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
})

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.strictObject({
	every: z.lazy(() => UserWhereInputSchema).optional(),
	some: z.lazy(() => UserWhereInputSchema).optional(),
	none: z.lazy(() => UserWhereInputSchema).optional(),
})

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> =
	z.strictObject({
		_count: z.lazy(() => SortOrderSchema).optional(),
	})

export const CompanyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	})

export const CompanyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMaxOrderByAggregateInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	name: z.lazy(() => SortOrderSchema).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
})

export const CompanyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMinOrderByAggregateInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	name: z.lazy(() => SortOrderSchema).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
})

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
	equals: z.string().optional(),
	in: z.string().array().optional(),
	notIn: z.string().array().optional(),
	lt: z.string().optional(),
	lte: z.string().optional(),
	gt: z.string().optional(),
	gte: z.string().optional(),
	contains: z.string().optional(),
	startsWith: z.string().optional(),
	endsWith: z.string().optional(),
	mode: z.lazy(() => QueryModeSchema).optional(),
	not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
	_count: z.lazy(() => NestedIntFilterSchema).optional(),
	_min: z.lazy(() => NestedStringFilterSchema).optional(),
	_max: z.lazy(() => NestedStringFilterSchema).optional(),
})

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
	equals: z.coerce.date().optional(),
	in: z.coerce.date().array().optional(),
	notIn: z.coerce.date().array().optional(),
	lt: z.coerce.date().optional(),
	lte: z.coerce.date().optional(),
	gt: z.coerce.date().optional(),
	gte: z.coerce.date().optional(),
	not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
	_count: z.lazy(() => NestedIntFilterSchema).optional(),
	_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
	_max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
})

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.strictObject({
	equals: z.lazy(() => RoleSchema).optional(),
	in: z
		.lazy(() => RoleSchema)
		.array()
		.optional(),
	notIn: z
		.lazy(() => RoleSchema)
		.array()
		.optional(),
	not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema)]).optional(),
})

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.strictObject({
	equals: z.number().optional().nullable(),
	in: z.number().array().optional().nullable(),
	notIn: z.number().array().optional().nullable(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z
		.union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
		.optional()
		.nullable(),
})

export const CompanyScalarRelationFilterSchema: z.ZodType<Prisma.CompanyScalarRelationFilter> = z.strictObject({
	is: z.lazy(() => CompanyWhereInputSchema).optional(),
	isNot: z.lazy(() => CompanyWhereInputSchema).optional(),
})

export const WorkLogListRelationFilterSchema: z.ZodType<Prisma.WorkLogListRelationFilter> = z.strictObject({
	every: z.lazy(() => WorkLogWhereInputSchema).optional(),
	some: z.lazy(() => WorkLogWhereInputSchema).optional(),
	none: z.lazy(() => WorkLogWhereInputSchema).optional(),
})

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
	sort: z.lazy(() => SortOrderSchema),
	nulls: z.lazy(() => NullsOrderSchema).optional(),
})

export const WorkLogOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkLogOrderByRelationAggregateInput> =
	z.strictObject({
		_count: z.lazy(() => SortOrderSchema).optional(),
	})

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	email: z.lazy(() => SortOrderSchema).optional(),
	name: z.lazy(() => SortOrderSchema).optional(),
	role: z.lazy(() => SortOrderSchema).optional(),
	hours: z.lazy(() => SortOrderSchema).optional(),
	hourlyRate: z.lazy(() => SortOrderSchema).optional(),
	companyId: z.lazy(() => SortOrderSchema).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
})

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.strictObject({
	hours: z.lazy(() => SortOrderSchema).optional(),
	hourlyRate: z.lazy(() => SortOrderSchema).optional(),
})

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	email: z.lazy(() => SortOrderSchema).optional(),
	name: z.lazy(() => SortOrderSchema).optional(),
	role: z.lazy(() => SortOrderSchema).optional(),
	hours: z.lazy(() => SortOrderSchema).optional(),
	hourlyRate: z.lazy(() => SortOrderSchema).optional(),
	companyId: z.lazy(() => SortOrderSchema).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
})

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	email: z.lazy(() => SortOrderSchema).optional(),
	name: z.lazy(() => SortOrderSchema).optional(),
	role: z.lazy(() => SortOrderSchema).optional(),
	hours: z.lazy(() => SortOrderSchema).optional(),
	hourlyRate: z.lazy(() => SortOrderSchema).optional(),
	companyId: z.lazy(() => SortOrderSchema).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
})

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.strictObject({
	hours: z.lazy(() => SortOrderSchema).optional(),
	hourlyRate: z.lazy(() => SortOrderSchema).optional(),
})

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.strictObject({
	equals: z.lazy(() => RoleSchema).optional(),
	in: z
		.lazy(() => RoleSchema)
		.array()
		.optional(),
	notIn: z
		.lazy(() => RoleSchema)
		.array()
		.optional(),
	not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema)]).optional(),
	_count: z.lazy(() => NestedIntFilterSchema).optional(),
	_min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
	_max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
})

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> =
	z.strictObject({
		equals: z.number().optional().nullable(),
		in: z.number().array().optional().nullable(),
		notIn: z.number().array().optional().nullable(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema)])
			.optional()
			.nullable(),
		_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
		_avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
		_sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
		_min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
		_max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
	})

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.strictObject({
	equals: z.number().optional(),
	in: z.number().array().optional(),
	notIn: z.number().array().optional(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
})

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
	equals: z.boolean().optional(),
	not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
})

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
	equals: z.string().optional().nullable(),
	in: z.string().array().optional().nullable(),
	notIn: z.string().array().optional().nullable(),
	lt: z.string().optional(),
	lte: z.string().optional(),
	gt: z.string().optional(),
	gte: z.string().optional(),
	contains: z.string().optional(),
	startsWith: z.string().optional(),
	endsWith: z.string().optional(),
	mode: z.lazy(() => QueryModeSchema).optional(),
	not: z
		.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
		.optional()
		.nullable(),
})

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
	is: z.lazy(() => UserWhereInputSchema).optional(),
	isNot: z.lazy(() => UserWhereInputSchema).optional(),
})

export const WorkLogCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkLogCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		date: z.lazy(() => SortOrderSchema).optional(),
		hours: z.lazy(() => SortOrderSchema).optional(),
		paid: z.lazy(() => SortOrderSchema).optional(),
		note: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	})

export const WorkLogAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkLogAvgOrderByAggregateInput> = z.strictObject({
	hours: z.lazy(() => SortOrderSchema).optional(),
})

export const WorkLogMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkLogMaxOrderByAggregateInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	userId: z.lazy(() => SortOrderSchema).optional(),
	date: z.lazy(() => SortOrderSchema).optional(),
	hours: z.lazy(() => SortOrderSchema).optional(),
	paid: z.lazy(() => SortOrderSchema).optional(),
	note: z.lazy(() => SortOrderSchema).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
})

export const WorkLogMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkLogMinOrderByAggregateInput> = z.strictObject({
	id: z.lazy(() => SortOrderSchema).optional(),
	userId: z.lazy(() => SortOrderSchema).optional(),
	date: z.lazy(() => SortOrderSchema).optional(),
	hours: z.lazy(() => SortOrderSchema).optional(),
	paid: z.lazy(() => SortOrderSchema).optional(),
	note: z.lazy(() => SortOrderSchema).optional(),
	createdAt: z.lazy(() => SortOrderSchema).optional(),
})

export const WorkLogSumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkLogSumOrderByAggregateInput> = z.strictObject({
	hours: z.lazy(() => SortOrderSchema).optional(),
})

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.strictObject({
	equals: z.number().optional(),
	in: z.number().array().optional(),
	notIn: z.number().array().optional(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
	_count: z.lazy(() => NestedIntFilterSchema).optional(),
	_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
	_sum: z.lazy(() => NestedFloatFilterSchema).optional(),
	_min: z.lazy(() => NestedFloatFilterSchema).optional(),
	_max: z.lazy(() => NestedFloatFilterSchema).optional(),
})

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
	equals: z.boolean().optional(),
	not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
	_count: z.lazy(() => NestedIntFilterSchema).optional(),
	_min: z.lazy(() => NestedBoolFilterSchema).optional(),
	_max: z.lazy(() => NestedBoolFilterSchema).optional(),
})

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
	z.strictObject({
		equals: z.string().optional().nullable(),
		in: z.string().array().optional().nullable(),
		notIn: z.string().array().optional().nullable(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		mode: z.lazy(() => QueryModeSchema).optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
			.optional()
			.nullable(),
		_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
		_min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
		_max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
	})

export const UserCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutCompanyInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutCompanyInputSchema),
				z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),
				z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),
				z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array(),
			])
			.optional(),
		createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
		connect: z
			.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()])
			.optional(),
	})

export const UserUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutCompanyInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutCompanyInputSchema),
				z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),
				z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),
				z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array(),
			])
			.optional(),
		createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
		connect: z
			.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()])
			.optional(),
	})

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.string().optional(),
	})

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.coerce.date().optional(),
	})

export const UserUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutCompanyNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutCompanyInputSchema),
				z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),
				z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),
				z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema),
				z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema).array(),
			])
			.optional(),
		createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
		set: z
			.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()])
			.optional(),
		disconnect: z
			.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()])
			.optional(),
		delete: z
			.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()])
			.optional(),
		connect: z
			.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()])
			.optional(),
		update: z
			.union([
				z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema),
				z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema).array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema),
				z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema).array(),
			])
			.optional(),
		deleteMany: z
			.union([z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array()])
			.optional(),
	})

export const UserUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutCompanyNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutCompanyInputSchema),
				z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),
				z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),
				z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema),
				z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema).array(),
			])
			.optional(),
		createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
		set: z
			.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()])
			.optional(),
		disconnect: z
			.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()])
			.optional(),
		delete: z
			.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()])
			.optional(),
		connect: z
			.union([z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array()])
			.optional(),
		update: z
			.union([
				z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema),
				z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema).array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema),
				z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema).array(),
			])
			.optional(),
		deleteMany: z
			.union([z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array()])
			.optional(),
	})

export const CompanyCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutUsersInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => CompanyCreateWithoutUsersInputSchema),
				z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema),
			])
			.optional(),
		connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema).optional(),
		connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
	})

export const WorkLogCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WorkLogCreateNestedManyWithoutUserInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => WorkLogCreateWithoutUserInputSchema),
				z.lazy(() => WorkLogCreateWithoutUserInputSchema).array(),
				z.lazy(() => WorkLogUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => WorkLogUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => WorkLogCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => WorkLogCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		createMany: z.lazy(() => WorkLogCreateManyUserInputEnvelopeSchema).optional(),
		connect: z
			.union([z.lazy(() => WorkLogWhereUniqueInputSchema), z.lazy(() => WorkLogWhereUniqueInputSchema).array()])
			.optional(),
	})

export const WorkLogUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WorkLogUncheckedCreateNestedManyWithoutUserInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => WorkLogCreateWithoutUserInputSchema),
				z.lazy(() => WorkLogCreateWithoutUserInputSchema).array(),
				z.lazy(() => WorkLogUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => WorkLogUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => WorkLogCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => WorkLogCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		createMany: z.lazy(() => WorkLogCreateManyUserInputEnvelopeSchema).optional(),
		connect: z
			.union([z.lazy(() => WorkLogWhereUniqueInputSchema), z.lazy(() => WorkLogWhereUniqueInputSchema).array()])
			.optional(),
	})

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.lazy(() => RoleSchema).optional(),
	})

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.number().optional().nullable(),
		increment: z.number().optional(),
		decrement: z.number().optional(),
		multiply: z.number().optional(),
		divide: z.number().optional(),
	})

export const CompanyUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutUsersNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => CompanyCreateWithoutUsersInputSchema),
				z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema),
			])
			.optional(),
		connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema).optional(),
		upsert: z.lazy(() => CompanyUpsertWithoutUsersInputSchema).optional(),
		connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => CompanyUpdateToOneWithWhereWithoutUsersInputSchema),
				z.lazy(() => CompanyUpdateWithoutUsersInputSchema),
				z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema),
			])
			.optional(),
	})

export const WorkLogUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WorkLogUpdateManyWithoutUserNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => WorkLogCreateWithoutUserInputSchema),
				z.lazy(() => WorkLogCreateWithoutUserInputSchema).array(),
				z.lazy(() => WorkLogUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => WorkLogUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => WorkLogCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => WorkLogCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => WorkLogUpsertWithWhereUniqueWithoutUserInputSchema),
				z.lazy(() => WorkLogUpsertWithWhereUniqueWithoutUserInputSchema).array(),
			])
			.optional(),
		createMany: z.lazy(() => WorkLogCreateManyUserInputEnvelopeSchema).optional(),
		set: z
			.union([z.lazy(() => WorkLogWhereUniqueInputSchema), z.lazy(() => WorkLogWhereUniqueInputSchema).array()])
			.optional(),
		disconnect: z
			.union([z.lazy(() => WorkLogWhereUniqueInputSchema), z.lazy(() => WorkLogWhereUniqueInputSchema).array()])
			.optional(),
		delete: z
			.union([z.lazy(() => WorkLogWhereUniqueInputSchema), z.lazy(() => WorkLogWhereUniqueInputSchema).array()])
			.optional(),
		connect: z
			.union([z.lazy(() => WorkLogWhereUniqueInputSchema), z.lazy(() => WorkLogWhereUniqueInputSchema).array()])
			.optional(),
		update: z
			.union([
				z.lazy(() => WorkLogUpdateWithWhereUniqueWithoutUserInputSchema),
				z.lazy(() => WorkLogUpdateWithWhereUniqueWithoutUserInputSchema).array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => WorkLogUpdateManyWithWhereWithoutUserInputSchema),
				z.lazy(() => WorkLogUpdateManyWithWhereWithoutUserInputSchema).array(),
			])
			.optional(),
		deleteMany: z
			.union([z.lazy(() => WorkLogScalarWhereInputSchema), z.lazy(() => WorkLogScalarWhereInputSchema).array()])
			.optional(),
	})

export const WorkLogUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WorkLogUncheckedUpdateManyWithoutUserNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => WorkLogCreateWithoutUserInputSchema),
				z.lazy(() => WorkLogCreateWithoutUserInputSchema).array(),
				z.lazy(() => WorkLogUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => WorkLogUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => WorkLogCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => WorkLogCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => WorkLogUpsertWithWhereUniqueWithoutUserInputSchema),
				z.lazy(() => WorkLogUpsertWithWhereUniqueWithoutUserInputSchema).array(),
			])
			.optional(),
		createMany: z.lazy(() => WorkLogCreateManyUserInputEnvelopeSchema).optional(),
		set: z
			.union([z.lazy(() => WorkLogWhereUniqueInputSchema), z.lazy(() => WorkLogWhereUniqueInputSchema).array()])
			.optional(),
		disconnect: z
			.union([z.lazy(() => WorkLogWhereUniqueInputSchema), z.lazy(() => WorkLogWhereUniqueInputSchema).array()])
			.optional(),
		delete: z
			.union([z.lazy(() => WorkLogWhereUniqueInputSchema), z.lazy(() => WorkLogWhereUniqueInputSchema).array()])
			.optional(),
		connect: z
			.union([z.lazy(() => WorkLogWhereUniqueInputSchema), z.lazy(() => WorkLogWhereUniqueInputSchema).array()])
			.optional(),
		update: z
			.union([
				z.lazy(() => WorkLogUpdateWithWhereUniqueWithoutUserInputSchema),
				z.lazy(() => WorkLogUpdateWithWhereUniqueWithoutUserInputSchema).array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => WorkLogUpdateManyWithWhereWithoutUserInputSchema),
				z.lazy(() => WorkLogUpdateManyWithWhereWithoutUserInputSchema).array(),
			])
			.optional(),
		deleteMany: z
			.union([z.lazy(() => WorkLogScalarWhereInputSchema), z.lazy(() => WorkLogScalarWhereInputSchema).array()])
			.optional(),
	})

export const UserCreateNestedOneWithoutWorkLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWorkLogsInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutWorkLogsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutWorkLogsInputSchema),
			])
			.optional(),
		connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkLogsInputSchema).optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
	})

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.strictObject({
	set: z.number().optional(),
	increment: z.number().optional(),
	decrement: z.number().optional(),
	multiply: z.number().optional(),
	divide: z.number().optional(),
})

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
	set: z.boolean().optional(),
})

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.string().optional().nullable(),
	})

export const UserUpdateOneRequiredWithoutWorkLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWorkLogsNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutWorkLogsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutWorkLogsInputSchema),
			])
			.optional(),
		connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkLogsInputSchema).optional(),
		upsert: z.lazy(() => UserUpsertWithoutWorkLogsInputSchema).optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => UserUpdateToOneWithWhereWithoutWorkLogsInputSchema),
				z.lazy(() => UserUpdateWithoutWorkLogsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutWorkLogsInputSchema),
			])
			.optional(),
	})

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
	equals: z.string().optional(),
	in: z.string().array().optional(),
	notIn: z.string().array().optional(),
	lt: z.string().optional(),
	lte: z.string().optional(),
	gt: z.string().optional(),
	gte: z.string().optional(),
	contains: z.string().optional(),
	startsWith: z.string().optional(),
	endsWith: z.string().optional(),
	not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
})

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
	equals: z.coerce.date().optional(),
	in: z.coerce.date().array().optional(),
	notIn: z.coerce.date().array().optional(),
	lt: z.coerce.date().optional(),
	lte: z.coerce.date().optional(),
	gt: z.coerce.date().optional(),
	gte: z.coerce.date().optional(),
	not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
})

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
	z.strictObject({
		equals: z.string().optional(),
		in: z.string().array().optional(),
		notIn: z.string().array().optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedStringFilterSchema).optional(),
		_max: z.lazy(() => NestedStringFilterSchema).optional(),
	})

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
	equals: z.number().optional(),
	in: z.number().array().optional(),
	notIn: z.number().array().optional(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
})

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
	z.strictObject({
		equals: z.coerce.date().optional(),
		in: z.coerce.date().array().optional(),
		notIn: z.coerce.date().array().optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
		_max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
	})

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.strictObject({
	equals: z.lazy(() => RoleSchema).optional(),
	in: z
		.lazy(() => RoleSchema)
		.array()
		.optional(),
	notIn: z
		.lazy(() => RoleSchema)
		.array()
		.optional(),
	not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema)]).optional(),
})

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.strictObject({
	equals: z.number().optional().nullable(),
	in: z.number().array().optional().nullable(),
	notIn: z.number().array().optional().nullable(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z
		.union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
		.optional()
		.nullable(),
})

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => RoleSchema).optional(),
		in: z
			.lazy(() => RoleSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => RoleSchema)
			.array()
			.optional(),
		not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema)]).optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
	})

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> =
	z.strictObject({
		equals: z.number().optional().nullable(),
		in: z.number().array().optional().nullable(),
		notIn: z.number().array().optional().nullable(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema)])
			.optional()
			.nullable(),
		_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
		_avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
		_sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
		_min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
		_max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
	})

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
	equals: z.number().optional().nullable(),
	in: z.number().array().optional().nullable(),
	notIn: z.number().array().optional().nullable(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z
		.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
		.optional()
		.nullable(),
})

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
	equals: z.number().optional(),
	in: z.number().array().optional(),
	notIn: z.number().array().optional(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
})

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
	equals: z.boolean().optional(),
	not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
})

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
	equals: z.string().optional().nullable(),
	in: z.string().array().optional().nullable(),
	notIn: z.string().array().optional().nullable(),
	lt: z.string().optional(),
	lte: z.string().optional(),
	gt: z.string().optional(),
	gte: z.string().optional(),
	contains: z.string().optional(),
	startsWith: z.string().optional(),
	endsWith: z.string().optional(),
	not: z
		.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
		.optional()
		.nullable(),
})

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.strictObject({
	equals: z.number().optional(),
	in: z.number().array().optional(),
	notIn: z.number().array().optional(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z.union([z.number(), z.lazy(() => NestedFloatWithAggregatesFilterSchema)]).optional(),
	_count: z.lazy(() => NestedIntFilterSchema).optional(),
	_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
	_sum: z.lazy(() => NestedFloatFilterSchema).optional(),
	_min: z.lazy(() => NestedFloatFilterSchema).optional(),
	_max: z.lazy(() => NestedFloatFilterSchema).optional(),
})

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
	equals: z.boolean().optional(),
	not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
	_count: z.lazy(() => NestedIntFilterSchema).optional(),
	_min: z.lazy(() => NestedBoolFilterSchema).optional(),
	_max: z.lazy(() => NestedBoolFilterSchema).optional(),
})

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
	z.strictObject({
		equals: z.string().optional().nullable(),
		in: z.string().array().optional().nullable(),
		notIn: z.string().array().optional().nullable(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
			.optional()
			.nullable(),
		_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
		_min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
		_max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
	})

export const UserCreateWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateWithoutCompanyInput> = z.strictObject({
	id: z.string(),
	email: z.string(),
	name: z.string(),
	role: z.lazy(() => RoleSchema).optional(),
	hours: z.number().optional().nullable(),
	hourlyRate: z.number().optional().nullable(),
	createdAt: z.coerce.date().optional(),
	workLogs: z.lazy(() => WorkLogCreateNestedManyWithoutUserInputSchema).optional(),
})

export const UserUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCompanyInput> =
	z.strictObject({
		id: z.string(),
		email: z.string(),
		name: z.string(),
		role: z.lazy(() => RoleSchema).optional(),
		hours: z.number().optional().nullable(),
		hourlyRate: z.number().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		workLogs: z.lazy(() => WorkLogUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
	})

export const UserCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCompanyInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutCompanyInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
		]),
	})

export const UserCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyCompanyInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => UserCreateManyCompanyInputSchema),
			z.lazy(() => UserCreateManyCompanyInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	})

export const UserUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutCompanyInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => UserUpdateWithoutCompanyInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutCompanyInputSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutCompanyInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),
		]),
	})

export const UserUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutCompanyInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => UserUpdateWithoutCompanyInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutCompanyInputSchema),
		]),
	})

export const UserUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutCompanyInput> =
	z.strictObject({
		where: z.lazy(() => UserScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => UserUpdateManyMutationInputSchema),
			z.lazy(() => UserUncheckedUpdateManyWithoutCompanyInputSchema),
		]),
	})

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.strictObject({
	AND: z.union([z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array()]).optional(),
	OR: z
		.lazy(() => UserScalarWhereInputSchema)
		.array()
		.optional(),
	NOT: z.union([z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array()]).optional(),
	id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
	hours: z
		.union([z.lazy(() => FloatNullableFilterSchema), z.number()])
		.optional()
		.nullable(),
	hourlyRate: z
		.union([z.lazy(() => FloatNullableFilterSchema), z.number()])
		.optional()
		.nullable(),
	companyId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
})

export const CompanyCreateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateWithoutUsersInput> = z.strictObject({
	id: z.uuid().optional(),
	name: z.string(),
	createdAt: z.coerce.date().optional(),
})

export const CompanyUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutUsersInput> =
	z.strictObject({
		id: z.uuid().optional(),
		name: z.string(),
		createdAt: z.coerce.date().optional(),
	})

export const CompanyCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutUsersInput> =
	z.strictObject({
		where: z.lazy(() => CompanyWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => CompanyCreateWithoutUsersInputSchema),
			z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema),
		]),
	})

export const WorkLogCreateWithoutUserInputSchema: z.ZodType<Prisma.WorkLogCreateWithoutUserInput> = z.strictObject({
	id: z.uuid().optional(),
	date: z.coerce.date(),
	hours: z.number(),
	paid: z.boolean().optional(),
	note: z.string().optional().nullable(),
	createdAt: z.coerce.date().optional(),
})

export const WorkLogUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.WorkLogUncheckedCreateWithoutUserInput> =
	z.strictObject({
		id: z.uuid().optional(),
		date: z.coerce.date(),
		hours: z.number(),
		paid: z.boolean().optional(),
		note: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	})

export const WorkLogCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.WorkLogCreateOrConnectWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => WorkLogWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => WorkLogCreateWithoutUserInputSchema),
			z.lazy(() => WorkLogUncheckedCreateWithoutUserInputSchema),
		]),
	})

export const WorkLogCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.WorkLogCreateManyUserInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => WorkLogCreateManyUserInputSchema),
			z.lazy(() => WorkLogCreateManyUserInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	})

export const CompanyUpsertWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutUsersInput> = z.strictObject({
	update: z.union([
		z.lazy(() => CompanyUpdateWithoutUsersInputSchema),
		z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema),
	]),
	create: z.union([
		z.lazy(() => CompanyCreateWithoutUsersInputSchema),
		z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema),
	]),
	where: z.lazy(() => CompanyWhereInputSchema).optional(),
})

export const CompanyUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutUsersInput> =
	z.strictObject({
		where: z.lazy(() => CompanyWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => CompanyUpdateWithoutUsersInputSchema),
			z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema),
		]),
	})

export const CompanyUpdateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutUsersInput> = z.strictObject({
	id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
})

export const CompanyUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutUsersInput> =
	z.strictObject({
		id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	})

export const WorkLogUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WorkLogUpsertWithWhereUniqueWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => WorkLogWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => WorkLogUpdateWithoutUserInputSchema),
			z.lazy(() => WorkLogUncheckedUpdateWithoutUserInputSchema),
		]),
		create: z.union([
			z.lazy(() => WorkLogCreateWithoutUserInputSchema),
			z.lazy(() => WorkLogUncheckedCreateWithoutUserInputSchema),
		]),
	})

export const WorkLogUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WorkLogUpdateWithWhereUniqueWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => WorkLogWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => WorkLogUpdateWithoutUserInputSchema),
			z.lazy(() => WorkLogUncheckedUpdateWithoutUserInputSchema),
		]),
	})

export const WorkLogUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.WorkLogUpdateManyWithWhereWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => WorkLogScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => WorkLogUpdateManyMutationInputSchema),
			z.lazy(() => WorkLogUncheckedUpdateManyWithoutUserInputSchema),
		]),
	})

export const WorkLogScalarWhereInputSchema: z.ZodType<Prisma.WorkLogScalarWhereInput> = z.strictObject({
	AND: z
		.union([z.lazy(() => WorkLogScalarWhereInputSchema), z.lazy(() => WorkLogScalarWhereInputSchema).array()])
		.optional(),
	OR: z
		.lazy(() => WorkLogScalarWhereInputSchema)
		.array()
		.optional(),
	NOT: z
		.union([z.lazy(() => WorkLogScalarWhereInputSchema), z.lazy(() => WorkLogScalarWhereInputSchema).array()])
		.optional(),
	id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
	date: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
	hours: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
	paid: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
	note: z
		.union([z.lazy(() => StringNullableFilterSchema), z.string()])
		.optional()
		.nullable(),
	createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
})

export const UserCreateWithoutWorkLogsInputSchema: z.ZodType<Prisma.UserCreateWithoutWorkLogsInput> = z.strictObject({
	id: z.string(),
	email: z.string(),
	name: z.string(),
	role: z.lazy(() => RoleSchema).optional(),
	hours: z.number().optional().nullable(),
	hourlyRate: z.number().optional().nullable(),
	createdAt: z.coerce.date().optional(),
	company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema),
})

export const UserUncheckedCreateWithoutWorkLogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWorkLogsInput> =
	z.strictObject({
		id: z.string(),
		email: z.string(),
		name: z.string(),
		role: z.lazy(() => RoleSchema).optional(),
		hours: z.number().optional().nullable(),
		hourlyRate: z.number().optional().nullable(),
		companyId: z.string(),
		createdAt: z.coerce.date().optional(),
	})

export const UserCreateOrConnectWithoutWorkLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWorkLogsInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutWorkLogsInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutWorkLogsInputSchema),
		]),
	})

export const UserUpsertWithoutWorkLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutWorkLogsInput> = z.strictObject({
	update: z.union([
		z.lazy(() => UserUpdateWithoutWorkLogsInputSchema),
		z.lazy(() => UserUncheckedUpdateWithoutWorkLogsInputSchema),
	]),
	create: z.union([
		z.lazy(() => UserCreateWithoutWorkLogsInputSchema),
		z.lazy(() => UserUncheckedCreateWithoutWorkLogsInputSchema),
	]),
	where: z.lazy(() => UserWhereInputSchema).optional(),
})

export const UserUpdateToOneWithWhereWithoutWorkLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWorkLogsInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutWorkLogsInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutWorkLogsInputSchema),
		]),
	})

export const UserUpdateWithoutWorkLogsInputSchema: z.ZodType<Prisma.UserUpdateWithoutWorkLogsInput> = z.strictObject({
	id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
	hours: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	hourlyRate: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	company: z.lazy(() => CompanyUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
})

export const UserUncheckedUpdateWithoutWorkLogsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWorkLogsInput> =
	z.strictObject({
		id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
		hours: z
			.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		hourlyRate: z
			.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		companyId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	})

export const UserCreateManyCompanyInputSchema: z.ZodType<Prisma.UserCreateManyCompanyInput> = z.strictObject({
	id: z.string(),
	email: z.string(),
	name: z.string(),
	role: z.lazy(() => RoleSchema).optional(),
	hours: z.number().optional().nullable(),
	hourlyRate: z.number().optional().nullable(),
	createdAt: z.coerce.date().optional(),
})

export const UserUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateWithoutCompanyInput> = z.strictObject({
	id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
	hours: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	hourlyRate: z
		.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	workLogs: z.lazy(() => WorkLogUpdateManyWithoutUserNestedInputSchema).optional(),
})

export const UserUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCompanyInput> =
	z.strictObject({
		id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
		hours: z
			.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		hourlyRate: z
			.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
		workLogs: z.lazy(() => WorkLogUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
	})

export const UserUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutCompanyInput> =
	z.strictObject({
		id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
		hours: z
			.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		hourlyRate: z
			.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	})

export const WorkLogCreateManyUserInputSchema: z.ZodType<Prisma.WorkLogCreateManyUserInput> = z.strictObject({
	id: z.uuid().optional(),
	date: z.coerce.date(),
	hours: z.number(),
	paid: z.boolean().optional(),
	note: z.string().optional().nullable(),
	createdAt: z.coerce.date().optional(),
})

export const WorkLogUpdateWithoutUserInputSchema: z.ZodType<Prisma.WorkLogUpdateWithoutUserInput> = z.strictObject({
	id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
	date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	hours: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
	paid: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
	note: z
		.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
		.optional()
		.nullable(),
	createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
})

export const WorkLogUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.WorkLogUncheckedUpdateWithoutUserInput> =
	z.strictObject({
		id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
		hours: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
		paid: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
		note: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	})

export const WorkLogUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.WorkLogUncheckedUpdateManyWithoutUserInput> =
	z.strictObject({
		id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		date: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
		hours: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputSchema)]).optional(),
		paid: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
		note: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
	})

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CompanyFindFirstArgsSchema: z.ZodType<Prisma.CompanyFindFirstArgs> = z
	.object({
		select: CompanySelectSchema.optional(),
		include: CompanyIncludeSchema.optional(),
		where: CompanyWhereInputSchema.optional(),
		orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
		cursor: CompanyWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional(),
	})
	.strict()

export const CompanyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindFirstOrThrowArgs> = z
	.object({
		select: CompanySelectSchema.optional(),
		include: CompanyIncludeSchema.optional(),
		where: CompanyWhereInputSchema.optional(),
		orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
		cursor: CompanyWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional(),
	})
	.strict()

export const CompanyFindManyArgsSchema: z.ZodType<Prisma.CompanyFindManyArgs> = z
	.object({
		select: CompanySelectSchema.optional(),
		include: CompanyIncludeSchema.optional(),
		where: CompanyWhereInputSchema.optional(),
		orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
		cursor: CompanyWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional(),
	})
	.strict()

export const CompanyAggregateArgsSchema: z.ZodType<Prisma.CompanyAggregateArgs> = z
	.object({
		where: CompanyWhereInputSchema.optional(),
		orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
		cursor: CompanyWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict()

export const CompanyGroupByArgsSchema: z.ZodType<Prisma.CompanyGroupByArgs> = z
	.object({
		where: CompanyWhereInputSchema.optional(),
		orderBy: z
			.union([CompanyOrderByWithAggregationInputSchema.array(), CompanyOrderByWithAggregationInputSchema])
			.optional(),
		by: CompanyScalarFieldEnumSchema.array(),
		having: CompanyScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict()

export const CompanyFindUniqueArgsSchema: z.ZodType<Prisma.CompanyFindUniqueArgs> = z
	.object({
		select: CompanySelectSchema.optional(),
		include: CompanyIncludeSchema.optional(),
		where: CompanyWhereUniqueInputSchema,
	})
	.strict()

export const CompanyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindUniqueOrThrowArgs> = z
	.object({
		select: CompanySelectSchema.optional(),
		include: CompanyIncludeSchema.optional(),
		where: CompanyWhereUniqueInputSchema,
	})
	.strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
	})
	.strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
	})
	.strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
	})
	.strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		orderBy: z.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema]).optional(),
		by: UserScalarFieldEnumSchema.array(),
		having: UserScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
	})
	.strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
	})
	.strict()

export const WorkLogFindFirstArgsSchema: z.ZodType<Prisma.WorkLogFindFirstArgs> = z
	.object({
		select: WorkLogSelectSchema.optional(),
		include: WorkLogIncludeSchema.optional(),
		where: WorkLogWhereInputSchema.optional(),
		orderBy: z.union([WorkLogOrderByWithRelationInputSchema.array(), WorkLogOrderByWithRelationInputSchema]).optional(),
		cursor: WorkLogWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([WorkLogScalarFieldEnumSchema, WorkLogScalarFieldEnumSchema.array()]).optional(),
	})
	.strict()

export const WorkLogFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkLogFindFirstOrThrowArgs> = z
	.object({
		select: WorkLogSelectSchema.optional(),
		include: WorkLogIncludeSchema.optional(),
		where: WorkLogWhereInputSchema.optional(),
		orderBy: z.union([WorkLogOrderByWithRelationInputSchema.array(), WorkLogOrderByWithRelationInputSchema]).optional(),
		cursor: WorkLogWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([WorkLogScalarFieldEnumSchema, WorkLogScalarFieldEnumSchema.array()]).optional(),
	})
	.strict()

export const WorkLogFindManyArgsSchema: z.ZodType<Prisma.WorkLogFindManyArgs> = z
	.object({
		select: WorkLogSelectSchema.optional(),
		include: WorkLogIncludeSchema.optional(),
		where: WorkLogWhereInputSchema.optional(),
		orderBy: z.union([WorkLogOrderByWithRelationInputSchema.array(), WorkLogOrderByWithRelationInputSchema]).optional(),
		cursor: WorkLogWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([WorkLogScalarFieldEnumSchema, WorkLogScalarFieldEnumSchema.array()]).optional(),
	})
	.strict()

export const WorkLogAggregateArgsSchema: z.ZodType<Prisma.WorkLogAggregateArgs> = z
	.object({
		where: WorkLogWhereInputSchema.optional(),
		orderBy: z.union([WorkLogOrderByWithRelationInputSchema.array(), WorkLogOrderByWithRelationInputSchema]).optional(),
		cursor: WorkLogWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict()

export const WorkLogGroupByArgsSchema: z.ZodType<Prisma.WorkLogGroupByArgs> = z
	.object({
		where: WorkLogWhereInputSchema.optional(),
		orderBy: z
			.union([WorkLogOrderByWithAggregationInputSchema.array(), WorkLogOrderByWithAggregationInputSchema])
			.optional(),
		by: WorkLogScalarFieldEnumSchema.array(),
		having: WorkLogScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict()

export const WorkLogFindUniqueArgsSchema: z.ZodType<Prisma.WorkLogFindUniqueArgs> = z
	.object({
		select: WorkLogSelectSchema.optional(),
		include: WorkLogIncludeSchema.optional(),
		where: WorkLogWhereUniqueInputSchema,
	})
	.strict()

export const WorkLogFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkLogFindUniqueOrThrowArgs> = z
	.object({
		select: WorkLogSelectSchema.optional(),
		include: WorkLogIncludeSchema.optional(),
		where: WorkLogWhereUniqueInputSchema,
	})
	.strict()

export const CompanyCreateArgsSchema: z.ZodType<Prisma.CompanyCreateArgs> = z
	.object({
		select: CompanySelectSchema.optional(),
		include: CompanyIncludeSchema.optional(),
		data: z.union([CompanyCreateInputSchema, CompanyUncheckedCreateInputSchema]),
	})
	.strict()

export const CompanyUpsertArgsSchema: z.ZodType<Prisma.CompanyUpsertArgs> = z
	.object({
		select: CompanySelectSchema.optional(),
		include: CompanyIncludeSchema.optional(),
		where: CompanyWhereUniqueInputSchema,
		create: z.union([CompanyCreateInputSchema, CompanyUncheckedCreateInputSchema]),
		update: z.union([CompanyUpdateInputSchema, CompanyUncheckedUpdateInputSchema]),
	})
	.strict()

export const CompanyCreateManyArgsSchema: z.ZodType<Prisma.CompanyCreateManyArgs> = z
	.object({
		data: z.union([CompanyCreateManyInputSchema, CompanyCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict()

export const CompanyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyCreateManyAndReturnArgs> = z
	.object({
		data: z.union([CompanyCreateManyInputSchema, CompanyCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict()

export const CompanyDeleteArgsSchema: z.ZodType<Prisma.CompanyDeleteArgs> = z
	.object({
		select: CompanySelectSchema.optional(),
		include: CompanyIncludeSchema.optional(),
		where: CompanyWhereUniqueInputSchema,
	})
	.strict()

export const CompanyUpdateArgsSchema: z.ZodType<Prisma.CompanyUpdateArgs> = z
	.object({
		select: CompanySelectSchema.optional(),
		include: CompanyIncludeSchema.optional(),
		data: z.union([CompanyUpdateInputSchema, CompanyUncheckedUpdateInputSchema]),
		where: CompanyWhereUniqueInputSchema,
	})
	.strict()

export const CompanyUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUpdateManyArgs> = z
	.object({
		data: z.union([CompanyUpdateManyMutationInputSchema, CompanyUncheckedUpdateManyInputSchema]),
		where: CompanyWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict()

export const CompanyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyUpdateManyAndReturnArgs> = z
	.object({
		data: z.union([CompanyUpdateManyMutationInputSchema, CompanyUncheckedUpdateManyInputSchema]),
		where: CompanyWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict()

export const CompanyDeleteManyArgsSchema: z.ZodType<Prisma.CompanyDeleteManyArgs> = z
	.object({
		where: CompanyWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
	})
	.strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
		create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
		update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
	})
	.strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
	.object({
		data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict()

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z
	.object({
		data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
	})
	.strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
		where: UserWhereUniqueInputSchema,
	})
	.strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
	.object({
		data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
		where: UserWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict()

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z
	.object({
		data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
		where: UserWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict()

export const WorkLogCreateArgsSchema: z.ZodType<Prisma.WorkLogCreateArgs> = z
	.object({
		select: WorkLogSelectSchema.optional(),
		include: WorkLogIncludeSchema.optional(),
		data: z.union([WorkLogCreateInputSchema, WorkLogUncheckedCreateInputSchema]),
	})
	.strict()

export const WorkLogUpsertArgsSchema: z.ZodType<Prisma.WorkLogUpsertArgs> = z
	.object({
		select: WorkLogSelectSchema.optional(),
		include: WorkLogIncludeSchema.optional(),
		where: WorkLogWhereUniqueInputSchema,
		create: z.union([WorkLogCreateInputSchema, WorkLogUncheckedCreateInputSchema]),
		update: z.union([WorkLogUpdateInputSchema, WorkLogUncheckedUpdateInputSchema]),
	})
	.strict()

export const WorkLogCreateManyArgsSchema: z.ZodType<Prisma.WorkLogCreateManyArgs> = z
	.object({
		data: z.union([WorkLogCreateManyInputSchema, WorkLogCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict()

export const WorkLogCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkLogCreateManyAndReturnArgs> = z
	.object({
		data: z.union([WorkLogCreateManyInputSchema, WorkLogCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict()

export const WorkLogDeleteArgsSchema: z.ZodType<Prisma.WorkLogDeleteArgs> = z
	.object({
		select: WorkLogSelectSchema.optional(),
		include: WorkLogIncludeSchema.optional(),
		where: WorkLogWhereUniqueInputSchema,
	})
	.strict()

export const WorkLogUpdateArgsSchema: z.ZodType<Prisma.WorkLogUpdateArgs> = z
	.object({
		select: WorkLogSelectSchema.optional(),
		include: WorkLogIncludeSchema.optional(),
		data: z.union([WorkLogUpdateInputSchema, WorkLogUncheckedUpdateInputSchema]),
		where: WorkLogWhereUniqueInputSchema,
	})
	.strict()

export const WorkLogUpdateManyArgsSchema: z.ZodType<Prisma.WorkLogUpdateManyArgs> = z
	.object({
		data: z.union([WorkLogUpdateManyMutationInputSchema, WorkLogUncheckedUpdateManyInputSchema]),
		where: WorkLogWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict()

export const WorkLogUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkLogUpdateManyAndReturnArgs> = z
	.object({
		data: z.union([WorkLogUpdateManyMutationInputSchema, WorkLogUncheckedUpdateManyInputSchema]),
		where: WorkLogWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict()

export const WorkLogDeleteManyArgsSchema: z.ZodType<Prisma.WorkLogDeleteManyArgs> = z
	.object({
		where: WorkLogWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict()
