import React from "react";
import { ChildrenPropTypes } from "../../types/Common";

export function EmptyGuard(props: ChildrenPropTypes) {
  const { children } = props;

  return <>{children}</>;
}
