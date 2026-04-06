# Claims Studio — Products Deep-Dive Analysis

**Source Application:** Connected Claims Management Demo (v1.2.1)  
**Analysis Date:** March 23, 2026  
**Scope:** Products feature within the Products Group section of Claims Studio  
**Source:** Appian Atlas Knowledge Base (`ConnectedClaimsManagementDemo`)

---

## 1. Feature Overview

Products represent the insurance products available for customer policies. Each product defines a combination of a Line of Business, a currency, a set of Claim Types it supports, and the financial structure (Coverages with limits, Deductibles with amounts) that apply when policies are issued under that product.

Products live within the **Products Group** section of Claims Studio, alongside Lines of Business and Cost Categories. They are a foundational configuration entity — customer policies reference products to inherit their coverage and deductible structures.

---

## 2. Data Model

### 2.1 Product Record (`CCM_CFG_Product`)

The core record type with the following fields and relationships:

| Field | Type | Description |
|-------|------|-------------|
| productId | Integer (PK) | Auto-generated identifier |
| label | Text (255 max) | Product name — must be unique |
| lineOfBusinessId | FK → LineOfBusiness | Associated line of business |
| currencyCode | Text | Currency ISO code (default: USD) |
| activationStatusId | FK → ActivationStatus | Active or Inactive |

### 2.2 Related Records

| Related Record | Relationship | Description |
|----------------|-------------|-------------|
| `CCM_CFG_ProductCoverage` | One-to-Many | Coverages defined for this product |
| `CCM_CFG_ProductDeductible` | One-to-Many | Deductibles defined for this product |
| `CCM_CFG_ProductClaimTypeMap` | One-to-Many | Claim types this product supports |
| `CCM_CFG_ActivationStatus` | Many-to-One | Status lookup (Active/Inactive) |
| `CCM_CFG_Currency` | Many-to-One | Currency reference |
| `CCM_CFG_LineOfBusiness` | Many-to-One | Line of business reference |

### 2.3 Product Coverage (`CCM_CFG_ProductCoverage`)

| Field | Type | Description |
|-------|------|-------------|
| productCoverageId | Integer (PK) | Auto-generated identifier |
| productId | FK → Product | Parent product |
| name | Text | Coverage name (e.g., "Building", "Contents") |
| limit | Decimal | Coverage limit amount in product currency |

### 2.4 Product Deductible (`CCM_CFG_ProductDeductible`)

| Field | Type | Description |
|-------|------|-------------|
| productDeductibleId | Integer (PK) | Auto-generated identifier |
| productId | FK → Product | Parent product |
| name | Text | Deductible name (e.g., "Standard Deductible") |
| amount | Decimal | Deductible amount in product currency |

### 2.5 Product–Claim Type Map (`CCM_CFG_ProductClaimTypeMap`)

| Field | Type | Description |
|-------|------|-------------|
| productClaimTypeMapId | Integer (PK) | Auto-generated identifier |
| productId | FK → Product | Parent product |
| claimTypeId | FK → ClaimType | Associated claim type |

---

## 3. Entity Relationship Diagram

