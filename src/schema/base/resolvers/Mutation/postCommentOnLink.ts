import { GraphQLError } from "graphql";
import { parseIntSafe } from "../../../../utils";
import type { MutationResolvers } from "./../../../types.generated";
import { Prisma } from "@prisma/client";
export const postCommentOnLink: NonNullable<MutationResolvers['postCommentOnLink']> = async (_parent, args, context) => {
  const linkId = parseIntSafe(args.linkId);

  if (linkId === null) {
    return Promise.reject(
      new GraphQLError(
        `Cannot post comment on non-existing link with id '${args.linkId}'.`
      )
    );
  }

  const newComment = await context.prisma.comment
    .create({
      data: {
        linkId: parseInt(args.linkId),
        body: args.body,
      },
    })
    .catch((error: unknown) => {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2003"
      ) {
        return Promise.reject(
          new GraphQLError(
            `Cannot post comment on non-existing link with id '${args.linkId}'.`
          )
        );
      }

      return Promise.reject(error);
    });
  return newComment;
};
