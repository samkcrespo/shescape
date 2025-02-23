/**
 * @overview Contains property tests for the default shell on Windows systems.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";

import { arbitrary, constants } from "./_.js";

import { getDefaultShell } from "../../../src/win.js";

testProp(
  "%COMSPEC% is defined",
  [arbitrary.env(), arbitrary.windowsPath()],
  (t, env, ComSpec) => {
    env.ComSpec = ComSpec;

    const result = getDefaultShell({ env });
    t.is(result, ComSpec);
  }
);

testProp(`%COMSPEC% is not defined`, [arbitrary.env()], (t, env) => {
  delete env.ComSpec;

  const result = getDefaultShell({ env });
  t.is(result, constants.binCmd);
});