```
                    ┌─────────────────────┐
                    │  CCM_CFG_Currency    │
                    │  (currencyCode)      │
                    └──────────┬──────────┘
                               │ M:1
                               │
┌──────────────────┐    ┌──────┴──────────────┐    ┌──────────────────────┐
│ CCM_CFG_         │    │  CCM_CFG_Product     │    │ CCM_CFG_             │
│ LineOfBusiness   │◄───│                      │───►│ ActivationStatus     │
│                  │ M:1│  productId (PK)      │M:1 │ (Active / Inactive)  │
└──────────────────┘    │  label               │    └──────────────────────┘
                        │  lineOfBusinessId    │
                        │  currencyCode        │
                        │  activationStatusId  │
                        └──┬───────┬───────┬───┘
                           │       │       │
                    1:M    │       │       │    1:M
                           │       │       │
              ┌────────────┘       │       └────────────┐
              ▼                    ▼ 1:M                 ▼
┌─────────────────────┐  ┌────────────────────┐  ┌─────────────────────┐
│ CCM_CFG_             │  │ CCM_CFG_Product     │  │ CCM_CFG_Product     │
│ ProductCoverage      │  │ ClaimTypeMap        │  │ Deductible          │
│                      │  │                     │  │                     │
│ name                 │  │ claimTypeId ──────► │  │ name                │
│ limit (currency)     │  │ CCM_CFG_ClaimType   │  │ amount (currency)   │
└──────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

---

## 4. User Screens & Workflows

### 4.1 Products Grid (List View)

The Products tab within the Products Group section displays a searchable record grid.

**Grid Columns:**

| Column | Source Field | Notes |
|--------|-------------|-------|
| Name | `product.label` | Clickable link → drills into Product Summary |
| Status | `product.cfgActivationStatus.label` | Displayed as a tag with branding colors |
| Line of Business | `product.cfgLineOfBusiness.label` | Plain text |
| Claim Types | `product.cfgProductClaimTypeMaps` | Shows claim type names; overflow shows "+N more" |

**Grid Behaviors:**
- Searchable by product name
- Sortable by Name column (default: ascending)
- Clicking a row navigates to the Product Summary view
- "Create Product" action button available from the grid
- Empty state: illustration with message "Get started defining your products" and a create button

### 4.2 Create / Edit Product Form

A single form interface (`CCM_CfgProduct_RecordAction_CreateUpdate`) serves both create and edit workflows. The form title changes dynamically:
- Create mode: **"Create Product"**
- Edit mode: **"Update Product"**

The form includes an instruction line: *"Required fields are marked with an asterisk (*)"*

**Form Layout:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Create Product  /  Update Product                              │
│  Required fields are marked with an asterisk (*)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Name *                                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [text input, max 255 chars]                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Status *                          Line of Business *           │
│  ┌──────────────────────┐         ┌──────────────────────┐     │
│  │ Active / Inactive ▾  │         │ [dropdown] ▾         │     │
│  └──────────────────────┘         └──────────────────────┘     │
│                                                                 │
│  Currency *                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [currency selector, default: USD]                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ─── Claim Types ───────────────────────────────────────────   │
│                                                                 │
│  Claim Types *                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [multi-select dropdown: "Select one or more Claim Types"]│   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ─── Coverage Details ──────────────────────────────────────   │
│                                                                 │
│  ┌──────────────────────────────┬──────────────────────────┐   │
│  │  Coverage Name *             │  Limit ({currency}) *    │   │
│  ├──────────────────────────────┼──────────────────────────┤   │
│  │  [Enter coverage name]       │  [Enter value]     [✕]   │   │
│  │  [Enter coverage name]       │  [Enter value]     [✕]   │   │
│  └──────────────────────────────┴──────────────────────────┘   │
│  + Add Coverage                                                 │
│                                                                 │
│  ─── Deductible Details ────────────────────────────────────   │
│                                                                 │
│  ┌──────────────────────────────┬──────────────────────────┐   │
│  │  Deductible Name             │  Amount ({currency})     │   │
│  ├──────────────────────────────┼──────────────────────────┤   │
│  │  [Enter deductible name]     │  [Enter value]     [✕]   │   │
│  └──────────────────────────────┴──────────────────────────┘   │
│  + Add Deductible                                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                              [Cancel]  [Create] / [Update]      │
└─────────────────────────────────────────────────────────────────┘
```

**Form Fields Detail:**

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| Name | Text input | Yes | Max 255 chars; duplicate name check | "{Name} is required" if blank; "A product with this name already exists." if duplicate |
| Status | Dropdown | Yes | Must select Active or Inactive | Options: Active, Inactive |
| Line of Business | Dropdown | Yes | Must be an active LOB | Shows only active LOBs; if selected LOB becomes inactive: "This Line of Business is inactive. Please first update LOB to active before setting it on a product." |
| Currency | Currency selector | Yes | — | Default: USD; uses dedicated currency selection component |
| Claim Types | Multi-select dropdown | Yes | At least one must be selected; must be active claim types | Placeholder: "Select one or more Claim Types"; validation if all claim types are inactive |
| Coverage Name | Text input (per row) | Yes (if row exists) | Required per row | Placeholder: "Enter coverage name" |
| Coverage Limit | Currency input (per row) | Yes (if row exists) | Decimal precision/scale validation | Column header shows currency code dynamically |
| Deductible Name | Text input (per row) | No | — | Placeholder: "Enter deductible name" |
| Deductible Amount | Currency input (per row) | No | Decimal precision/scale validation | Column header shows currency code dynamically |

**Coverage Section Rules:**
- At least one coverage must be added (validated on submit: "At least one coverage must be added")
- Each coverage row has a remove (✕) button
- "+ Add Coverage" link appends a new empty row
- Coverage names are required per row with row-index-aware validation messages

**Deductible Section Rules:**
- Deductibles are optional (no minimum required)
- Each deductible row has a remove (✕) button
- "+ Add Deductible" link appends a new empty row
- Uses the same row-level validation pattern as coverages

**Currency Field Validation:**
- Uses `CCM_UTIL_ValidateDecimalSize` for precision and scale checks
- Ensures currency amounts conform to the selected currency's decimal rules

### 4.3 Product Summary View (Drill-In)

When a user clicks a product row in the grid, they see the Product Summary view — a read-only detail page.

