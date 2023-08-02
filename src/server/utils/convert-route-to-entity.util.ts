const mapping: Record<string, string> = {
  'cv-templates': 'cv_template',
  organizations: 'organization',
  'role-templates': 'role_template',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
