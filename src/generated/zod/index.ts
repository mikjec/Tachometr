import { z } from 'zod';
import type { Prisma } from '../prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const CompanyScalarFieldEnumSchema = z.enum(['id','name','createdAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','role','hours','hourlyRate','companyId','createdAt']);

export const WorkEntryScalarFieldEnumSchema = z.enum(['id','userId','date','hours','paid','note','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['ADMIN','MANAGER','EMPLOYEE']);

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
// WORK ENTRY SCHEMA
/////////////////////////////////////////

export const WorkEntrySchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  date: z.coerce.date(),
  hours: z.number(),
  paid: z.boolean(),
  note: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type WorkEntry = z.infer<typeof WorkEntrySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// COMPANY
//------------------------------------------------------

export const CompanyIncludeSchema: z.ZodType<Prisma.CompanyInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CompanyArgsSchema: z.ZodType<Prisma.CompanyDefaultArgs> = z.object({
  select: z.lazy(() => CompanySelectSchema).optional(),
  include: z.lazy(() => CompanyIncludeSchema).optional(),
}).strict();

export const CompanyCountOutputTypeArgsSchema: z.ZodType<Prisma.CompanyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CompanyCountOutputTypeSelectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
}).strict();

export const CompanySelectSchema: z.ZodType<Prisma.CompanySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  workEntries: z.union([z.boolean(),z.lazy(() => WorkEntryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  workEntries: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  role: z.boolean().optional(),
  hours: z.boolean().optional(),
  hourlyRate: z.boolean().optional(),
  companyId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  workEntries: z.union([z.boolean(),z.lazy(() => WorkEntryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WORK ENTRY
//------------------------------------------------------

export const WorkEntryIncludeSchema: z.ZodType<Prisma.WorkEntryInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const WorkEntryArgsSchema: z.ZodType<Prisma.WorkEntryDefaultArgs> = z.object({
  select: z.lazy(() => WorkEntrySelectSchema).optional(),
  include: z.lazy(() => WorkEntryIncludeSchema).optional(),
}).strict();

export const WorkEntrySelectSchema: z.ZodType<Prisma.WorkEntrySelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  date: z.boolean().optional(),
  hours: z.boolean().optional(),
  paid: z.boolean().optional(),
  note: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CompanyWhereInputSchema: z.ZodType<Prisma.CompanyWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
});

export const CompanyOrderByWithRelationInputSchema: z.ZodType<Prisma.CompanyOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
});

export const CompanyWhereUniqueInputSchema: z.ZodType<Prisma.CompanyWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
}));

export const CompanyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional(),
});

export const CompanyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema), z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema), z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  hours: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  hourlyRate: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  company: z.union([ z.lazy(() => CompanyScalarRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  workEntries: z.lazy(() => WorkEntryListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  hours: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  hourlyRate: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
  workEntries: z.lazy(() => WorkEntryOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
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
.and(z.strictObject({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  hours: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  hourlyRate: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  company: z.union([ z.lazy(() => CompanyScalarRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  workEntries: z.lazy(() => WorkEntryListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  hours: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  hourlyRate: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  hours: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  hourlyRate: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const WorkEntryWhereInputSchema: z.ZodType<Prisma.WorkEntryWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => WorkEntryWhereInputSchema), z.lazy(() => WorkEntryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkEntryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkEntryWhereInputSchema), z.lazy(() => WorkEntryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  hours: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  paid: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const WorkEntryOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkEntryOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
  paid: z.lazy(() => SortOrderSchema).optional(),
  note: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const WorkEntryWhereUniqueInputSchema: z.ZodType<Prisma.WorkEntryWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => WorkEntryWhereInputSchema), z.lazy(() => WorkEntryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkEntryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkEntryWhereInputSchema), z.lazy(() => WorkEntryWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  hours: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  paid: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const WorkEntryOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkEntryOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
  paid: z.lazy(() => SortOrderSchema).optional(),
  note: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkEntryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WorkEntryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkEntryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkEntryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WorkEntrySumOrderByAggregateInputSchema).optional(),
});

export const WorkEntryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkEntryScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => WorkEntryScalarWhereWithAggregatesInputSchema), z.lazy(() => WorkEntryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkEntryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkEntryScalarWhereWithAggregatesInputSchema), z.lazy(() => WorkEntryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  hours: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  paid: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  note: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const CompanyCreateInputSchema: z.ZodType<Prisma.CompanyCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutCompanyInputSchema).optional(),
});

export const CompanyUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
});

export const CompanyUpdateInputSchema: z.ZodType<Prisma.CompanyUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema).optional(),
});

export const CompanyUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
});