**Layout: Two-Column**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  LEFT COLUMN (4X width)              │  RIGHT COLUMN (6X width)         │
│                                      │                                  │
│  ── Details ──────────────────       │  ── Coverages ────────────────   │
│  ┌────────────────────────────┐      │  ┌────────────────────────────┐  │
│  │ Status    [Active] tag     │      │  │ Name          │   Limit    │  │
│  │ Line of   Automobile       │      │  │───────────────┼────────────│  │
│  │ Business                   │      │  │ Building      │ $1,000,000 │  │
│  │ Currency  USD              │      │  │ Contents      │   $500,000 │  │
│  └────────────────────────────┘      │  │ Business Inc. │   $250,000 │  │
│                                      │  └────────────────────────────┘  │
│  ── Claim Types ─────────────        │                                  │
│  ┌────────────────────────────┐      │  ── Deductibles ─────────────   │
│  │ ┌────────────────────────┐ │      │  ┌────────────────────────────┐  │
│  │ │ 📄 Property Damage     │ │      │  │ Name          │   Amount   │  │
│  │ │    First party...  [●] │ │      │  │───────────────┼────────────│  │
│  │ └────────────────────────┘ │      │  │ Standard      │    $5,000  │  │
│  │ ┌────────────────────────┐ │      │  │ Flood         │   $10,000  │  │
│  │ │ 📄 Liability           │ │      │  └────────────────────────────┘  │
│  │ │    Third party...  [●] │ │      │                                  │
│  │ └────────────────────────┘ │      │                                  │
│  └────────────────────────────┘      │                                  │
│                                      │                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Left Column — Details Card:**

| Row | Label | Value |
|-----|-------|-------|
| Status | Tag with branding colors | Active (green-toned) / Inactive (grey-toned) |
| Line of Business | Plain text | e.g., "Automobile" — shows "—" if null |
| Currency | Plain text | e.g., "USD" |

**Left Column — Claim Types Section:**
- Each claim type displayed as a card with:
  - File icon (📄)
  - Claim type name (standard size text)
  - Description (small, secondary color) — shown only if description exists
  - Status tag (Active/Inactive) with branding colors
- Cards are stacked vertically with standard margin between them

**Right Column — Coverages Grid:**

| Column | Width | Alignment | Sort |
|--------|-------|-----------|------|
| Name | 7X | Start | Sortable (default: ascending by name) |
| Limit | 3X | End | Sortable |

- Displays currency-formatted values using the product's currency code
- Page size: 10 rows
- Light border style, no alternate row shading
- Secondary sort by productCoverageId (ascending)

**Right Column — Deductibles Grid:**

| Column | Width | Alignment | Sort |
|--------|-------|-----------|------|
| Name | 7X | Start | Sortable (default: ascending by name) |
| Amount | 3X | End | Sortable |

- Same formatting pattern as Coverages grid
- Currency-formatted values
- Page size: 10 rows
- Secondary sort by productDeductibleId (ascending)

---

## 5. User Workflows

### 5.1 Create a New Product

```
User navigates to Claims Studio → Products Group → Products tab
    │
    ▼
Products grid displayed (or empty state if no products exist)
    │
    ▼
User clicks "Create Product" button
    │
    ▼
Create Product form opens
    │
    ├── User enters Name (required, unique)
    ├── User selects Status (Active/Inactive)
    ├── User selects Line of Business (active LOBs only)
    ├── User selects Currency (default: USD)
    ├── User selects one or more Claim Types (active only)
    ├── User adds at least one Coverage (name + limit)
    └── User optionally adds Deductibles (name + amount)
    │
    ▼
User clicks "Create"
    │
    ├── Validation passes → Product saved → Grid refreshes
    └── Validation fails → Error messages shown inline
```

### 5.2 Edit an Existing Product

```
User navigates to Products tab → clicks product row
    │
    ▼
Product Summary view displayed
    │
    ▼
User clicks "Update Product" action
    │
    ▼
Update Product form opens (pre-populated with existing data)
    │
    ├── User modifies fields as needed
    ├── User can add/remove coverages and deductibles
    └── User can change claim type associations
    │
    ▼
User clicks "Update"
    │
    ├── Validation passes → Product updated → Summary refreshes
    └── Validation fails → Error messages shown inline
```

### 5.3 View Product Details

```
User navigates to Products tab → clicks product row
    │
    ▼
Product Summary view displayed with:
    ├── Details card (Status tag, LOB, Currency)
    ├── Claim Types list (cards with icon, name, description, status)
    ├── Coverages grid (Name + Limit in currency format)
    └── Deductibles grid (Name + Amount in currency format)
```

---

