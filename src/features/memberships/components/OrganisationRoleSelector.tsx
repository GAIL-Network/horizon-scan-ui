"use client";

import { Selector, SelectItem } from "@/components/Selector";
import {
  OrganisationRole,
  ORGANISATION_ROLES,
} from "@/features/organisation/models";

type RoleOption = SelectItem<OrganisationRole>;

const ROLE_OPTIONS: RoleOption[] = ORGANISATION_ROLES.map((role) => ({
  id: role, // DOM value
  value: role, // domain value
  label: role, // UI label (replace later with nicer labels if desired)
}));

type Props = {
  value: OrganisationRole;
  onChange: (role: OrganisationRole) => void;
};

export function OrganisationRoleSelector({ value, onChange }: Props) {
  const selected = ROLE_OPTIONS.find((opt) => opt.value === value) ?? null;

  return (
    <Selector
      value={selected}
      options={ROLE_OPTIONS}
      onChange={(opt) => onChange(opt.value)}
    />
  );
}