export const CompanyCreateManyInputSchema: z.ZodType<Prisma.CompanyCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
});

export const CompanyUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CompanyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  hours: z.number().optional().nullable(),
  hourlyRate: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema),
  workEntries: z.lazy(() => WorkEntryCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  hours: z.number().optional().nullable(),
  hourlyRate: z.number().optional().nullable(),
  companyId: z.string(),
  createdAt: z.coerce.date().optional(),
  workEntries: z.lazy(() => WorkEntryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hourlyRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  workEntries: z.lazy(() => WorkEntryUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hourlyRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workEntries: z.lazy(() => WorkEntryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  hours: z.number().optional().nullable(),
  hourlyRate: z.number().optional().nullable(),
  companyId: z.string(),
  createdAt: z.coerce.date().optional(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hourlyRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hourlyRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const WorkEntryCreateInputSchema: z.ZodType<Prisma.WorkEntryCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  date: z.coerce.date(),
  hours: z.number(),
  paid: z.boolean().optional(),
  note: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWorkEntriesInputSchema),
});

export const WorkEntryUncheckedCreateInputSchema: z.ZodType<Prisma.WorkEntryUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  date: z.coerce.date(),
  hours: z.number(),
  paid: z.boolean().optional(),
  note: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const WorkEntryUpdateInputSchema: z.ZodType<Prisma.WorkEntryUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWorkEntriesNestedInputSchema).optional(),
});

export const WorkEntryUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkEntryUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const WorkEntryCreateManyInputSchema: z.ZodType<Prisma.WorkEntryCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  date: z.coerce.date(),
  hours: z.number(),
  paid: z.boolean().optional(),
  note: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const WorkEntryUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkEntryUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const WorkEntryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkEntryUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.strictObject({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const CompanyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const CompanyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const CompanyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
});

export const CompanyScalarRelationFilterSchema: z.ZodType<Prisma.CompanyScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CompanyWhereInputSchema).optional(),
  isNot: z.lazy(() => CompanyWhereInputSchema).optional(),
});

export const WorkEntryListRelationFilterSchema: z.ZodType<Prisma.WorkEntryListRelationFilter> = z.strictObject({
  every: z.lazy(() => WorkEntryWhereInputSchema).optional(),
  some: z.lazy(() => WorkEntryWhereInputSchema).optional(),
  none: z.lazy(() => WorkEntryWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const WorkEntryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkEntryOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
  hourlyRate: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.strictObject({
  hours: z.lazy(() => SortOrderSchema).optional(),
  hourlyRate: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
  hourlyRate: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
  hourlyRate: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.strictObject({
  hours: z.lazy(() => SortOrderSchema).optional(),
  hourlyRate: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
});

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const WorkEntryCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkEntryCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
  paid: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const WorkEntryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkEntryAvgOrderByAggregateInput> = z.strictObject({
  hours: z.lazy(() => SortOrderSchema).optional(),
});

export const WorkEntryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkEntryMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
  paid: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const WorkEntryMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkEntryMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  hours: z.lazy(() => SortOrderSchema).optional(),
  paid: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const WorkEntrySumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkEntrySumOrderByAggregateInput> = z.strictObject({
  hours: z.lazy(() => SortOrderSchema).optional(),
});

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const UserCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutCompanyInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema), z.lazy(() => UserCreateWithoutCompanyInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
});

export const UserUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutCompanyInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema), z.lazy(() => UserCreateWithoutCompanyInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const UserUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutCompanyNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema), z.lazy(() => UserCreateWithoutCompanyInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
});

export const UserUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutCompanyNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema), z.lazy(() => UserCreateWithoutCompanyInputSchema).array(), z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema), z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema), z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
});