## 6. Validation Rules Summary

| Rule | Trigger | Message |
|------|---------|---------|
| Name required | Submit with blank name | "{Name} is required" |
| Name uniqueness | Submit with duplicate name | "A product with this name already exists." |
| Name max length | Input exceeds 255 chars | Standard max length validation |
| LOB required | Submit without LOB | "{Line of Business} is required" |
| LOB must be active | Selected LOB is inactive | "This Line of Business is inactive. Please first update LOB to active before setting it on a product." |
| Currency required | Submit without currency | Standard required validation |
| Claim Types required | Submit without claim types | "{Claim Types} is required" |
| Claim Types must be active | All available claim types inactive | Specific validation message |
| At least one coverage | Submit with no coverage rows | "At least one coverage must be added" |
| Coverage name required | Coverage row with blank name | Row-specific required message |
| Coverage limit required | Coverage row with blank limit | Row-specific required message |
| Deductible decimal validation | Invalid decimal format | Precision/scale validation via `CCM_UTIL_ValidateDecimalSize` |
| Coverage limit decimal validation | Invalid decimal format | Precision/scale validation via `CCM_UTIL_ValidateDecimalSize` |

---

## 7. Downstream Dependencies

Products are referenced by several other features in the application:

| Dependent Feature | How It Uses Products |
|-------------------|---------------------|
| **Customer Policies** | Policies are created under a product; they inherit the product's coverages and deductibles |
| **Policy Coverage Generation** | When a policy is created, coverages are auto-generated from the product's coverage definitions |
| **Policy Deductible Generation** | When a policy is created, deductibles are auto-generated from the product's deductible definitions |
| **Claim Type Configuration** | Claim types reference products to determine which products support which claim workflows |
| **Line of Business** | LOB create/update process validates product associations; deactivating an LOB affects linked products |

---

## 8. Products Group Context

Products sit within the Products Group alongside two sibling features:

### Lines of Business (LOB)
- Prerequisite for Products — a product must reference an active LOB
- LOB grid with Name, Status columns
- Create/Edit LOB form with Name and Status fields
- Deactivating an LOB triggers validation warnings on linked products

### Cost Categories
- Used for reserve management (separate from Products but in the same nav group)
- Scope options: "All LOBs" or "Specific LOBs"
- Maps cost categories to specific lines of business
- Create/Edit form with Name, Scope, and LOB mapping

### Navigation Structure

```
Claims Studio → Products Group
│
├── Lines of Business ......... LOB definitions (prerequisite for Products)
├── Products .................. Product definitions with coverages & deductibles ◄── THIS ANALYSIS
└── Cost Categories ........... Reserve cost category configuration
```

---

## 9. UX Patterns & Design Notes

| Pattern | Implementation |
|---------|---------------|
| Empty State | Illustration + "Get started defining your products" message + Create button |
| Grid Search | Text search across product name field |
| Tag Display | Status shown as colored tags using branding map (Active = green-toned, Inactive = grey-toned) |
| Currency Formatting | `a!currency()` function with ISO code from product record |
| Inline Grids (Form) | Editable grids for coverages and deductibles within the create/edit form |
| Row Add/Remove | "+ Add Coverage" / "+ Add Deductible" links; ✕ remove button per row |
| Dynamic Column Headers | Coverage "Limit" and Deductible "Amount" column headers include the selected currency code |
| Two-Column Summary | 4X left (details + claim types) / 6X right (coverages + deductibles) |
| Branding Map | All colors, card shapes, shadows, and borders driven by configurable branding map |
| Translation Strings | All labels use translation string references for i18n support |
| Form Instruction | "Required fields are marked with an asterisk (*)" displayed at top of form |
| Refresh After Action | Grids auto-refresh after record actions complete |

---

## 10. Technical Object Inventory

| Object Type | Count | Key Objects |
|-------------|-------|-------------|
| Record Types | 8 | Product, ProductCoverage, ProductDeductible, ProductClaimTypeMap, ActivationStatus, Currency, LineOfBusiness, ClaimType |
| Interfaces | 5 | CreateUpdate form, Summary view, Record grid, Currency selector, Currency field |
| Expression Rules | 10 | Query rules, initializers, save logic, validators, metadata setters |
| Process Models | 1 | CreateUpdate process |
| Constants | 4 | Active status ID, Inactive status ID, Default currency code (USD), Max char limit |
| Translation Strings | 30+ | All labels, messages, placeholders, and validation text |

**Total objects in Product action bundle:** 76  
**Total objects in Product page bundle:** 26

---

*This deep-dive analysis was generated from the Appian Atlas knowledge base. It covers the Products feature within the Claims Studio Products Group section of Connected Claims Management Demo v1.2.1.*
