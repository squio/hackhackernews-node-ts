import type { CommentResolvers } from "./../../types.generated";
/*
 * Note: This object type is generated because "CommentMapper" is declared. This is to ensure runtime safety.
 *
 * When a mapper is used, it is possible to hit runtime errors in some scenarios:
 * - given a field name, the schema type's field type does not match mapper's field type
 * - or a schema type's field does not exist in the mapper's fields
 *
 * If you want to skip this file generation, remove the mapper or update the pattern in the `resolverGeneration.object` config.
 */
export const Comment: CommentResolvers = {
  createdAt: ({ createdAt }, _arg, _ctx) => {
    return createdAt.toISOString();
  },

  link: async (parent, _arg, context) => {
    return context.prisma.link.findUniqueOrThrow({
      where: { id: parent.linkId },
    });
  },
};