export const CompanyCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutUsersInput> = z.strictObject({
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
});

export const WorkEntryCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => WorkEntryCreateWithoutUserInputSchema), z.lazy(() => WorkEntryCreateWithoutUserInputSchema).array(), z.lazy(() => WorkEntryUncheckedCreateWithoutUserInputSchema), z.lazy(() => WorkEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkEntryCreateOrConnectWithoutUserInputSchema), z.lazy(() => WorkEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkEntryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkEntryWhereUniqueInputSchema), z.lazy(() => WorkEntryWhereUniqueInputSchema).array() ]).optional(),
});

export const WorkEntryUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => WorkEntryCreateWithoutUserInputSchema), z.lazy(() => WorkEntryCreateWithoutUserInputSchema).array(), z.lazy(() => WorkEntryUncheckedCreateWithoutUserInputSchema), z.lazy(() => WorkEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkEntryCreateOrConnectWithoutUserInputSchema), z.lazy(() => WorkEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkEntryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkEntryWhereUniqueInputSchema), z.lazy(() => WorkEntryWhereUniqueInputSchema).array() ]).optional(),
});

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => RoleSchema).optional(),
});

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const CompanyUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutUsersNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutUsersInputSchema), z.lazy(() => CompanyUpdateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
});

export const WorkEntryUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WorkEntryUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => WorkEntryCreateWithoutUserInputSchema), z.lazy(() => WorkEntryCreateWithoutUserInputSchema).array(), z.lazy(() => WorkEntryUncheckedCreateWithoutUserInputSchema), z.lazy(() => WorkEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkEntryCreateOrConnectWithoutUserInputSchema), z.lazy(() => WorkEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkEntryUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => WorkEntryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkEntryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkEntryWhereUniqueInputSchema), z.lazy(() => WorkEntryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkEntryWhereUniqueInputSchema), z.lazy(() => WorkEntryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkEntryWhereUniqueInputSchema), z.lazy(() => WorkEntryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkEntryWhereUniqueInputSchema), z.lazy(() => WorkEntryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkEntryUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => WorkEntryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkEntryUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => WorkEntryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkEntryScalarWhereInputSchema), z.lazy(() => WorkEntryScalarWhereInputSchema).array() ]).optional(),
});

export const WorkEntryUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WorkEntryUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => WorkEntryCreateWithoutUserInputSchema), z.lazy(() => WorkEntryCreateWithoutUserInputSchema).array(), z.lazy(() => WorkEntryUncheckedCreateWithoutUserInputSchema), z.lazy(() => WorkEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkEntryCreateOrConnectWithoutUserInputSchema), z.lazy(() => WorkEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkEntryUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => WorkEntryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkEntryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkEntryWhereUniqueInputSchema), z.lazy(() => WorkEntryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkEntryWhereUniqueInputSchema), z.lazy(() => WorkEntryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkEntryWhereUniqueInputSchema), z.lazy(() => WorkEntryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkEntryWhereUniqueInputSchema), z.lazy(() => WorkEntryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkEntryUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => WorkEntryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkEntryUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => WorkEntryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkEntryScalarWhereInputSchema), z.lazy(() => WorkEntryScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutWorkEntriesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWorkEntriesInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutWorkEntriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutWorkEntriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkEntriesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const UserUpdateOneRequiredWithoutWorkEntriesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWorkEntriesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutWorkEntriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutWorkEntriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkEntriesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWorkEntriesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutWorkEntriesInputSchema), z.lazy(() => UserUpdateWithoutWorkEntriesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutWorkEntriesInputSchema) ]).optional(),
});

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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
});

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const UserCreateWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateWithoutCompanyInput> = z.strictObject({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  hours: z.number().optional().nullable(),
  hourlyRate: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  workEntries: z.lazy(() => WorkEntryCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCompanyInput> = z.strictObject({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  hours: z.number().optional().nullable(),
  hourlyRate: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  workEntries: z.lazy(() => WorkEntryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema) ]),
});

export const UserCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyCompanyInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => UserCreateManyCompanyInputSchema), z.lazy(() => UserCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const UserUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutCompanyInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema) ]),
});

export const UserUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutCompanyInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCompanyInputSchema) ]),
});

export const UserUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutCompanyInput> = z.strictObject({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema), z.lazy(() => UserUncheckedUpdateManyWithoutCompanyInputSchema) ]),
});

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema), z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  hours: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  hourlyRate: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const CompanyCreateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateWithoutUsersInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
});

export const CompanyUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutUsersInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
});

export const CompanyCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutUsersInput> = z.strictObject({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]),
});

export const WorkEntryCreateWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  date: z.coerce.date(),
  hours: z.number(),
  paid: z.boolean().optional(),
  note: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const WorkEntryUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  date: z.coerce.date(),
  hours: z.number(),
  paid: z.boolean().optional(),
  note: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const WorkEntryCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => WorkEntryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkEntryCreateWithoutUserInputSchema), z.lazy(() => WorkEntryUncheckedCreateWithoutUserInputSchema) ]),
});

export const WorkEntryCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.WorkEntryCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => WorkEntryCreateManyUserInputSchema), z.lazy(() => WorkEntryCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const CompanyUpsertWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutUsersInput> = z.strictObject({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
});

export const CompanyUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutUsersInput> = z.strictObject({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema) ]),
});

export const CompanyUpdateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutUsersInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CompanyUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutUsersInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const WorkEntryUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => WorkEntryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkEntryUpdateWithoutUserInputSchema), z.lazy(() => WorkEntryUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => WorkEntryCreateWithoutUserInputSchema), z.lazy(() => WorkEntryUncheckedCreateWithoutUserInputSchema) ]),
});

export const WorkEntryUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => WorkEntryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkEntryUpdateWithoutUserInputSchema), z.lazy(() => WorkEntryUncheckedUpdateWithoutUserInputSchema) ]),
});

export const WorkEntryUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => WorkEntryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkEntryUpdateManyMutationInputSchema), z.lazy(() => WorkEntryUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const WorkEntryScalarWhereInputSchema: z.ZodType<Prisma.WorkEntryScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => WorkEntryScalarWhereInputSchema), z.lazy(() => WorkEntryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkEntryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkEntryScalarWhereInputSchema), z.lazy(() => WorkEntryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  hours: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  paid: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const UserCreateWithoutWorkEntriesInputSchema: z.ZodType<Prisma.UserCreateWithoutWorkEntriesInput> = z.strictObject({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  hours: z.number().optional().nullable(),
  hourlyRate: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema),
});

export const UserUncheckedCreateWithoutWorkEntriesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWorkEntriesInput> = z.strictObject({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  hours: z.number().optional().nullable(),
  hourlyRate: z.number().optional().nullable(),
  companyId: z.string(),
  createdAt: z.coerce.date().optional(),
});

export const UserCreateOrConnectWithoutWorkEntriesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWorkEntriesInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutWorkEntriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutWorkEntriesInputSchema) ]),
});

export const UserUpsertWithoutWorkEntriesInputSchema: z.ZodType<Prisma.UserUpsertWithoutWorkEntriesInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutWorkEntriesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutWorkEntriesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutWorkEntriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutWorkEntriesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutWorkEntriesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWorkEntriesInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutWorkEntriesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutWorkEntriesInputSchema) ]),
});

export const UserUpdateWithoutWorkEntriesInputSchema: z.ZodType<Prisma.UserUpdateWithoutWorkEntriesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hourlyRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutWorkEntriesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWorkEntriesInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hourlyRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserCreateManyCompanyInputSchema: z.ZodType<Prisma.UserCreateManyCompanyInput> = z.strictObject({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  hours: z.number().optional().nullable(),
  hourlyRate: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const UserUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateWithoutCompanyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hourlyRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workEntries: z.lazy(() => WorkEntryUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCompanyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hourlyRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workEntries: z.lazy(() => WorkEntryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutCompanyInput> = z.strictObject({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hourlyRate: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const WorkEntryCreateManyUserInputSchema: z.ZodType<Prisma.WorkEntryCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  date: z.coerce.date(),
  hours: z.number(),
  paid: z.boolean().optional(),
  note: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const WorkEntryUpdateWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const WorkEntryUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const WorkEntryUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.WorkEntryUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hours: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CompanyFindFirstArgsSchema: z.ZodType<Prisma.CompanyFindFirstArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(), 
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CompanyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindFirstOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(), 
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CompanyFindManyArgsSchema: z.ZodType<Prisma.CompanyFindManyArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(), 
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CompanyAggregateArgsSchema: z.ZodType<Prisma.CompanyAggregateArgs> = z.object({
  where: CompanyWhereInputSchema.optional(), 
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CompanyGroupByArgsSchema: z.ZodType<Prisma.CompanyGroupByArgs> = z.object({
  where: CompanyWhereInputSchema.optional(), 
  orderBy: z.union([ CompanyOrderByWithAggregationInputSchema.array(), CompanyOrderByWithAggregationInputSchema ]).optional(),
  by: CompanyScalarFieldEnumSchema.array(), 
  having: CompanyScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CompanyFindUniqueArgsSchema: z.ZodType<Prisma.CompanyFindUniqueArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema, 
}).strict();

export const CompanyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindUniqueOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema, 
}).strict();

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const WorkEntryFindFirstArgsSchema: z.ZodType<Prisma.WorkEntryFindFirstArgs> = z.object({
  select: WorkEntrySelectSchema.optional(),
  include: WorkEntryIncludeSchema.optional(),
  where: WorkEntryWhereInputSchema.optional(), 
  orderBy: z.union([ WorkEntryOrderByWithRelationInputSchema.array(), WorkEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkEntryScalarFieldEnumSchema, WorkEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const WorkEntryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkEntryFindFirstOrThrowArgs> = z.object({
  select: WorkEntrySelectSchema.optional(),
  include: WorkEntryIncludeSchema.optional(),
  where: WorkEntryWhereInputSchema.optional(), 
  orderBy: z.union([ WorkEntryOrderByWithRelationInputSchema.array(), WorkEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkEntryScalarFieldEnumSchema, WorkEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const WorkEntryFindManyArgsSchema: z.ZodType<Prisma.WorkEntryFindManyArgs> = z.object({
  select: WorkEntrySelectSchema.optional(),
  include: WorkEntryIncludeSchema.optional(),
  where: WorkEntryWhereInputSchema.optional(), 
  orderBy: z.union([ WorkEntryOrderByWithRelationInputSchema.array(), WorkEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkEntryScalarFieldEnumSchema, WorkEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const WorkEntryAggregateArgsSchema: z.ZodType<Prisma.WorkEntryAggregateArgs> = z.object({
  where: WorkEntryWhereInputSchema.optional(), 
  orderBy: z.union([ WorkEntryOrderByWithRelationInputSchema.array(), WorkEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkEntryWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const WorkEntryGroupByArgsSchema: z.ZodType<Prisma.WorkEntryGroupByArgs> = z.object({
  where: WorkEntryWhereInputSchema.optional(), 
  orderBy: z.union([ WorkEntryOrderByWithAggregationInputSchema.array(), WorkEntryOrderByWithAggregationInputSchema ]).optional(),
  by: WorkEntryScalarFieldEnumSchema.array(), 
  having: WorkEntryScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const WorkEntryFindUniqueArgsSchema: z.ZodType<Prisma.WorkEntryFindUniqueArgs> = z.object({
  select: WorkEntrySelectSchema.optional(),
  include: WorkEntryIncludeSchema.optional(),
  where: WorkEntryWhereUniqueInputSchema, 
}).strict();

export const WorkEntryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkEntryFindUniqueOrThrowArgs> = z.object({
  select: WorkEntrySelectSchema.optional(),
  include: WorkEntryIncludeSchema.optional(),
  where: WorkEntryWhereUniqueInputSchema, 
}).strict();

export const CompanyCreateArgsSchema: z.ZodType<Prisma.CompanyCreateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyCreateInputSchema, CompanyUncheckedCreateInputSchema ]),
}).strict();

export const CompanyUpsertArgsSchema: z.ZodType<Prisma.CompanyUpsertArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema, 
  create: z.union([ CompanyCreateInputSchema, CompanyUncheckedCreateInputSchema ]),
  update: z.union([ CompanyUpdateInputSchema, CompanyUncheckedUpdateInputSchema ]),
}).strict();

export const CompanyCreateManyArgsSchema: z.ZodType<Prisma.CompanyCreateManyArgs> = z.object({
  data: z.union([ CompanyCreateManyInputSchema, CompanyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CompanyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyCreateManyAndReturnArgs> = z.object({
  data: z.union([ CompanyCreateManyInputSchema, CompanyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CompanyDeleteArgsSchema: z.ZodType<Prisma.CompanyDeleteArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema, 
}).strict();

export const CompanyUpdateArgsSchema: z.ZodType<Prisma.CompanyUpdateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyUpdateInputSchema, CompanyUncheckedUpdateInputSchema ]),
  where: CompanyWhereUniqueInputSchema, 
}).strict();

export const CompanyUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUpdateManyArgs> = z.object({
  data: z.union([ CompanyUpdateManyMutationInputSchema, CompanyUncheckedUpdateManyInputSchema ]),
  where: CompanyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CompanyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CompanyUpdateManyMutationInputSchema, CompanyUncheckedUpdateManyInputSchema ]),
  where: CompanyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CompanyDeleteManyArgsSchema: z.ZodType<Prisma.CompanyDeleteManyArgs> = z.object({
  where: CompanyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const WorkEntryCreateArgsSchema: z.ZodType<Prisma.WorkEntryCreateArgs> = z.object({
  select: WorkEntrySelectSchema.optional(),
  include: WorkEntryIncludeSchema.optional(),
  data: z.union([ WorkEntryCreateInputSchema, WorkEntryUncheckedCreateInputSchema ]),
}).strict();

export const WorkEntryUpsertArgsSchema: z.ZodType<Prisma.WorkEntryUpsertArgs> = z.object({
  select: WorkEntrySelectSchema.optional(),
  include: WorkEntryIncludeSchema.optional(),
  where: WorkEntryWhereUniqueInputSchema, 
  create: z.union([ WorkEntryCreateInputSchema, WorkEntryUncheckedCreateInputSchema ]),
  update: z.union([ WorkEntryUpdateInputSchema, WorkEntryUncheckedUpdateInputSchema ]),
}).strict();

export const WorkEntryCreateManyArgsSchema: z.ZodType<Prisma.WorkEntryCreateManyArgs> = z.object({
  data: z.union([ WorkEntryCreateManyInputSchema, WorkEntryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const WorkEntryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkEntryCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkEntryCreateManyInputSchema, WorkEntryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const WorkEntryDeleteArgsSchema: z.ZodType<Prisma.WorkEntryDeleteArgs> = z.object({
  select: WorkEntrySelectSchema.optional(),
  include: WorkEntryIncludeSchema.optional(),
  where: WorkEntryWhereUniqueInputSchema, 
}).strict();

export const WorkEntryUpdateArgsSchema: z.ZodType<Prisma.WorkEntryUpdateArgs> = z.object({
  select: WorkEntrySelectSchema.optional(),
  include: WorkEntryIncludeSchema.optional(),
  data: z.union([ WorkEntryUpdateInputSchema, WorkEntryUncheckedUpdateInputSchema ]),
  where: WorkEntryWhereUniqueInputSchema, 
}).strict();

export const WorkEntryUpdateManyArgsSchema: z.ZodType<Prisma.WorkEntryUpdateManyArgs> = z.object({
  data: z.union([ WorkEntryUpdateManyMutationInputSchema, WorkEntryUncheckedUpdateManyInputSchema ]),
  where: WorkEntryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const WorkEntryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkEntryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ WorkEntryUpdateManyMutationInputSchema, WorkEntryUncheckedUpdateManyInputSchema ]),
  where: WorkEntryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const WorkEntryDeleteManyArgsSchema: z.ZodType<Prisma.WorkEntryDeleteManyArgs> = z.object({
  where: WorkEntryWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();