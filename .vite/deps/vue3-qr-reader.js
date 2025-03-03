import {
  EMPTY_OBJ,
  NO,
  NOOP,
  PatchFlagNames,
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  camelize,
  capitalize,
  extend,
  generateCodeFrame,
  hyphenate,
  init_runtime_dom_esm_bundler,
  init_shared_esm_bundler,
  isArray,
  isBuiltInDirective,
  isHTMLTag,
  isObject,
  isOn,
  isReservedProp,
  isSVGTag,
  isString,
  isSymbol,
  isVoidTag,
  makeMap,
  parseStringStyle,
  runtime_dom_esm_bundler_exports,
  shared_esm_bundler_exports,
  slotFlagsText,
  toHandlerKey
} from "./chunk-FH2TP6J3.js";

// node_modules/@vue/compiler-core/dist/compiler-core.esm-bundler.js
function defaultOnError(error) {
  throw error;
}
function defaultOnWarn(msg) {
  console.warn(`[Vue warn] ${msg.message}`);
}
function createCompilerError(code, loc, messages, additionalMessage) {
  const msg = true ? (messages || errorMessages)[code] + (additionalMessage || ``) : code;
  const error = new SyntaxError(String(msg));
  error.code = code;
  error.loc = loc;
  return error;
}
function registerRuntimeHelpers(helpers) {
  Object.getOwnPropertySymbols(helpers).forEach((s) => {
    helperNameMap[s] = helpers[s];
  });
}
function createRoot(children, loc = locStub) {
  return {
    type: 0,
    children,
    helpers: /* @__PURE__ */ new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: 0,
    temps: 0,
    codegenNode: void 0,
    loc
  };
}
function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives, isBlock = false, disableTracking = false, isComponent2 = false, loc = locStub) {
  if (context) {
    if (isBlock) {
      context.helper(OPEN_BLOCK);
      context.helper(getVNodeBlockHelper(context.inSSR, isComponent2));
    } else {
      context.helper(getVNodeHelper(context.inSSR, isComponent2));
    }
    if (directives) {
      context.helper(WITH_DIRECTIVES);
    }
  }
  return {
    type: 13,
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent: isComponent2,
    loc
  };
}
function createArrayExpression(elements, loc = locStub) {
  return {
    type: 17,
    loc,
    elements
  };
}
function createObjectExpression(properties, loc = locStub) {
  return {
    type: 15,
    loc,
    properties
  };
}
function createObjectProperty(key, value) {
  return {
    type: 16,
    loc: locStub,
    key: isString(key) ? createSimpleExpression(key, true) : key,
    value
  };
}
function createSimpleExpression(content, isStatic = false, loc = locStub, constType = 0) {
  return {
    type: 4,
    loc,
    content,
    isStatic,
    constType: isStatic ? 3 : constType
  };
}
function createInterpolation(content, loc) {
  return {
    type: 5,
    loc,
    content: isString(content) ? createSimpleExpression(content, false, loc) : content
  };
}
function createCompoundExpression(children, loc = locStub) {
  return {
    type: 8,
    loc,
    children
  };
}
function createCallExpression(callee, args = [], loc = locStub) {
  return {
    type: 14,
    loc,
    callee,
    arguments: args
  };
}
function createFunctionExpression(params, returns = void 0, newline = false, isSlot = false, loc = locStub) {
  return {
    type: 18,
    params,
    returns,
    newline,
    isSlot,
    loc
  };
}
function createConditionalExpression(test, consequent, alternate, newline = true) {
  return {
    type: 19,
    test,
    consequent,
    alternate,
    newline,
    loc: locStub
  };
}
function createCacheExpression(index, value, isVNode = false) {
  return {
    type: 20,
    index,
    value,
    isVNode,
    loc: locStub
  };
}
function createBlockStatement(body) {
  return {
    type: 21,
    body,
    loc: locStub
  };
}
function createTemplateLiteral(elements) {
  return {
    type: 22,
    elements,
    loc: locStub
  };
}
function createIfStatement(test, consequent, alternate) {
  return {
    type: 23,
    test,
    consequent,
    alternate,
    loc: locStub
  };
}
function createAssignmentExpression(left, right) {
  return {
    type: 24,
    left,
    right,
    loc: locStub
  };
}
function createSequenceExpression(expressions) {
  return {
    type: 25,
    expressions,
    loc: locStub
  };
}
function createReturnStatement(returns) {
  return {
    type: 26,
    returns,
    loc: locStub
  };
}
function getVNodeHelper(ssr, isComponent2) {
  return ssr || isComponent2 ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
}
function getVNodeBlockHelper(ssr, isComponent2) {
  return ssr || isComponent2 ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
}
function convertToBlock(node, { helper, removeHelper, inSSR }) {
  if (!node.isBlock) {
    node.isBlock = true;
    removeHelper(getVNodeHelper(inSSR, node.isComponent));
    helper(OPEN_BLOCK);
    helper(getVNodeBlockHelper(inSSR, node.isComponent));
  }
}
function isCoreComponent(tag) {
  if (isBuiltInType(tag, "Teleport")) {
    return TELEPORT;
  } else if (isBuiltInType(tag, "Suspense")) {
    return SUSPENSE;
  } else if (isBuiltInType(tag, "KeepAlive")) {
    return KEEP_ALIVE;
  } else if (isBuiltInType(tag, "BaseTransition")) {
    return BASE_TRANSITION;
  }
}
function getInnerRange(loc, offset, length) {
  const source = loc.source.slice(offset, offset + length);
  const newLoc = {
    source,
    start: advancePositionWithClone(loc.start, loc.source, offset),
    end: loc.end
  };
  if (length != null) {
    newLoc.end = advancePositionWithClone(
      loc.start,
      loc.source,
      offset + length
    );
  }
  return newLoc;
}
function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
  return advancePositionWithMutation(
    extend({}, pos),
    source,
    numberOfCharacters
  );
}
function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
  let linesCount = 0;
  let lastNewLinePos = -1;
  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10) {
      linesCount++;
      lastNewLinePos = i;
    }
  }
  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
  return pos;
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg || `unexpected compiler condition`);
  }
}
function findDir(node, name, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 7 && (allowEmpty || p.exp) && (isString(name) ? p.name === name : name.test(p.name))) {
      return p;
    }
  }
}
function findProp(node, name, dynamicOnly = false, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 6) {
      if (dynamicOnly)
        continue;
      if (p.name === name && (p.value || allowEmpty)) {
        return p;
      }
    } else if (p.name === "bind" && (p.exp || allowEmpty) && isStaticArgOf(p.arg, name)) {
      return p;
    }
  }
}
function isStaticArgOf(arg, name) {
  return !!(arg && isStaticExp(arg) && arg.content === name);
}
function hasDynamicKeyVBind(node) {
  return node.props.some(
    (p) => p.type === 7 && p.name === "bind" && (!p.arg || // v-bind="obj"
    p.arg.type !== 4 || // v-bind:[_ctx.foo]
    !p.arg.isStatic)
    // v-bind:[foo]
  );
}
function isText$1(node) {
  return node.type === 5 || node.type === 2;
}
function isVSlot(p) {
  return p.type === 7 && p.name === "slot";
}
function isTemplateNode(node) {
  return node.type === 1 && node.tagType === 3;
}
function isSlotOutlet(node) {
  return node.type === 1 && node.tagType === 2;
}
function getUnnormalizedProps(props, callPath = []) {
  if (props && !isString(props) && props.type === 14) {
    const callee = props.callee;
    if (!isString(callee) && propsHelperSet.has(callee)) {
      return getUnnormalizedProps(
        props.arguments[0],
        callPath.concat(props)
      );
    }
  }
  return [props, callPath];
}
function injectProp(node, prop, context) {
  let propsWithInjection;
  let props = node.type === 13 ? node.props : node.arguments[2];
  let callPath = [];
  let parentCall;
  if (props && !isString(props) && props.type === 14) {
    const ret = getUnnormalizedProps(props);
    props = ret[0];
    callPath = ret[1];
    parentCall = callPath[callPath.length - 1];
  }
  if (props == null || isString(props)) {
    propsWithInjection = createObjectExpression([prop]);
  } else if (props.type === 14) {
    const first = props.arguments[0];
    if (!isString(first) && first.type === 15) {
      if (!hasProp(prop, first)) {
        first.properties.unshift(prop);
      }
    } else {
      if (props.callee === TO_HANDLERS) {
        propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
          createObjectExpression([prop]),
          props
        ]);
      } else {
        props.arguments.unshift(createObjectExpression([prop]));
      }
    }
    !propsWithInjection && (propsWithInjection = props);
  } else if (props.type === 15) {
    if (!hasProp(prop, props)) {
      props.properties.unshift(prop);
    }
    propsWithInjection = props;
  } else {
    propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
      createObjectExpression([prop]),
      props
    ]);
    if (parentCall && parentCall.callee === GUARD_REACTIVE_PROPS) {
      parentCall = callPath[callPath.length - 2];
    }
  }
  if (node.type === 13) {
    if (parentCall) {
      parentCall.arguments[0] = propsWithInjection;
    } else {
      node.props = propsWithInjection;
    }
  } else {
    if (parentCall) {
      parentCall.arguments[0] = propsWithInjection;
    } else {
      node.arguments[2] = propsWithInjection;
    }
  }
}
function hasProp(prop, props) {
  let result = false;
  if (prop.key.type === 4) {
    const propKeyName = prop.key.content;
    result = props.properties.some(
      (p) => p.key.type === 4 && p.key.content === propKeyName
    );
  }
  return result;
}
function toValidAssetId(name, type) {
  return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue) => {
    return searchValue === "-" ? "_" : name.charCodeAt(replaceValue).toString();
  })}`;
}
function hasScopeRef(node, ids) {
  if (!node || Object.keys(ids).length === 0) {
    return false;
  }
  switch (node.type) {
    case 1:
      for (let i = 0; i < node.props.length; i++) {
        const p = node.props[i];
        if (p.type === 7 && (hasScopeRef(p.arg, ids) || hasScopeRef(p.exp, ids))) {
          return true;
        }
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 11:
      if (hasScopeRef(node.source, ids)) {
        return true;
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 9:
      return node.branches.some((b) => hasScopeRef(b, ids));
    case 10:
      if (hasScopeRef(node.condition, ids)) {
        return true;
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 4:
      return !node.isStatic && isSimpleIdentifier(node.content) && !!ids[node.content];
    case 8:
      return node.children.some((c) => isObject(c) && hasScopeRef(c, ids));
    case 5:
    case 12:
      return hasScopeRef(node.content, ids);
    case 2:
    case 3:
      return false;
    default:
      if (true)
        ;
      return false;
  }
}
function getMemoedVNodeCall(node) {
  if (node.type === 14 && node.callee === WITH_MEMO) {
    return node.arguments[1].returns;
  } else {
    return node;
  }
}
function getCompatValue(key, context) {
  const config = context.options ? context.options.compatConfig : context.compatConfig;
  const value = config && config[key];
  if (key === "MODE") {
    return value || 3;
  } else {
    return value;
  }
}
function isCompatEnabled(key, context) {
  const mode = getCompatValue("MODE", context);
  const value = getCompatValue(key, context);
  return mode === 3 ? value === true : value !== false;
}
function checkCompatEnabled(key, context, loc, ...args) {
  const enabled = isCompatEnabled(key, context);
  if (enabled) {
    warnDeprecation(key, context, loc, ...args);
  }
  return enabled;
}
function warnDeprecation(key, context, loc, ...args) {
  const val = getCompatValue(key, context);
  if (val === "suppress-warning") {
    return;
  }
  const { message, link } = deprecationData[key];
  const msg = `(deprecation ${key}) ${typeof message === "function" ? message(...args) : message}${link ? `
  Details: ${link}` : ``}`;
  const err = new SyntaxError(msg);
  err.code = key;
  if (loc)
    err.loc = loc;
  context.onWarn(err);
}
function baseParse(content, options = {}) {
  const context = createParserContext(content, options);
  const start = getCursor(context);
  return createRoot(
    parseChildren(context, 0, []),
    getSelection(context, start)
  );
}
function createParserContext(content, rawOptions) {
  const options = extend({}, defaultParserOptions);
  let key;
  for (key in rawOptions) {
    options[key] = rawOptions[key] === void 0 ? defaultParserOptions[key] : rawOptions[key];
  }
  return {
    options,
    column: 1,
    line: 1,
    offset: 0,
    originalSource: content,
    source: content,
    inPre: false,
    inVPre: false,
    onWarn: options.onWarn
  };
}
function parseChildren(context, mode, ancestors) {
  const parent = last(ancestors);
  const ns = parent ? parent.ns : 0;
  const nodes = [];
  while (!isEnd(context, mode, ancestors)) {
    const s = context.source;
    let node = void 0;
    if (mode === 0 || mode === 1) {
      if (!context.inVPre && startsWith(s, context.options.delimiters[0])) {
        node = parseInterpolation(context, mode);
      } else if (mode === 0 && s[0] === "<") {
        if (s.length === 1) {
          emitError(context, 5, 1);
        } else if (s[1] === "!") {
          if (startsWith(s, "<!--")) {
            node = parseComment(context);
          } else if (startsWith(s, "<!DOCTYPE")) {
            node = parseBogusComment(context);
          } else if (startsWith(s, "<![CDATA[")) {
            if (ns !== 0) {
              node = parseCDATA(context, ancestors);
            } else {
              emitError(context, 1);
              node = parseBogusComment(context);
            }
          } else {
            emitError(context, 11);
            node = parseBogusComment(context);
          }
        } else if (s[1] === "/") {
          if (s.length === 2) {
            emitError(context, 5, 2);
          } else if (s[2] === ">") {
            emitError(context, 14, 2);
            advanceBy(context, 3);
            continue;
          } else if (/[a-z]/i.test(s[2])) {
            emitError(context, 23);
            parseTag(context, TagType.End, parent);
            continue;
          } else {
            emitError(
              context,
              12,
              2
            );
            node = parseBogusComment(context);
          }
        } else if (/[a-z]/i.test(s[1])) {
          node = parseElement(context, ancestors);
          if (isCompatEnabled(
            "COMPILER_NATIVE_TEMPLATE",
            context
          ) && node && node.tag === "template" && !node.props.some(
            (p) => p.type === 7 && isSpecialTemplateDirective(p.name)
          )) {
            warnDeprecation(
              "COMPILER_NATIVE_TEMPLATE",
              context,
              node.loc
            );
            node = node.children;
          }
        } else if (s[1] === "?") {
          emitError(
            context,
            21,
            1
          );
          node = parseBogusComment(context);
        } else {
          emitError(context, 12, 1);
        }
      }
    }
    if (!node) {
      node = parseText(context, mode);
    }
    if (isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        pushNode(nodes, node[i]);
      }
    } else {
      pushNode(nodes, node);
    }
  }
  let removedWhitespace = false;
  if (mode !== 2 && mode !== 1) {
    const shouldCondense = context.options.whitespace !== "preserve";
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.type === 2) {
        if (!context.inPre) {
          if (!/[^\t\r\n\f ]/.test(node.content)) {
            const prev = nodes[i - 1];
            const next = nodes[i + 1];
            if (!prev || !next || shouldCondense && (prev.type === 3 && next.type === 3 || prev.type === 3 && next.type === 1 || prev.type === 1 && next.type === 3 || prev.type === 1 && next.type === 1 && /[\r\n]/.test(node.content))) {
              removedWhitespace = true;
              nodes[i] = null;
            } else {
              node.content = " ";
            }
          } else if (shouldCondense) {
            node.content = node.content.replace(/[\t\r\n\f ]+/g, " ");
          }
        } else {
          node.content = node.content.replace(/\r\n/g, "\n");
        }
      } else if (node.type === 3 && !context.options.comments) {
        removedWhitespace = true;
        nodes[i] = null;
      }
    }
    if (context.inPre && parent && context.options.isPreTag(parent.tag)) {
      const first = nodes[0];
      if (first && first.type === 2) {
        first.content = first.content.replace(/^\r?\n/, "");
      }
    }
  }
  return removedWhitespace ? nodes.filter(Boolean) : nodes;
}
function pushNode(nodes, node) {
  if (node.type === 2) {
    const prev = last(nodes);
    if (prev && prev.type === 2 && prev.loc.end.offset === node.loc.start.offset) {
      prev.content += node.content;
      prev.loc.end = node.loc.end;
      prev.loc.source += node.loc.source;
      return;
    }
  }
  nodes.push(node);
}
function parseCDATA(context, ancestors) {
  advanceBy(context, 9);
  const nodes = parseChildren(context, 3, ancestors);
  if (context.source.length === 0) {
    emitError(context, 6);
  } else {
    advanceBy(context, 3);
  }
  return nodes;
}
function parseComment(context) {
  const start = getCursor(context);
  let content;
  const match = /--(\!)?>/.exec(context.source);
  if (!match) {
    content = context.source.slice(4);
    advanceBy(context, context.source.length);
    emitError(context, 7);
  } else {
    if (match.index <= 3) {
      emitError(context, 0);
    }
    if (match[1]) {
      emitError(context, 10);
    }
    content = context.source.slice(4, match.index);
    const s = context.source.slice(0, match.index);
    let prevIndex = 1, nestedIndex = 0;
    while ((nestedIndex = s.indexOf("<!--", prevIndex)) !== -1) {
      advanceBy(context, nestedIndex - prevIndex + 1);
      if (nestedIndex + 4 < s.length) {
        emitError(context, 16);
      }
      prevIndex = nestedIndex + 1;
    }
    advanceBy(context, match.index + match[0].length - prevIndex + 1);
  }
  return {
    type: 3,
    content,
    loc: getSelection(context, start)
  };
}
function parseBogusComment(context) {
  const start = getCursor(context);
  const contentStart = context.source[1] === "?" ? 1 : 2;
  let content;
  const closeIndex = context.source.indexOf(">");
  if (closeIndex === -1) {
    content = context.source.slice(contentStart);
    advanceBy(context, context.source.length);
  } else {
    content = context.source.slice(contentStart, closeIndex);
    advanceBy(context, closeIndex + 1);
  }
  return {
    type: 3,
    content,
    loc: getSelection(context, start)
  };
}
function parseElement(context, ancestors) {
  const wasInPre = context.inPre;
  const wasInVPre = context.inVPre;
  const parent = last(ancestors);
  const element = parseTag(context, TagType.Start, parent);
  const isPreBoundary = context.inPre && !wasInPre;
  const isVPreBoundary = context.inVPre && !wasInVPre;
  if (element.isSelfClosing || context.options.isVoidTag(element.tag)) {
    if (isPreBoundary) {
      context.inPre = false;
    }
    if (isVPreBoundary) {
      context.inVPre = false;
    }
    return element;
  }
  ancestors.push(element);
  const mode = context.options.getTextMode(element, parent);
  const children = parseChildren(context, mode, ancestors);
  ancestors.pop();
  {
    const inlineTemplateProp = element.props.find(
      (p) => p.type === 6 && p.name === "inline-template"
    );
    if (inlineTemplateProp && checkCompatEnabled(
      "COMPILER_INLINE_TEMPLATE",
      context,
      inlineTemplateProp.loc
    )) {
      const loc = getSelection(context, element.loc.end);
      inlineTemplateProp.value = {
        type: 2,
        content: loc.source,
        loc
      };
    }
  }
  element.children = children;
  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.End, parent);
  } else {
    emitError(context, 24, 0, element.loc.start);
    if (context.source.length === 0 && element.tag.toLowerCase() === "script") {
      const first = children[0];
      if (first && startsWith(first.loc.source, "<!--")) {
        emitError(context, 8);
      }
    }
  }
  element.loc = getSelection(context, element.loc.start);
  if (isPreBoundary) {
    context.inPre = false;
  }
  if (isVPreBoundary) {
    context.inVPre = false;
  }
  return element;
}
function parseTag(context, type, parent) {
  const start = getCursor(context);
  const match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source);
  const tag = match[1];
  const ns = context.options.getNamespace(tag, parent);
  advanceBy(context, match[0].length);
  advanceSpaces(context);
  const cursor = getCursor(context);
  const currentSource = context.source;
  if (context.options.isPreTag(tag)) {
    context.inPre = true;
  }
  let props = parseAttributes(context, type);
  if (type === 0 && !context.inVPre && props.some((p) => p.type === 7 && p.name === "pre")) {
    context.inVPre = true;
    extend(context, cursor);
    context.source = currentSource;
    props = parseAttributes(context, type).filter((p) => p.name !== "v-pre");
  }
  let isSelfClosing = false;
  if (context.source.length === 0) {
    emitError(context, 9);
  } else {
    isSelfClosing = startsWith(context.source, "/>");
    if (type === 1 && isSelfClosing) {
      emitError(context, 4);
    }
    advanceBy(context, isSelfClosing ? 2 : 1);
  }
  if (type === 1) {
    return;
  }
  if (isCompatEnabled(
    "COMPILER_V_IF_V_FOR_PRECEDENCE",
    context
  )) {
    let hasIf = false;
    let hasFor = false;
    for (let i = 0; i < props.length; i++) {
      const p = props[i];
      if (p.type === 7) {
        if (p.name === "if") {
          hasIf = true;
        } else if (p.name === "for") {
          hasFor = true;
        }
      }
      if (hasIf && hasFor) {
        warnDeprecation(
          "COMPILER_V_IF_V_FOR_PRECEDENCE",
          context,
          getSelection(context, start)
        );
        break;
      }
    }
  }
  let tagType = 0;
  if (!context.inVPre) {
    if (tag === "slot") {
      tagType = 2;
    } else if (tag === "template") {
      if (props.some(
        (p) => p.type === 7 && isSpecialTemplateDirective(p.name)
      )) {
        tagType = 3;
      }
    } else if (isComponent(tag, props, context)) {
      tagType = 1;
    }
  }
  return {
    type: 1,
    ns,
    tag,
    tagType,
    props,
    isSelfClosing,
    children: [],
    loc: getSelection(context, start),
    codegenNode: void 0
    // to be created during transform phase
  };
}
function isComponent(tag, props, context) {
  const options = context.options;
  if (options.isCustomElement(tag)) {
    return false;
  }
  if (tag === "component" || /^[A-Z]/.test(tag) || isCoreComponent(tag) || options.isBuiltInComponent && options.isBuiltInComponent(tag) || options.isNativeTag && !options.isNativeTag(tag)) {
    return true;
  }
  for (let i = 0; i < props.length; i++) {
    const p = props[i];
    if (p.type === 6) {
      if (p.name === "is" && p.value) {
        if (p.value.content.startsWith("vue:")) {
          return true;
        } else if (checkCompatEnabled(
          "COMPILER_IS_ON_ELEMENT",
          context,
          p.loc
        )) {
          return true;
        }
      }
    } else {
      if (p.name === "is") {
        return true;
      } else if (
        // :is on plain element - only treat as component in compat mode
        p.name === "bind" && isStaticArgOf(p.arg, "is") && true && checkCompatEnabled(
          "COMPILER_IS_ON_ELEMENT",
          context,
          p.loc
        )
      ) {
        return true;
      }
    }
  }
}
function parseAttributes(context, type) {
  const props = [];
  const attributeNames = /* @__PURE__ */ new Set();
  while (context.source.length > 0 && !startsWith(context.source, ">") && !startsWith(context.source, "/>")) {
    if (startsWith(context.source, "/")) {
      emitError(context, 22);
      advanceBy(context, 1);
      advanceSpaces(context);
      continue;
    }
    if (type === 1) {
      emitError(context, 3);
    }
    const attr = parseAttribute(context, attributeNames);
    if (attr.type === 6 && attr.value && attr.name === "class") {
      attr.value.content = attr.value.content.replace(/\s+/g, " ").trim();
    }
    if (type === 0) {
      props.push(attr);
    }
    if (/^[^\t\r\n\f />]/.test(context.source)) {
      emitError(context, 15);
    }
    advanceSpaces(context);
  }
  return props;
}
function parseAttribute(context, nameSet) {
  var _a;
  const start = getCursor(context);
  const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source);
  const name = match[0];
  if (nameSet.has(name)) {
    emitError(context, 2);
  }
  nameSet.add(name);
  if (name[0] === "=") {
    emitError(context, 19);
  }
  {
    const pattern = /["'<]/g;
    let m;
    while (m = pattern.exec(name)) {
      emitError(
        context,
        17,
        m.index
      );
    }
  }
  advanceBy(context, name.length);
  let value = void 0;
  if (/^[\t\r\n\f ]*=/.test(context.source)) {
    advanceSpaces(context);
    advanceBy(context, 1);
    advanceSpaces(context);
    value = parseAttributeValue(context);
    if (!value) {
      emitError(context, 13);
    }
  }
  const loc = getSelection(context, start);
  if (!context.inVPre && /^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(name)) {
    const match2 = /(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(
      name
    );
    let isPropShorthand = startsWith(name, ".");
    let dirName = match2[1] || (isPropShorthand || startsWith(name, ":") ? "bind" : startsWith(name, "@") ? "on" : "slot");
    let arg;
    if (match2[2]) {
      const isSlot = dirName === "slot";
      const startOffset = name.lastIndexOf(
        match2[2],
        name.length - (((_a = match2[3]) == null ? void 0 : _a.length) || 0)
      );
      const loc2 = getSelection(
        context,
        getNewPosition(context, start, startOffset),
        getNewPosition(
          context,
          start,
          startOffset + match2[2].length + (isSlot && match2[3] || "").length
        )
      );
      let content = match2[2];
      let isStatic = true;
      if (content.startsWith("[")) {
        isStatic = false;
        if (!content.endsWith("]")) {
          emitError(
            context,
            27
          );
          content = content.slice(1);
        } else {
          content = content.slice(1, content.length - 1);
        }
      } else if (isSlot) {
        content += match2[3] || "";
      }
      arg = {
        type: 4,
        content,
        isStatic,
        constType: isStatic ? 3 : 0,
        loc: loc2
      };
    }
    if (value && value.isQuoted) {
      const valueLoc = value.loc;
      valueLoc.start.offset++;
      valueLoc.start.column++;
      valueLoc.end = advancePositionWithClone(valueLoc.start, value.content);
      valueLoc.source = valueLoc.source.slice(1, -1);
    }
    const modifiers = match2[3] ? match2[3].slice(1).split(".") : [];
    if (isPropShorthand)
      modifiers.push("prop");
    if (dirName === "bind" && arg) {
      if (modifiers.includes("sync") && checkCompatEnabled(
        "COMPILER_V_BIND_SYNC",
        context,
        loc,
        arg.loc.source
      )) {
        dirName = "model";
        modifiers.splice(modifiers.indexOf("sync"), 1);
      }
      if (modifiers.includes("prop")) {
        checkCompatEnabled(
          "COMPILER_V_BIND_PROP",
          context,
          loc
        );
      }
    }
    return {
      type: 7,
      name: dirName,
      exp: value && {
        type: 4,
        content: value.content,
        isStatic: false,
        // Treat as non-constant by default. This can be potentially set to
        // other values by `transformExpression` to make it eligible for hoisting.
        constType: 0,
        loc: value.loc
      },
      arg,
      modifiers,
      loc
    };
  }
  if (!context.inVPre && startsWith(name, "v-")) {
    emitError(context, 26);
  }
  return {
    type: 6,
    name,
    value: value && {
      type: 2,
      content: value.content,
      loc: value.loc
    },
    loc
  };
}
function parseAttributeValue(context) {
  const start = getCursor(context);
  let content;
  const quote = context.source[0];
  const isQuoted = quote === `"` || quote === `'`;
  if (isQuoted) {
    advanceBy(context, 1);
    const endIndex = context.source.indexOf(quote);
    if (endIndex === -1) {
      content = parseTextData(
        context,
        context.source.length,
        4
      );
    } else {
      content = parseTextData(context, endIndex, 4);
      advanceBy(context, 1);
    }
  } else {
    const match = /^[^\t\r\n\f >]+/.exec(context.source);
    if (!match) {
      return void 0;
    }
    const unexpectedChars = /["'<=`]/g;
    let m;
    while (m = unexpectedChars.exec(match[0])) {
      emitError(
        context,
        18,
        m.index
      );
    }
    content = parseTextData(context, match[0].length, 4);
  }
  return { content, isQuoted, loc: getSelection(context, start) };
}
function parseInterpolation(context, mode) {
  const [open, close] = context.options.delimiters;
  const closeIndex = context.source.indexOf(close, open.length);
  if (closeIndex === -1) {
    emitError(context, 25);
    return void 0;
  }
  const start = getCursor(context);
  advanceBy(context, open.length);
  const innerStart = getCursor(context);
  const innerEnd = getCursor(context);
  const rawContentLength = closeIndex - open.length;
  const rawContent = context.source.slice(0, rawContentLength);
  const preTrimContent = parseTextData(context, rawContentLength, mode);
  const content = preTrimContent.trim();
  const startOffset = preTrimContent.indexOf(content);
  if (startOffset > 0) {
    advancePositionWithMutation(innerStart, rawContent, startOffset);
  }
  const endOffset = rawContentLength - (preTrimContent.length - content.length - startOffset);
  advancePositionWithMutation(innerEnd, rawContent, endOffset);
  advanceBy(context, close.length);
  return {
    type: 5,
    content: {
      type: 4,
      isStatic: false,
      // Set `isConstant` to false by default and will decide in transformExpression
      constType: 0,
      content,
      loc: getSelection(context, innerStart, innerEnd)
    },
    loc: getSelection(context, start)
  };
}
function parseText(context, mode) {
  const endTokens = mode === 3 ? ["]]>"] : ["<", context.options.delimiters[0]];
  let endIndex = context.source.length;
  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1);
    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }
  const start = getCursor(context);
  const content = parseTextData(context, endIndex, mode);
  return {
    type: 2,
    content,
    loc: getSelection(context, start)
  };
}
function parseTextData(context, length, mode) {
  const rawText = context.source.slice(0, length);
  advanceBy(context, length);
  if (mode === 2 || mode === 3 || !rawText.includes("&")) {
    return rawText;
  } else {
    return context.options.decodeEntities(
      rawText,
      mode === 4
    );
  }
}
function getCursor(context) {
  const { column, line, offset } = context;
  return { column, line, offset };
}
function getSelection(context, start, end) {
  end = end || getCursor(context);
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset)
  };
}
function last(xs) {
  return xs[xs.length - 1];
}
function startsWith(source, searchString) {
  return source.startsWith(searchString);
}
function advanceBy(context, numberOfCharacters) {
  const { source } = context;
  advancePositionWithMutation(context, source, numberOfCharacters);
  context.source = source.slice(numberOfCharacters);
}
function advanceSpaces(context) {
  const match = /^[\t\r\n\f ]+/.exec(context.source);
  if (match) {
    advanceBy(context, match[0].length);
  }
}
function getNewPosition(context, start, numberOfCharacters) {
  return advancePositionWithClone(
    start,
    context.originalSource.slice(start.offset, numberOfCharacters),
    numberOfCharacters
  );
}
function emitError(context, code, offset, loc = getCursor(context)) {
  if (offset) {
    loc.offset += offset;
    loc.column += offset;
  }
  context.options.onError(
    createCompilerError(code, {
      start: loc,
      end: loc,
      source: ""
    })
  );
}
function isEnd(context, mode, ancestors) {
  const s = context.source;
  switch (mode) {
    case 0:
      if (startsWith(s, "</")) {
        for (let i = ancestors.length - 1; i >= 0; --i) {
          if (startsWithEndTagOpen(s, ancestors[i].tag)) {
            return true;
          }
        }
      }
      break;
    case 1:
    case 2: {
      const parent = last(ancestors);
      if (parent && startsWithEndTagOpen(s, parent.tag)) {
        return true;
      }
      break;
    }
    case 3:
      if (startsWith(s, "]]>")) {
        return true;
      }
      break;
  }
  return !s;
}
function startsWithEndTagOpen(source, tag) {
  return startsWith(source, "</") && source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase() && /[\t\r\n\f />]/.test(source[2 + tag.length] || ">");
}
function hoistStatic(root, context) {
  walk(
    root,
    context,
    // Root node is unfortunately non-hoistable due to potential parent
    // fallthrough attributes.
    isSingleElementRoot(root, root.children[0])
  );
}
function isSingleElementRoot(root, child) {
  const { children } = root;
  return children.length === 1 && child.type === 1 && !isSlotOutlet(child);
}
function walk(node, context, doNotHoistNode = false) {
  const { children } = node;
  const originalCount = children.length;
  let hoistedCount = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === 1 && child.tagType === 0) {
      const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
      if (constantType > 0) {
        if (constantType >= 2) {
          child.codegenNode.patchFlag = -1 + (true ? ` /* HOISTED */` : ``);
          child.codegenNode = context.hoist(child.codegenNode);
          hoistedCount++;
          continue;
        }
      } else {
        const codegenNode = child.codegenNode;
        if (codegenNode.type === 13) {
          const flag = getPatchFlag(codegenNode);
          if ((!flag || flag === 512 || flag === 1) && getGeneratedPropsConstantType(child, context) >= 2) {
            const props = getNodeProps(child);
            if (props) {
              codegenNode.props = context.hoist(props);
            }
          }
          if (codegenNode.dynamicProps) {
            codegenNode.dynamicProps = context.hoist(codegenNode.dynamicProps);
          }
        }
      }
    }
    if (child.type === 1) {
      const isComponent2 = child.tagType === 1;
      if (isComponent2) {
        context.scopes.vSlot++;
      }
      walk(child, context);
      if (isComponent2) {
        context.scopes.vSlot--;
      }
    } else if (child.type === 11) {
      walk(child, context, child.children.length === 1);
    } else if (child.type === 9) {
      for (let i2 = 0; i2 < child.branches.length; i2++) {
        walk(
          child.branches[i2],
          context,
          child.branches[i2].children.length === 1
        );
      }
    }
  }
  if (hoistedCount && context.transformHoist) {
    context.transformHoist(children, context, node);
  }
  if (hoistedCount && hoistedCount === originalCount && node.type === 1 && node.tagType === 0 && node.codegenNode && node.codegenNode.type === 13 && isArray(node.codegenNode.children)) {
    node.codegenNode.children = context.hoist(
      createArrayExpression(node.codegenNode.children)
    );
  }
}
function getConstantType(node, context) {
  const { constantCache } = context;
  switch (node.type) {
    case 1:
      if (node.tagType !== 0) {
        return 0;
      }
      const cached = constantCache.get(node);
      if (cached !== void 0) {
        return cached;
      }
      const codegenNode = node.codegenNode;
      if (codegenNode.type !== 13) {
        return 0;
      }
      if (codegenNode.isBlock && node.tag !== "svg" && node.tag !== "foreignObject") {
        return 0;
      }
      const flag = getPatchFlag(codegenNode);
      if (!flag) {
        let returnType2 = 3;
        const generatedPropsType = getGeneratedPropsConstantType(node, context);
        if (generatedPropsType === 0) {
          constantCache.set(node, 0);
          return 0;
        }
        if (generatedPropsType < returnType2) {
          returnType2 = generatedPropsType;
        }
        for (let i = 0; i < node.children.length; i++) {
          const childType = getConstantType(node.children[i], context);
          if (childType === 0) {
            constantCache.set(node, 0);
            return 0;
          }
          if (childType < returnType2) {
            returnType2 = childType;
          }
        }
        if (returnType2 > 1) {
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i];
            if (p.type === 7 && p.name === "bind" && p.exp) {
              const expType = getConstantType(p.exp, context);
              if (expType === 0) {
                constantCache.set(node, 0);
                return 0;
              }
              if (expType < returnType2) {
                returnType2 = expType;
              }
            }
          }
        }
        if (codegenNode.isBlock) {
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i];
            if (p.type === 7) {
              constantCache.set(node, 0);
              return 0;
            }
          }
          context.removeHelper(OPEN_BLOCK);
          context.removeHelper(
            getVNodeBlockHelper(context.inSSR, codegenNode.isComponent)
          );
          codegenNode.isBlock = false;
          context.helper(getVNodeHelper(context.inSSR, codegenNode.isComponent));
        }
        constantCache.set(node, returnType2);
        return returnType2;
      } else {
        constantCache.set(node, 0);
        return 0;
      }
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
      return 0;
    case 5:
    case 12:
      return getConstantType(node.content, context);
    case 4:
      return node.constType;
    case 8:
      let returnType = 3;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (isString(child) || isSymbol(child)) {
          continue;
        }
        const childType = getConstantType(child, context);
        if (childType === 0) {
          return 0;
        } else if (childType < returnType) {
          returnType = childType;
        }
      }
      return returnType;
    default:
      if (true)
        ;
      return 0;
  }
}
function getConstantTypeOfHelperCall(value, context) {
  if (value.type === 14 && !isString(value.callee) && allowHoistedHelperSet.has(value.callee)) {
    const arg = value.arguments[0];
    if (arg.type === 4) {
      return getConstantType(arg, context);
    } else if (arg.type === 14) {
      return getConstantTypeOfHelperCall(arg, context);
    }
  }
  return 0;
}
function getGeneratedPropsConstantType(node, context) {
  let returnType = 3;
  const props = getNodeProps(node);
  if (props && props.type === 15) {
    const { properties } = props;
    for (let i = 0; i < properties.length; i++) {
      const { key, value } = properties[i];
      const keyType = getConstantType(key, context);
      if (keyType === 0) {
        return keyType;
      }
      if (keyType < returnType) {
        returnType = keyType;
      }
      let valueType;
      if (value.type === 4) {
        valueType = getConstantType(value, context);
      } else if (value.type === 14) {
        valueType = getConstantTypeOfHelperCall(value, context);
      } else {
        valueType = 0;
      }
      if (valueType === 0) {
        return valueType;
      }
      if (valueType < returnType) {
        returnType = valueType;
      }
    }
  }
  return returnType;
}
function getNodeProps(node) {
  const codegenNode = node.codegenNode;
  if (codegenNode.type === 13) {
    return codegenNode.props;
  }
}
function getPatchFlag(node) {
  const flag = node.patchFlag;
  return flag ? parseInt(flag, 10) : void 0;
}
function createTransformContext(root, {
  filename = "",
  prefixIdentifiers = false,
  hoistStatic: hoistStatic2 = false,
  cacheHandlers = false,
  nodeTransforms = [],
  directiveTransforms = {},
  transformHoist = null,
  isBuiltInComponent = NOOP,
  isCustomElement = NOOP,
  expressionPlugins = [],
  scopeId = null,
  slotted = true,
  ssr = false,
  inSSR = false,
  ssrCssVars = ``,
  bindingMetadata = EMPTY_OBJ,
  inline = false,
  isTS = false,
  onError = defaultOnError,
  onWarn = defaultOnWarn,
  compatConfig
}) {
  const nameMatch = filename.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/);
  const context = {
    // options
    selfName: nameMatch && capitalize(camelize(nameMatch[1])),
    prefixIdentifiers,
    hoistStatic: hoistStatic2,
    cacheHandlers,
    nodeTransforms,
    directiveTransforms,
    transformHoist,
    isBuiltInComponent,
    isCustomElement,
    expressionPlugins,
    scopeId,
    slotted,
    ssr,
    inSSR,
    ssrCssVars,
    bindingMetadata,
    inline,
    isTS,
    onError,
    onWarn,
    compatConfig,
    // state
    root,
    helpers: /* @__PURE__ */ new Map(),
    components: /* @__PURE__ */ new Set(),
    directives: /* @__PURE__ */ new Set(),
    hoists: [],
    imports: [],
    constantCache: /* @__PURE__ */ new Map(),
    temps: 0,
    cached: 0,
    identifiers: /* @__PURE__ */ Object.create(null),
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    currentNode: root,
    childIndex: 0,
    inVOnce: false,
    // methods
    helper(name) {
      const count = context.helpers.get(name) || 0;
      context.helpers.set(name, count + 1);
      return name;
    },
    removeHelper(name) {
      const count = context.helpers.get(name);
      if (count) {
        const currentCount = count - 1;
        if (!currentCount) {
          context.helpers.delete(name);
        } else {
          context.helpers.set(name, currentCount);
        }
      }
    },
    helperString(name) {
      return `_${helperNameMap[context.helper(name)]}`;
    },
    replaceNode(node) {
      if (true) {
        if (!context.currentNode) {
          throw new Error(`Node being replaced is already removed.`);
        }
        if (!context.parent) {
          throw new Error(`Cannot replace root node.`);
        }
      }
      context.parent.children[context.childIndex] = context.currentNode = node;
    },
    removeNode(node) {
      if (!context.parent) {
        throw new Error(`Cannot remove root node.`);
      }
      const list = context.parent.children;
      const removalIndex = node ? list.indexOf(node) : context.currentNode ? context.childIndex : -1;
      if (removalIndex < 0) {
        throw new Error(`node being removed is not a child of current parent`);
      }
      if (!node || node === context.currentNode) {
        context.currentNode = null;
        context.onNodeRemoved();
      } else {
        if (context.childIndex > removalIndex) {
          context.childIndex--;
          context.onNodeRemoved();
        }
      }
      context.parent.children.splice(removalIndex, 1);
    },
    onNodeRemoved: () => {
    },
    addIdentifiers(exp) {
    },
    removeIdentifiers(exp) {
    },
    hoist(exp) {
      if (isString(exp))
        exp = createSimpleExpression(exp);
      context.hoists.push(exp);
      const identifier = createSimpleExpression(
        `_hoisted_${context.hoists.length}`,
        false,
        exp.loc,
        2
      );
      identifier.hoisted = exp;
      return identifier;
    },
    cache(exp, isVNode = false) {
      return createCacheExpression(context.cached++, exp, isVNode);
    }
  };
  {
    context.filters = /* @__PURE__ */ new Set();
  }
  return context;
}
function transform(root, options) {
  const context = createTransformContext(root, options);
  traverseNode(root, context);
  if (options.hoistStatic) {
    hoistStatic(root, context);
  }
  if (!options.ssr) {
    createRootCodegen(root, context);
  }
  root.helpers = /* @__PURE__ */ new Set([...context.helpers.keys()]);
  root.components = [...context.components];
  root.directives = [...context.directives];
  root.imports = context.imports;
  root.hoists = context.hoists;
  root.temps = context.temps;
  root.cached = context.cached;
  {
    root.filters = [...context.filters];
  }
}
function createRootCodegen(root, context) {
  const { helper } = context;
  const { children } = root;
  if (children.length === 1) {
    const child = children[0];
    if (isSingleElementRoot(root, child) && child.codegenNode) {
      const codegenNode = child.codegenNode;
      if (codegenNode.type === 13) {
        convertToBlock(codegenNode, context);
      }
      root.codegenNode = codegenNode;
    } else {
      root.codegenNode = child;
    }
  } else if (children.length > 1) {
    let patchFlag = 64;
    let patchFlagText = PatchFlagNames[64];
    if (children.filter((c) => c.type !== 3).length === 1) {
      patchFlag |= 2048;
      patchFlagText += `, ${PatchFlagNames[2048]}`;
    }
    root.codegenNode = createVNodeCall(
      context,
      helper(FRAGMENT),
      void 0,
      root.children,
      patchFlag + (true ? ` /* ${patchFlagText} */` : ``),
      void 0,
      void 0,
      true,
      void 0,
      false
      /* isComponent */
    );
  } else
    ;
}
function traverseChildren(parent, context) {
  let i = 0;
  const nodeRemoved = () => {
    i--;
  };
  for (; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (isString(child))
      continue;
    context.parent = parent;
    context.childIndex = i;
    context.onNodeRemoved = nodeRemoved;
    traverseNode(child, context);
  }
}
function traverseNode(node, context) {
  context.currentNode = node;
  const { nodeTransforms } = context;
  const exitFns = [];
  for (let i2 = 0; i2 < nodeTransforms.length; i2++) {
    const onExit = nodeTransforms[i2](node, context);
    if (onExit) {
      if (isArray(onExit)) {
        exitFns.push(...onExit);
      } else {
        exitFns.push(onExit);
      }
    }
    if (!context.currentNode) {
      return;
    } else {
      node = context.currentNode;
    }
  }
  switch (node.type) {
    case 3:
      if (!context.ssr) {
        context.helper(CREATE_COMMENT);
      }
      break;
    case 5:
      if (!context.ssr) {
        context.helper(TO_DISPLAY_STRING);
      }
      break;
    case 9:
      for (let i2 = 0; i2 < node.branches.length; i2++) {
        traverseNode(node.branches[i2], context);
      }
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      traverseChildren(node, context);
      break;
  }
  context.currentNode = node;
  let i = exitFns.length;
  while (i--) {
    exitFns[i]();
  }
}
function createStructuralDirectiveTransform(name, fn) {
  const matches = isString(name) ? (n) => n === name : (n) => name.test(n);
  return (node, context) => {
    if (node.type === 1) {
      const { props } = node;
      if (node.tagType === 3 && props.some(isVSlot)) {
        return;
      }
      const exitFns = [];
      for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        if (prop.type === 7 && matches(prop.name)) {
          props.splice(i, 1);
          i--;
          const onExit = fn(node, prop, context);
          if (onExit)
            exitFns.push(onExit);
        }
      }
      return exitFns;
    }
  };
}
function createCodegenContext(ast, {
  mode = "function",
  prefixIdentifiers = mode === "module",
  sourceMap = false,
  filename = `template.vue.html`,
  scopeId = null,
  optimizeImports = false,
  runtimeGlobalName = `Vue`,
  runtimeModuleName = `vue`,
  ssrRuntimeModuleName = "vue/server-renderer",
  ssr = false,
  isTS = false,
  inSSR = false
}) {
  const context = {
    mode,
    prefixIdentifiers,
    sourceMap,
    filename,
    scopeId,
    optimizeImports,
    runtimeGlobalName,
    runtimeModuleName,
    ssrRuntimeModuleName,
    ssr,
    isTS,
    inSSR,
    source: ast.loc.source,
    code: ``,
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: false,
    map: void 0,
    helper(key) {
      return `_${helperNameMap[key]}`;
    },
    push(code, node) {
      context.code += code;
    },
    indent() {
      newline(++context.indentLevel);
    },
    deindent(withoutNewLine = false) {
      if (withoutNewLine) {
        --context.indentLevel;
      } else {
        newline(--context.indentLevel);
      }
    },
    newline() {
      newline(context.indentLevel);
    }
  };
  function newline(n) {
    context.push("\n" + `  `.repeat(n));
  }
  return context;
}
function generate(ast, options = {}) {
  const context = createCodegenContext(ast, options);
  if (options.onContextCreated)
    options.onContextCreated(context);
  const {
    mode,
    push,
    prefixIdentifiers,
    indent,
    deindent,
    newline,
    scopeId,
    ssr
  } = context;
  const helpers = Array.from(ast.helpers);
  const hasHelpers = helpers.length > 0;
  const useWithBlock = !prefixIdentifiers && mode !== "module";
  const isSetupInlined = false;
  const preambleContext = isSetupInlined ? createCodegenContext(ast, options) : context;
  {
    genFunctionPreamble(ast, preambleContext);
  }
  const functionName = ssr ? `ssrRender` : `render`;
  const args = ssr ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"];
  const signature = args.join(", ");
  {
    push(`function ${functionName}(${signature}) {`);
  }
  indent();
  if (useWithBlock) {
    push(`with (_ctx) {`);
    indent();
    if (hasHelpers) {
      push(`const { ${helpers.map(aliasHelper).join(", ")} } = _Vue`);
      push(`
`);
      newline();
    }
  }
  if (ast.components.length) {
    genAssets(ast.components, "component", context);
    if (ast.directives.length || ast.temps > 0) {
      newline();
    }
  }
  if (ast.directives.length) {
    genAssets(ast.directives, "directive", context);
    if (ast.temps > 0) {
      newline();
    }
  }
  if (ast.filters && ast.filters.length) {
    newline();
    genAssets(ast.filters, "filter", context);
    newline();
  }
  if (ast.temps > 0) {
    push(`let `);
    for (let i = 0; i < ast.temps; i++) {
      push(`${i > 0 ? `, ` : ``}_temp${i}`);
    }
  }
  if (ast.components.length || ast.directives.length || ast.temps) {
    push(`
`);
    newline();
  }
  if (!ssr) {
    push(`return `);
  }
  if (ast.codegenNode) {
    genNode(ast.codegenNode, context);
  } else {
    push(`null`);
  }
  if (useWithBlock) {
    deindent();
    push(`}`);
  }
  deindent();
  push(`}`);
  return {
    ast,
    code: context.code,
    preamble: isSetupInlined ? preambleContext.code : ``,
    // SourceMapGenerator does have toJSON() method but it's not in the types
    map: context.map ? context.map.toJSON() : void 0
  };
}
function genFunctionPreamble(ast, context) {
  const {
    ssr,
    prefixIdentifiers,
    push,
    newline,
    runtimeModuleName,
    runtimeGlobalName,
    ssrRuntimeModuleName
  } = context;
  const VueBinding = runtimeGlobalName;
  const helpers = Array.from(ast.helpers);
  if (helpers.length > 0) {
    {
      push(`const _Vue = ${VueBinding}
`);
      if (ast.hoists.length) {
        const staticHelpers = [
          CREATE_VNODE,
          CREATE_ELEMENT_VNODE,
          CREATE_COMMENT,
          CREATE_TEXT,
          CREATE_STATIC
        ].filter((helper) => helpers.includes(helper)).map(aliasHelper).join(", ");
        push(`const { ${staticHelpers} } = _Vue
`);
      }
    }
  }
  genHoists(ast.hoists, context);
  newline();
  push(`return `);
}
function genAssets(assets, type, { helper, push, newline, isTS }) {
  const resolver = helper(
    type === "filter" ? RESOLVE_FILTER : type === "component" ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE
  );
  for (let i = 0; i < assets.length; i++) {
    let id = assets[i];
    const maybeSelfReference = id.endsWith("__self");
    if (maybeSelfReference) {
      id = id.slice(0, -6);
    }
    push(
      `const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${maybeSelfReference ? `, true` : ``})${isTS ? `!` : ``}`
    );
    if (i < assets.length - 1) {
      newline();
    }
  }
}
function genHoists(hoists, context) {
  if (!hoists.length) {
    return;
  }
  context.pure = true;
  const { push, newline, helper, scopeId, mode } = context;
  newline();
  for (let i = 0; i < hoists.length; i++) {
    const exp = hoists[i];
    if (exp) {
      push(
        `const _hoisted_${i + 1} = ${``}`
      );
      genNode(exp, context);
      newline();
    }
  }
  context.pure = false;
}
function isText(n) {
  return isString(n) || n.type === 4 || n.type === 2 || n.type === 5 || n.type === 8;
}
function genNodeListAsArray(nodes, context) {
  const multilines = nodes.length > 3 || nodes.some((n) => isArray(n) || !isText(n));
  context.push(`[`);
  multilines && context.indent();
  genNodeList(nodes, context, multilines);
  multilines && context.deindent();
  context.push(`]`);
}
function genNodeList(nodes, context, multilines = false, comma = true) {
  const { push, newline } = context;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (isString(node)) {
      push(node);
    } else if (isArray(node)) {
      genNodeListAsArray(node, context);
    } else {
      genNode(node, context);
    }
    if (i < nodes.length - 1) {
      if (multilines) {
        comma && push(",");
        newline();
      } else {
        comma && push(", ");
      }
    }
  }
}
function genNode(node, context) {
  if (isString(node)) {
    context.push(node);
    return;
  }
  if (isSymbol(node)) {
    context.push(context.helper(node));
    return;
  }
  switch (node.type) {
    case 1:
    case 9:
    case 11:
      assert(
        node.codegenNode != null,
        `Codegen node is missing for element/if/for node. Apply appropriate transforms first.`
      );
      genNode(node.codegenNode, context);
      break;
    case 2:
      genText(node, context);
      break;
    case 4:
      genExpression(node, context);
      break;
    case 5:
      genInterpolation(node, context);
      break;
    case 12:
      genNode(node.codegenNode, context);
      break;
    case 8:
      genCompoundExpression(node, context);
      break;
    case 3:
      genComment(node, context);
      break;
    case 13:
      genVNodeCall(node, context);
      break;
    case 14:
      genCallExpression(node, context);
      break;
    case 15:
      genObjectExpression(node, context);
      break;
    case 17:
      genArrayExpression(node, context);
      break;
    case 18:
      genFunctionExpression(node, context);
      break;
    case 19:
      genConditionalExpression(node, context);
      break;
    case 20:
      genCacheExpression(node, context);
      break;
    case 21:
      genNodeList(node.body, context, true, false);
      break;
    case 22:
      break;
    case 23:
      break;
    case 24:
      break;
    case 25:
      break;
    case 26:
      break;
    case 10:
      break;
    default:
      if (true) {
        assert(false, `unhandled codegen node type: ${node.type}`);
        const exhaustiveCheck = node;
        return exhaustiveCheck;
      }
  }
}
function genText(node, context) {
  context.push(JSON.stringify(node.content), node);
}
function genExpression(node, context) {
  const { content, isStatic } = node;
  context.push(isStatic ? JSON.stringify(content) : content, node);
}
function genInterpolation(node, context) {
  const { push, helper, pure } = context;
  if (pure)
    push(PURE_ANNOTATION);
  push(`${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(`)`);
}
function genCompoundExpression(node, context) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (isString(child)) {
      context.push(child);
    } else {
      genNode(child, context);
    }
  }
}
function genExpressionAsPropertyKey(node, context) {
  const { push } = context;
  if (node.type === 8) {
    push(`[`);
    genCompoundExpression(node, context);
    push(`]`);
  } else if (node.isStatic) {
    const text = isSimpleIdentifier(node.content) ? node.content : JSON.stringify(node.content);
    push(text, node);
  } else {
    push(`[${node.content}]`, node);
  }
}
function genComment(node, context) {
  const { push, helper, pure } = context;
  if (pure) {
    push(PURE_ANNOTATION);
  }
  push(`${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`, node);
}
function genVNodeCall(node, context) {
  const { push, helper, pure } = context;
  const {
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent: isComponent2
  } = node;
  if (directives) {
    push(helper(WITH_DIRECTIVES) + `(`);
  }
  if (isBlock) {
    push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `);
  }
  if (pure) {
    push(PURE_ANNOTATION);
  }
  const callHelper = isBlock ? getVNodeBlockHelper(context.inSSR, isComponent2) : getVNodeHelper(context.inSSR, isComponent2);
  push(helper(callHelper) + `(`, node);
  genNodeList(
    genNullableArgs([tag, props, children, patchFlag, dynamicProps]),
    context
  );
  push(`)`);
  if (isBlock) {
    push(`)`);
  }
  if (directives) {
    push(`, `);
    genNode(directives, context);
    push(`)`);
  }
}
function genNullableArgs(args) {
  let i = args.length;
  while (i--) {
    if (args[i] != null)
      break;
  }
  return args.slice(0, i + 1).map((arg) => arg || `null`);
}
function genCallExpression(node, context) {
  const { push, helper, pure } = context;
  const callee = isString(node.callee) ? node.callee : helper(node.callee);
  if (pure) {
    push(PURE_ANNOTATION);
  }
  push(callee + `(`, node);
  genNodeList(node.arguments, context);
  push(`)`);
}
function genObjectExpression(node, context) {
  const { push, indent, deindent, newline } = context;
  const { properties } = node;
  if (!properties.length) {
    push(`{}`, node);
    return;
  }
  const multilines = properties.length > 1 || properties.some((p) => p.value.type !== 4);
  push(multilines ? `{` : `{ `);
  multilines && indent();
  for (let i = 0; i < properties.length; i++) {
    const { key, value } = properties[i];
    genExpressionAsPropertyKey(key, context);
    push(`: `);
    genNode(value, context);
    if (i < properties.length - 1) {
      push(`,`);
      newline();
    }
  }
  multilines && deindent();
  push(multilines ? `}` : ` }`);
}
function genArrayExpression(node, context) {
  genNodeListAsArray(node.elements, context);
}
function genFunctionExpression(node, context) {
  const { push, indent, deindent } = context;
  const { params, returns, body, newline, isSlot } = node;
  if (isSlot) {
    push(`_${helperNameMap[WITH_CTX]}(`);
  }
  push(`(`, node);
  if (isArray(params)) {
    genNodeList(params, context);
  } else if (params) {
    genNode(params, context);
  }
  push(`) => `);
  if (newline || body) {
    push(`{`);
    indent();
  }
  if (returns) {
    if (newline) {
      push(`return `);
    }
    if (isArray(returns)) {
      genNodeListAsArray(returns, context);
    } else {
      genNode(returns, context);
    }
  } else if (body) {
    genNode(body, context);
  }
  if (newline || body) {
    deindent();
    push(`}`);
  }
  if (isSlot) {
    if (node.isNonScopedSlot) {
      push(`, undefined, true`);
    }
    push(`)`);
  }
}
function genConditionalExpression(node, context) {
  const { test, consequent, alternate, newline: needNewline } = node;
  const { push, indent, deindent, newline } = context;
  if (test.type === 4) {
    const needsParens = !isSimpleIdentifier(test.content);
    needsParens && push(`(`);
    genExpression(test, context);
    needsParens && push(`)`);
  } else {
    push(`(`);
    genNode(test, context);
    push(`)`);
  }
  needNewline && indent();
  context.indentLevel++;
  needNewline || push(` `);
  push(`? `);
  genNode(consequent, context);
  context.indentLevel--;
  needNewline && newline();
  needNewline || push(` `);
  push(`: `);
  const isNested = alternate.type === 19;
  if (!isNested) {
    context.indentLevel++;
  }
  genNode(alternate, context);
  if (!isNested) {
    context.indentLevel--;
  }
  needNewline && deindent(
    true
    /* without newline */
  );
}
function genCacheExpression(node, context) {
  const { push, helper, indent, deindent, newline } = context;
  push(`_cache[${node.index}] || (`);
  if (node.isVNode) {
    indent();
    push(`${helper(SET_BLOCK_TRACKING)}(-1),`);
    newline();
  }
  push(`_cache[${node.index}] = `);
  genNode(node.value, context);
  if (node.isVNode) {
    push(`,`);
    newline();
    push(`${helper(SET_BLOCK_TRACKING)}(1),`);
    newline();
    push(`_cache[${node.index}]`);
    deindent();
  }
  push(`)`);
}
function walkIdentifiers(root, onIdentifier, includeAll = false, parentStack = [], knownIds = /* @__PURE__ */ Object.create(null)) {
  {
    return;
  }
}
function isReferencedIdentifier(id, parent, parentStack) {
  {
    return false;
  }
}
function isInDestructureAssignment(parent, parentStack) {
  if (parent && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
    let i = parentStack.length;
    while (i--) {
      const p = parentStack[i];
      if (p.type === "AssignmentExpression") {
        return true;
      } else if (p.type !== "ObjectProperty" && !p.type.endsWith("Pattern")) {
        break;
      }
    }
  }
  return false;
}
function walkFunctionParams(node, onIdent) {
  for (const p of node.params) {
    for (const id of extractIdentifiers(p)) {
      onIdent(id);
    }
  }
}
function walkBlockDeclarations(block, onIdent) {
  for (const stmt of block.body) {
    if (stmt.type === "VariableDeclaration") {
      if (stmt.declare)
        continue;
      for (const decl of stmt.declarations) {
        for (const id of extractIdentifiers(decl.id)) {
          onIdent(id);
        }
      }
    } else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
      if (stmt.declare || !stmt.id)
        continue;
      onIdent(stmt.id);
    }
  }
}
function extractIdentifiers(param, nodes = []) {
  switch (param.type) {
    case "Identifier":
      nodes.push(param);
      break;
    case "MemberExpression":
      let object = param;
      while (object.type === "MemberExpression") {
        object = object.object;
      }
      nodes.push(object);
      break;
    case "ObjectPattern":
      for (const prop of param.properties) {
        if (prop.type === "RestElement") {
          extractIdentifiers(prop.argument, nodes);
        } else {
          extractIdentifiers(prop.value, nodes);
        }
      }
      break;
    case "ArrayPattern":
      param.elements.forEach((element) => {
        if (element)
          extractIdentifiers(element, nodes);
      });
      break;
    case "RestElement":
      extractIdentifiers(param.argument, nodes);
      break;
    case "AssignmentPattern":
      extractIdentifiers(param.left, nodes);
      break;
  }
  return nodes;
}
function validateBrowserExpression(node, context, asParams = false, asRawStatements = false) {
  const exp = node.content;
  if (!exp.trim()) {
    return;
  }
  try {
    new Function(
      asRawStatements ? ` ${exp} ` : `return ${asParams ? `(${exp}) => {}` : `(${exp})`}`
    );
  } catch (e) {
    let message = e.message;
    const keywordMatch = exp.replace(stripStringRE, "").match(prohibitedKeywordRE);
    if (keywordMatch) {
      message = `avoid using JavaScript keyword as property name: "${keywordMatch[0]}"`;
    }
    context.onError(
      createCompilerError(
        45,
        node.loc,
        void 0,
        message
      )
    );
  }
}
function processExpression(node, context, asParams = false, asRawStatements = false, localVars = Object.create(context.identifiers)) {
  {
    if (true) {
      validateBrowserExpression(node, context, asParams, asRawStatements);
    }
    return node;
  }
}
function stringifyExpression(exp) {
  if (isString(exp)) {
    return exp;
  } else if (exp.type === 4) {
    return exp.content;
  } else {
    return exp.children.map(stringifyExpression).join("");
  }
}
function processIf(node, dir, context, processCodegen) {
  if (dir.name !== "else" && (!dir.exp || !dir.exp.content.trim())) {
    const loc = dir.exp ? dir.exp.loc : node.loc;
    context.onError(
      createCompilerError(28, dir.loc)
    );
    dir.exp = createSimpleExpression(`true`, false, loc);
  }
  if (dir.exp) {
    validateBrowserExpression(dir.exp, context);
  }
  if (dir.name === "if") {
    const branch = createIfBranch(node, dir);
    const ifNode = {
      type: 9,
      loc: node.loc,
      branches: [branch]
    };
    context.replaceNode(ifNode);
    if (processCodegen) {
      return processCodegen(ifNode, branch, true);
    }
  } else {
    const siblings = context.parent.children;
    const comments = [];
    let i = siblings.indexOf(node);
    while (i-- >= -1) {
      const sibling = siblings[i];
      if (sibling && sibling.type === 3) {
        context.removeNode(sibling);
        comments.unshift(sibling);
        continue;
      }
      if (sibling && sibling.type === 2 && !sibling.content.trim().length) {
        context.removeNode(sibling);
        continue;
      }
      if (sibling && sibling.type === 9) {
        if (dir.name === "else-if" && sibling.branches[sibling.branches.length - 1].condition === void 0) {
          context.onError(
            createCompilerError(30, node.loc)
          );
        }
        context.removeNode();
        const branch = createIfBranch(node, dir);
        if (comments.length && // #3619 ignore comments if the v-if is direct child of <transition>
        !(context.parent && context.parent.type === 1 && isBuiltInType(context.parent.tag, "transition"))) {
          branch.children = [...comments, ...branch.children];
        }
        if (true) {
          const key = branch.userKey;
          if (key) {
            sibling.branches.forEach(({ userKey }) => {
              if (isSameKey(userKey, key)) {
                context.onError(
                  createCompilerError(
                    29,
                    branch.userKey.loc
                  )
                );
              }
            });
          }
        }
        sibling.branches.push(branch);
        const onExit = processCodegen && processCodegen(sibling, branch, false);
        traverseNode(branch, context);
        if (onExit)
          onExit();
        context.currentNode = null;
      } else {
        context.onError(
          createCompilerError(30, node.loc)
        );
      }
      break;
    }
  }
}
function createIfBranch(node, dir) {
  const isTemplateIf = node.tagType === 3;
  return {
    type: 10,
    loc: node.loc,
    condition: dir.name === "else" ? void 0 : dir.exp,
    children: isTemplateIf && !findDir(node, "for") ? node.children : [node],
    userKey: findProp(node, `key`),
    isTemplateIf
  };
}
function createCodegenNodeForBranch(branch, keyIndex, context) {
  if (branch.condition) {
    return createConditionalExpression(
      branch.condition,
      createChildrenCodegenNode(branch, keyIndex, context),
      // make sure to pass in asBlock: true so that the comment node call
      // closes the current block.
      createCallExpression(context.helper(CREATE_COMMENT), [
        true ? '"v-if"' : '""',
        "true"
      ])
    );
  } else {
    return createChildrenCodegenNode(branch, keyIndex, context);
  }
}
function createChildrenCodegenNode(branch, keyIndex, context) {
  const { helper } = context;
  const keyProperty = createObjectProperty(
    `key`,
    createSimpleExpression(
      `${keyIndex}`,
      false,
      locStub,
      2
    )
  );
  const { children } = branch;
  const firstChild = children[0];
  const needFragmentWrapper = children.length !== 1 || firstChild.type !== 1;
  if (needFragmentWrapper) {
    if (children.length === 1 && firstChild.type === 11) {
      const vnodeCall = firstChild.codegenNode;
      injectProp(vnodeCall, keyProperty, context);
      return vnodeCall;
    } else {
      let patchFlag = 64;
      let patchFlagText = PatchFlagNames[64];
      if (!branch.isTemplateIf && children.filter((c) => c.type !== 3).length === 1) {
        patchFlag |= 2048;
        patchFlagText += `, ${PatchFlagNames[2048]}`;
      }
      return createVNodeCall(
        context,
        helper(FRAGMENT),
        createObjectExpression([keyProperty]),
        children,
        patchFlag + (true ? ` /* ${patchFlagText} */` : ``),
        void 0,
        void 0,
        true,
        false,
        false,
        branch.loc
      );
    }
  } else {
    const ret = firstChild.codegenNode;
    const vnodeCall = getMemoedVNodeCall(ret);
    if (vnodeCall.type === 13) {
      convertToBlock(vnodeCall, context);
    }
    injectProp(vnodeCall, keyProperty, context);
    return ret;
  }
}
function isSameKey(a, b) {
  if (!a || a.type !== b.type) {
    return false;
  }
  if (a.type === 6) {
    if (a.value.content !== b.value.content) {
      return false;
    }
  } else {
    const exp = a.exp;
    const branchExp = b.exp;
    if (exp.type !== branchExp.type) {
      return false;
    }
    if (exp.type !== 4 || exp.isStatic !== branchExp.isStatic || exp.content !== branchExp.content) {
      return false;
    }
  }
  return true;
}
function getParentCondition(node) {
  while (true) {
    if (node.type === 19) {
      if (node.alternate.type === 19) {
        node = node.alternate;
      } else {
        return node;
      }
    } else if (node.type === 20) {
      node = node.value;
    }
  }
}
function processFor(node, dir, context, processCodegen) {
  if (!dir.exp) {
    context.onError(
      createCompilerError(31, dir.loc)
    );
    return;
  }
  const parseResult = parseForExpression(
    // can only be simple expression because vFor transform is applied
    // before expression transform.
    dir.exp,
    context
  );
  if (!parseResult) {
    context.onError(
      createCompilerError(32, dir.loc)
    );
    return;
  }
  const { addIdentifiers, removeIdentifiers, scopes } = context;
  const { source, value, key, index } = parseResult;
  const forNode = {
    type: 11,
    loc: dir.loc,
    source,
    valueAlias: value,
    keyAlias: key,
    objectIndexAlias: index,
    parseResult,
    children: isTemplateNode(node) ? node.children : [node]
  };
  context.replaceNode(forNode);
  scopes.vFor++;
  const onExit = processCodegen && processCodegen(forNode);
  return () => {
    scopes.vFor--;
    if (onExit)
      onExit();
  };
}
function parseForExpression(input, context) {
  const loc = input.loc;
  const exp = input.content;
  const inMatch = exp.match(forAliasRE);
  if (!inMatch)
    return;
  const [, LHS, RHS] = inMatch;
  const result = {
    source: createAliasExpression(
      loc,
      RHS.trim(),
      exp.indexOf(RHS, LHS.length)
    ),
    value: void 0,
    key: void 0,
    index: void 0
  };
  if (true) {
    validateBrowserExpression(result.source, context);
  }
  let valueContent = LHS.trim().replace(stripParensRE, "").trim();
  const trimmedOffset = LHS.indexOf(valueContent);
  const iteratorMatch = valueContent.match(forIteratorRE);
  if (iteratorMatch) {
    valueContent = valueContent.replace(forIteratorRE, "").trim();
    const keyContent = iteratorMatch[1].trim();
    let keyOffset;
    if (keyContent) {
      keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
      result.key = createAliasExpression(loc, keyContent, keyOffset);
      if (true) {
        validateBrowserExpression(
          result.key,
          context,
          true
        );
      }
    }
    if (iteratorMatch[2]) {
      const indexContent = iteratorMatch[2].trim();
      if (indexContent) {
        result.index = createAliasExpression(
          loc,
          indexContent,
          exp.indexOf(
            indexContent,
            result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length
          )
        );
        if (true) {
          validateBrowserExpression(
            result.index,
            context,
            true
          );
        }
      }
    }
  }
  if (valueContent) {
    result.value = createAliasExpression(loc, valueContent, trimmedOffset);
    if (true) {
      validateBrowserExpression(
        result.value,
        context,
        true
      );
    }
  }
  return result;
}
function createAliasExpression(range, content, offset) {
  return createSimpleExpression(
    content,
    false,
    getInnerRange(range, offset, content.length)
  );
}
function createForLoopParams({ value, key, index }, memoArgs = []) {
  return createParamsList([value, key, index, ...memoArgs]);
}
function createParamsList(args) {
  let i = args.length;
  while (i--) {
    if (args[i])
      break;
  }
  return args.slice(0, i + 1).map((arg, i2) => arg || createSimpleExpression(`_`.repeat(i2 + 1), false));
}
function buildSlots(node, context, buildSlotFn = buildClientSlotFn) {
  context.helper(WITH_CTX);
  const { children, loc } = node;
  const slotsProperties = [];
  const dynamicSlots = [];
  let hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0;
  const onComponentSlot = findDir(node, "slot", true);
  if (onComponentSlot) {
    const { arg, exp } = onComponentSlot;
    if (arg && !isStaticExp(arg)) {
      hasDynamicSlots = true;
    }
    slotsProperties.push(
      createObjectProperty(
        arg || createSimpleExpression("default", true),
        buildSlotFn(exp, children, loc)
      )
    );
  }
  let hasTemplateSlots = false;
  let hasNamedDefaultSlot = false;
  const implicitDefaultChildren = [];
  const seenSlotNames = /* @__PURE__ */ new Set();
  let conditionalBranchIndex = 0;
  for (let i = 0; i < children.length; i++) {
    const slotElement = children[i];
    let slotDir;
    if (!isTemplateNode(slotElement) || !(slotDir = findDir(slotElement, "slot", true))) {
      if (slotElement.type !== 3) {
        implicitDefaultChildren.push(slotElement);
      }
      continue;
    }
    if (onComponentSlot) {
      context.onError(
        createCompilerError(37, slotDir.loc)
      );
      break;
    }
    hasTemplateSlots = true;
    const { children: slotChildren, loc: slotLoc } = slotElement;
    const {
      arg: slotName = createSimpleExpression(`default`, true),
      exp: slotProps,
      loc: dirLoc
    } = slotDir;
    let staticSlotName;
    if (isStaticExp(slotName)) {
      staticSlotName = slotName ? slotName.content : `default`;
    } else {
      hasDynamicSlots = true;
    }
    const slotFunction = buildSlotFn(slotProps, slotChildren, slotLoc);
    let vIf;
    let vElse;
    let vFor;
    if (vIf = findDir(slotElement, "if")) {
      hasDynamicSlots = true;
      dynamicSlots.push(
        createConditionalExpression(
          vIf.exp,
          buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++),
          defaultFallback
        )
      );
    } else if (vElse = findDir(
      slotElement,
      /^else(-if)?$/,
      true
      /* allowEmpty */
    )) {
      let j = i;
      let prev;
      while (j--) {
        prev = children[j];
        if (prev.type !== 3) {
          break;
        }
      }
      if (prev && isTemplateNode(prev) && findDir(prev, "if")) {
        children.splice(i, 1);
        i--;
        let conditional = dynamicSlots[dynamicSlots.length - 1];
        while (conditional.alternate.type === 19) {
          conditional = conditional.alternate;
        }
        conditional.alternate = vElse.exp ? createConditionalExpression(
          vElse.exp,
          buildDynamicSlot(
            slotName,
            slotFunction,
            conditionalBranchIndex++
          ),
          defaultFallback
        ) : buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++);
      } else {
        context.onError(
          createCompilerError(30, vElse.loc)
        );
      }
    } else if (vFor = findDir(slotElement, "for")) {
      hasDynamicSlots = true;
      const parseResult = vFor.parseResult || parseForExpression(vFor.exp, context);
      if (parseResult) {
        dynamicSlots.push(
          createCallExpression(context.helper(RENDER_LIST), [
            parseResult.source,
            createFunctionExpression(
              createForLoopParams(parseResult),
              buildDynamicSlot(slotName, slotFunction),
              true
              /* force newline */
            )
          ])
        );
      } else {
        context.onError(
          createCompilerError(32, vFor.loc)
        );
      }
    } else {
      if (staticSlotName) {
        if (seenSlotNames.has(staticSlotName)) {
          context.onError(
            createCompilerError(
              38,
              dirLoc
            )
          );
          continue;
        }
        seenSlotNames.add(staticSlotName);
        if (staticSlotName === "default") {
          hasNamedDefaultSlot = true;
        }
      }
      slotsProperties.push(createObjectProperty(slotName, slotFunction));
    }
  }
  if (!onComponentSlot) {
    const buildDefaultSlotProperty = (props, children2) => {
      const fn = buildSlotFn(props, children2, loc);
      if (context.compatConfig) {
        fn.isNonScopedSlot = true;
      }
      return createObjectProperty(`default`, fn);
    };
    if (!hasTemplateSlots) {
      slotsProperties.push(buildDefaultSlotProperty(void 0, children));
    } else if (implicitDefaultChildren.length && // #3766
    // with whitespace: 'preserve', whitespaces between slots will end up in
    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
    implicitDefaultChildren.some((node2) => isNonWhitespaceContent(node2))) {
      if (hasNamedDefaultSlot) {
        context.onError(
          createCompilerError(
            39,
            implicitDefaultChildren[0].loc
          )
        );
      } else {
        slotsProperties.push(
          buildDefaultSlotProperty(void 0, implicitDefaultChildren)
        );
      }
    }
  }
  const slotFlag = hasDynamicSlots ? 2 : hasForwardedSlots(node.children) ? 3 : 1;
  let slots = createObjectExpression(
    slotsProperties.concat(
      createObjectProperty(
        `_`,
        // 2 = compiled but dynamic = can skip normalization, but must run diff
        // 1 = compiled and static = can skip normalization AND diff as optimized
        createSimpleExpression(
          slotFlag + (true ? ` /* ${slotFlagsText[slotFlag]} */` : ``),
          false
        )
      )
    ),
    loc
  );
  if (dynamicSlots.length) {
    slots = createCallExpression(context.helper(CREATE_SLOTS), [
      slots,
      createArrayExpression(dynamicSlots)
    ]);
  }
  return {
    slots,
    hasDynamicSlots
  };
}
function buildDynamicSlot(name, fn, index) {
  const props = [
    createObjectProperty(`name`, name),
    createObjectProperty(`fn`, fn)
  ];
  if (index != null) {
    props.push(
      createObjectProperty(`key`, createSimpleExpression(String(index), true))
    );
  }
  return createObjectExpression(props);
}
function hasForwardedSlots(children) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    switch (child.type) {
      case 1:
        if (child.tagType === 2 || hasForwardedSlots(child.children)) {
          return true;
        }
        break;
      case 9:
        if (hasForwardedSlots(child.branches))
          return true;
        break;
      case 10:
      case 11:
        if (hasForwardedSlots(child.children))
          return true;
        break;
    }
  }
  return false;
}
function isNonWhitespaceContent(node) {
  if (node.type !== 2 && node.type !== 12)
    return true;
  return node.type === 2 ? !!node.content.trim() : isNonWhitespaceContent(node.content);
}
function resolveComponentType(node, context, ssr = false) {
  let { tag } = node;
  const isExplicitDynamic = isComponentTag(tag);
  const isProp = findProp(node, "is");
  if (isProp) {
    if (isExplicitDynamic || isCompatEnabled(
      "COMPILER_IS_ON_ELEMENT",
      context
    )) {
      const exp = isProp.type === 6 ? isProp.value && createSimpleExpression(isProp.value.content, true) : isProp.exp;
      if (exp) {
        return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
          exp
        ]);
      }
    } else if (isProp.type === 6 && isProp.value.content.startsWith("vue:")) {
      tag = isProp.value.content.slice(4);
    }
  }
  const isDir = !isExplicitDynamic && findDir(node, "is");
  if (isDir && isDir.exp) {
    if (true) {
      context.onWarn(
        createCompilerError(52, isDir.loc)
      );
    }
    return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
      isDir.exp
    ]);
  }
  const builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);
  if (builtIn) {
    if (!ssr)
      context.helper(builtIn);
    return builtIn;
  }
  context.helper(RESOLVE_COMPONENT);
  context.components.add(tag);
  return toValidAssetId(tag, `component`);
}
function buildProps(node, context, props = node.props, isComponent2, isDynamicComponent, ssr = false) {
  const { tag, loc: elementLoc, children } = node;
  let properties = [];
  const mergeArgs = [];
  const runtimeDirectives = [];
  const hasChildren = children.length > 0;
  let shouldUseBlock = false;
  let patchFlag = 0;
  let hasRef = false;
  let hasClassBinding = false;
  let hasStyleBinding = false;
  let hasHydrationEventBinding = false;
  let hasDynamicKeys = false;
  let hasVnodeHook = false;
  const dynamicPropNames = [];
  const pushMergeArg = (arg) => {
    if (properties.length) {
      mergeArgs.push(
        createObjectExpression(dedupeProperties(properties), elementLoc)
      );
      properties = [];
    }
    if (arg)
      mergeArgs.push(arg);
  };
  const analyzePatchFlag = ({ key, value }) => {
    if (isStaticExp(key)) {
      const name = key.content;
      const isEventHandler = isOn(name);
      if (isEventHandler && (!isComponent2 || isDynamicComponent) && // omit the flag for click handlers because hydration gives click
      // dedicated fast path.
      name.toLowerCase() !== "onclick" && // omit v-model handlers
      name !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
      !isReservedProp(name)) {
        hasHydrationEventBinding = true;
      }
      if (isEventHandler && isReservedProp(name)) {
        hasVnodeHook = true;
      }
      if (value.type === 20 || (value.type === 4 || value.type === 8) && getConstantType(value, context) > 0) {
        return;
      }
      if (name === "ref") {
        hasRef = true;
      } else if (name === "class") {
        hasClassBinding = true;
      } else if (name === "style") {
        hasStyleBinding = true;
      } else if (name !== "key" && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
      if (isComponent2 && (name === "class" || name === "style") && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
    } else {
      hasDynamicKeys = true;
    }
  };
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (prop.type === 6) {
      const { loc, name, value } = prop;
      let isStatic = true;
      if (name === "ref") {
        hasRef = true;
        if (context.scopes.vFor > 0) {
          properties.push(
            createObjectProperty(
              createSimpleExpression("ref_for", true),
              createSimpleExpression("true")
            )
          );
        }
      }
      if (name === "is" && (isComponentTag(tag) || value && value.content.startsWith("vue:") || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        context
      ))) {
        continue;
      }
      properties.push(
        createObjectProperty(
          createSimpleExpression(
            name,
            true,
            getInnerRange(loc, 0, name.length)
          ),
          createSimpleExpression(
            value ? value.content : "",
            isStatic,
            value ? value.loc : loc
          )
        )
      );
    } else {
      const { name, arg, exp, loc } = prop;
      const isVBind = name === "bind";
      const isVOn = name === "on";
      if (name === "slot") {
        if (!isComponent2) {
          context.onError(
            createCompilerError(40, loc)
          );
        }
        continue;
      }
      if (name === "once" || name === "memo") {
        continue;
      }
      if (name === "is" || isVBind && isStaticArgOf(arg, "is") && (isComponentTag(tag) || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        context
      ))) {
        continue;
      }
      if (isVOn && ssr) {
        continue;
      }
      if (
        // #938: elements with dynamic keys should be forced into blocks
        isVBind && isStaticArgOf(arg, "key") || // inline before-update hooks need to force block so that it is invoked
        // before children
        isVOn && hasChildren && isStaticArgOf(arg, "vue:before-update")
      ) {
        shouldUseBlock = true;
      }
      if (isVBind && isStaticArgOf(arg, "ref") && context.scopes.vFor > 0) {
        properties.push(
          createObjectProperty(
            createSimpleExpression("ref_for", true),
            createSimpleExpression("true")
          )
        );
      }
      if (!arg && (isVBind || isVOn)) {
        hasDynamicKeys = true;
        if (exp) {
          if (isVBind) {
            pushMergeArg();
            {
              if (true) {
                const hasOverridableKeys = mergeArgs.some((arg2) => {
                  if (arg2.type === 15) {
                    return arg2.properties.some(({ key }) => {
                      if (key.type !== 4 || !key.isStatic) {
                        return true;
                      }
                      return key.content !== "class" && key.content !== "style" && !isOn(key.content);
                    });
                  } else {
                    return true;
                  }
                });
                if (hasOverridableKeys) {
                  checkCompatEnabled(
                    "COMPILER_V_BIND_OBJECT_ORDER",
                    context,
                    loc
                  );
                }
              }
              if (isCompatEnabled(
                "COMPILER_V_BIND_OBJECT_ORDER",
                context
              )) {
                mergeArgs.unshift(exp);
                continue;
              }
            }
            mergeArgs.push(exp);
          } else {
            pushMergeArg({
              type: 14,
              loc,
              callee: context.helper(TO_HANDLERS),
              arguments: isComponent2 ? [exp] : [exp, `true`]
            });
          }
        } else {
          context.onError(
            createCompilerError(
              isVBind ? 34 : 35,
              loc
            )
          );
        }
        continue;
      }
      const directiveTransform = context.directiveTransforms[name];
      if (directiveTransform) {
        const { props: props2, needRuntime } = directiveTransform(prop, node, context);
        !ssr && props2.forEach(analyzePatchFlag);
        if (isVOn && arg && !isStaticExp(arg)) {
          pushMergeArg(createObjectExpression(props2, elementLoc));
        } else {
          properties.push(...props2);
        }
        if (needRuntime) {
          runtimeDirectives.push(prop);
          if (isSymbol(needRuntime)) {
            directiveImportMap.set(prop, needRuntime);
          }
        }
      } else if (!isBuiltInDirective(name)) {
        runtimeDirectives.push(prop);
        if (hasChildren) {
          shouldUseBlock = true;
        }
      }
    }
  }
  let propsExpression = void 0;
  if (mergeArgs.length) {
    pushMergeArg();
    if (mergeArgs.length > 1) {
      propsExpression = createCallExpression(
        context.helper(MERGE_PROPS),
        mergeArgs,
        elementLoc
      );
    } else {
      propsExpression = mergeArgs[0];
    }
  } else if (properties.length) {
    propsExpression = createObjectExpression(
      dedupeProperties(properties),
      elementLoc
    );
  }
  if (hasDynamicKeys) {
    patchFlag |= 16;
  } else {
    if (hasClassBinding && !isComponent2) {
      patchFlag |= 2;
    }
    if (hasStyleBinding && !isComponent2) {
      patchFlag |= 4;
    }
    if (dynamicPropNames.length) {
      patchFlag |= 8;
    }
    if (hasHydrationEventBinding) {
      patchFlag |= 32;
    }
  }
  if (!shouldUseBlock && (patchFlag === 0 || patchFlag === 32) && (hasRef || hasVnodeHook || runtimeDirectives.length > 0)) {
    patchFlag |= 512;
  }
  if (!context.inSSR && propsExpression) {
    switch (propsExpression.type) {
      case 15:
        let classKeyIndex = -1;
        let styleKeyIndex = -1;
        let hasDynamicKey = false;
        for (let i = 0; i < propsExpression.properties.length; i++) {
          const key = propsExpression.properties[i].key;
          if (isStaticExp(key)) {
            if (key.content === "class") {
              classKeyIndex = i;
            } else if (key.content === "style") {
              styleKeyIndex = i;
            }
          } else if (!key.isHandlerKey) {
            hasDynamicKey = true;
          }
        }
        const classProp = propsExpression.properties[classKeyIndex];
        const styleProp = propsExpression.properties[styleKeyIndex];
        if (!hasDynamicKey) {
          if (classProp && !isStaticExp(classProp.value)) {
            classProp.value = createCallExpression(
              context.helper(NORMALIZE_CLASS),
              [classProp.value]
            );
          }
          if (styleProp && // the static style is compiled into an object,
          // so use `hasStyleBinding` to ensure that it is a dynamic style binding
          (hasStyleBinding || styleProp.value.type === 4 && styleProp.value.content.trim()[0] === `[` || // v-bind:style and style both exist,
          // v-bind:style with static literal object
          styleProp.value.type === 17)) {
            styleProp.value = createCallExpression(
              context.helper(NORMALIZE_STYLE),
              [styleProp.value]
            );
          }
        } else {
          propsExpression = createCallExpression(
            context.helper(NORMALIZE_PROPS),
            [propsExpression]
          );
        }
        break;
      case 14:
        break;
      default:
        propsExpression = createCallExpression(
          context.helper(NORMALIZE_PROPS),
          [
            createCallExpression(context.helper(GUARD_REACTIVE_PROPS), [
              propsExpression
            ])
          ]
        );
        break;
    }
  }
  return {
    props: propsExpression,
    directives: runtimeDirectives,
    patchFlag,
    dynamicPropNames,
    shouldUseBlock
  };
}
function dedupeProperties(properties) {
  const knownProps = /* @__PURE__ */ new Map();
  const deduped = [];
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    if (prop.key.type === 8 || !prop.key.isStatic) {
      deduped.push(prop);
      continue;
    }
    const name = prop.key.content;
    const existing = knownProps.get(name);
    if (existing) {
      if (name === "style" || name === "class" || isOn(name)) {
        mergeAsArray(existing, prop);
      }
    } else {
      knownProps.set(name, prop);
      deduped.push(prop);
    }
  }
  return deduped;
}
function mergeAsArray(existing, incoming) {
  if (existing.value.type === 17) {
    existing.value.elements.push(incoming.value);
  } else {
    existing.value = createArrayExpression(
      [existing.value, incoming.value],
      existing.loc
    );
  }
}
function buildDirectiveArgs(dir, context) {
  const dirArgs = [];
  const runtime = directiveImportMap.get(dir);
  if (runtime) {
    dirArgs.push(context.helperString(runtime));
  } else {
    {
      context.helper(RESOLVE_DIRECTIVE);
      context.directives.add(dir.name);
      dirArgs.push(toValidAssetId(dir.name, `directive`));
    }
  }
  const { loc } = dir;
  if (dir.exp)
    dirArgs.push(dir.exp);
  if (dir.arg) {
    if (!dir.exp) {
      dirArgs.push(`void 0`);
    }
    dirArgs.push(dir.arg);
  }
  if (Object.keys(dir.modifiers).length) {
    if (!dir.arg) {
      if (!dir.exp) {
        dirArgs.push(`void 0`);
      }
      dirArgs.push(`void 0`);
    }
    const trueExpression = createSimpleExpression(`true`, false, loc);
    dirArgs.push(
      createObjectExpression(
        dir.modifiers.map(
          (modifier) => createObjectProperty(modifier, trueExpression)
        ),
        loc
      )
    );
  }
  return createArrayExpression(dirArgs, dir.loc);
}
function stringifyDynamicPropNames(props) {
  let propsNamesString = `[`;
  for (let i = 0, l = props.length; i < l; i++) {
    propsNamesString += JSON.stringify(props[i]);
    if (i < l - 1)
      propsNamesString += ", ";
  }
  return propsNamesString + `]`;
}
function isComponentTag(tag) {
  return tag === "component" || tag === "Component";
}
function processSlotOutlet(node, context) {
  let slotName = `"default"`;
  let slotProps = void 0;
  const nonNameProps = [];
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 6) {
      if (p.value) {
        if (p.name === "name") {
          slotName = JSON.stringify(p.value.content);
        } else {
          p.name = camelize(p.name);
          nonNameProps.push(p);
        }
      }
    } else {
      if (p.name === "bind" && isStaticArgOf(p.arg, "name")) {
        if (p.exp)
          slotName = p.exp;
      } else {
        if (p.name === "bind" && p.arg && isStaticExp(p.arg)) {
          p.arg.content = camelize(p.arg.content);
        }
        nonNameProps.push(p);
      }
    }
  }
  if (nonNameProps.length > 0) {
    const { props, directives } = buildProps(
      node,
      context,
      nonNameProps,
      false,
      false
    );
    slotProps = props;
    if (directives.length) {
      context.onError(
        createCompilerError(
          36,
          directives[0].loc
        )
      );
    }
  }
  return {
    slotName,
    slotProps
  };
}
function createTransformProps(props = []) {
  return { props };
}
function rewriteFilter(node, context) {
  if (node.type === 4) {
    parseFilter(node, context);
  } else {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (typeof child !== "object")
        continue;
      if (child.type === 4) {
        parseFilter(child, context);
      } else if (child.type === 8) {
        rewriteFilter(node, context);
      } else if (child.type === 5) {
        rewriteFilter(child.content, context);
      }
    }
  }
}
function parseFilter(node, context) {
  const exp = node.content;
  let inSingle = false;
  let inDouble = false;
  let inTemplateString = false;
  let inRegex = false;
  let curly = 0;
  let square = 0;
  let paren = 0;
  let lastFilterIndex = 0;
  let c, prev, i, expression, filters = [];
  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 39 && prev !== 92)
        inSingle = false;
    } else if (inDouble) {
      if (c === 34 && prev !== 92)
        inDouble = false;
    } else if (inTemplateString) {
      if (c === 96 && prev !== 92)
        inTemplateString = false;
    } else if (inRegex) {
      if (c === 47 && prev !== 92)
        inRegex = false;
    } else if (c === 124 && // pipe
    exp.charCodeAt(i + 1) !== 124 && exp.charCodeAt(i - 1) !== 124 && !curly && !square && !paren) {
      if (expression === void 0) {
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 34:
          inDouble = true;
          break;
        case 39:
          inSingle = true;
          break;
        case 96:
          inTemplateString = true;
          break;
        case 40:
          paren++;
          break;
        case 41:
          paren--;
          break;
        case 91:
          square++;
          break;
        case 93:
          square--;
          break;
        case 123:
          curly++;
          break;
        case 125:
          curly--;
          break;
      }
      if (c === 47) {
        let j = i - 1;
        let p;
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== " ")
            break;
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }
  if (expression === void 0) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }
  function pushFilter() {
    filters.push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }
  if (filters.length) {
    warnDeprecation(
      "COMPILER_FILTER",
      context,
      node.loc
    );
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i], context);
    }
    node.content = expression;
  }
}
function wrapFilter(exp, filter, context) {
  context.helper(RESOLVE_FILTER);
  const i = filter.indexOf("(");
  if (i < 0) {
    context.filters.add(filter);
    return `${toValidAssetId(filter, "filter")}(${exp})`;
  } else {
    const name = filter.slice(0, i);
    const args = filter.slice(i + 1);
    context.filters.add(name);
    return `${toValidAssetId(name, "filter")}(${exp}${args !== ")" ? "," + args : args}`;
  }
}
function getBaseTransformPreset(prefixIdentifiers) {
  return [
    [
      transformOnce,
      transformIf,
      transformMemo,
      transformFor,
      ...[transformFilter],
      ...true ? [transformExpression] : [],
      transformSlotOutlet,
      transformElement,
      trackSlotScopes,
      transformText
    ],
    {
      on: transformOn,
      bind: transformBind,
      model: transformModel
    }
  ];
}
function baseCompile(template, options = {}) {
  const onError = options.onError || defaultOnError;
  const isModuleMode = options.mode === "module";
  {
    if (options.prefixIdentifiers === true) {
      onError(createCompilerError(47));
    } else if (isModuleMode) {
      onError(createCompilerError(48));
    }
  }
  const prefixIdentifiers = false;
  if (options.cacheHandlers) {
    onError(createCompilerError(49));
  }
  if (options.scopeId && !isModuleMode) {
    onError(createCompilerError(50));
  }
  const ast = isString(template) ? baseParse(template, options) : template;
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers,
      nodeTransforms: [
        ...nodeTransforms,
        ...options.nodeTransforms || []
        // user transforms
      ],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {}
        // user transforms
      )
    })
  );
  return generate(
    ast,
    extend({}, options, {
      prefixIdentifiers
    })
  );
}
var errorMessages, FRAGMENT, TELEPORT, SUSPENSE, KEEP_ALIVE, BASE_TRANSITION, OPEN_BLOCK, CREATE_BLOCK, CREATE_ELEMENT_BLOCK, CREATE_VNODE, CREATE_ELEMENT_VNODE, CREATE_COMMENT, CREATE_TEXT, CREATE_STATIC, RESOLVE_COMPONENT, RESOLVE_DYNAMIC_COMPONENT, RESOLVE_DIRECTIVE, RESOLVE_FILTER, WITH_DIRECTIVES, RENDER_LIST, RENDER_SLOT, CREATE_SLOTS, TO_DISPLAY_STRING, MERGE_PROPS, NORMALIZE_CLASS, NORMALIZE_STYLE, NORMALIZE_PROPS, GUARD_REACTIVE_PROPS, TO_HANDLERS, CAMELIZE, CAPITALIZE, TO_HANDLER_KEY, SET_BLOCK_TRACKING, PUSH_SCOPE_ID, POP_SCOPE_ID, WITH_CTX, UNREF, IS_REF, WITH_MEMO, IS_MEMO_SAME, helperNameMap, locStub, isStaticExp, isBuiltInType, nonIdentifierRE, isSimpleIdentifier, validFirstIdentCharRE, validIdentCharRE, whitespaceRE, isMemberExpressionBrowser, isMemberExpressionNode, isMemberExpression, propsHelperSet, deprecationData, decodeRE, decodeMap, defaultParserOptions, TagType, isSpecialTemplateDirective, allowHoistedHelperSet, PURE_ANNOTATION, aliasHelper, isFunctionType, isStaticProperty, isStaticPropertyKey, TS_NODE_TYPES, prohibitedKeywordRE, stripStringRE, transformExpression, transformIf, transformFor, forAliasRE, forIteratorRE, stripParensRE, defaultFallback, trackSlotScopes, trackVForSlotScopes, buildClientSlotFn, directiveImportMap, transformElement, transformSlotOutlet, fnExpRE, transformOn, transformBind, injectPrefix, transformText, seen$1, transformOnce, transformModel, validDivisionCharRE, transformFilter, seen, transformMemo, noopDirectiveTransform;
var init_compiler_core_esm_bundler = __esm({
  "node_modules/@vue/compiler-core/dist/compiler-core.esm-bundler.js"() {
    init_shared_esm_bundler();
    init_shared_esm_bundler();
    errorMessages = {
      // parse errors
      [0]: "Illegal comment.",
      [1]: "CDATA section is allowed only in XML context.",
      [2]: "Duplicate attribute.",
      [3]: "End tag cannot have attributes.",
      [4]: "Illegal '/' in tags.",
      [5]: "Unexpected EOF in tag.",
      [6]: "Unexpected EOF in CDATA section.",
      [7]: "Unexpected EOF in comment.",
      [8]: "Unexpected EOF in script.",
      [9]: "Unexpected EOF in tag.",
      [10]: "Incorrectly closed comment.",
      [11]: "Incorrectly opened comment.",
      [12]: "Illegal tag name. Use '&lt;' to print '<'.",
      [13]: "Attribute value was expected.",
      [14]: "End tag name was expected.",
      [15]: "Whitespace was expected.",
      [16]: "Unexpected '<!--' in comment.",
      [17]: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`,
      [18]: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).",
      [19]: "Attribute name cannot start with '='.",
      [21]: "'<?' is allowed only in XML context.",
      [20]: `Unexpected null character.`,
      [22]: "Illegal '/' in tags.",
      // Vue-specific parse errors
      [23]: "Invalid end tag.",
      [24]: "Element is missing end tag.",
      [25]: "Interpolation end sign was not found.",
      [27]: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.",
      [26]: "Legal directive name was expected.",
      // transform errors
      [28]: `v-if/v-else-if is missing expression.`,
      [29]: `v-if/else branches must use unique keys.`,
      [30]: `v-else/v-else-if has no adjacent v-if or v-else-if.`,
      [31]: `v-for is missing expression.`,
      [32]: `v-for has invalid expression.`,
      [33]: `<template v-for> key should be placed on the <template> tag.`,
      [34]: `v-bind is missing expression.`,
      [35]: `v-on is missing expression.`,
      [36]: `Unexpected custom directive on <slot> outlet.`,
      [37]: `Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.`,
      [38]: `Duplicate slot names found. `,
      [39]: `Extraneous children found when component already has explicitly named default slot. These children will be ignored.`,
      [40]: `v-slot can only be used on components or <template> tags.`,
      [41]: `v-model is missing expression.`,
      [42]: `v-model value must be a valid JavaScript member expression.`,
      [43]: `v-model cannot be used on v-for or v-slot scope variables because they are not writable.`,
      [44]: `v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.`,
      [45]: `Error parsing JavaScript expression: `,
      [46]: `<KeepAlive> expects exactly one child component.`,
      // generic errors
      [47]: `"prefixIdentifiers" option is not supported in this build of compiler.`,
      [48]: `ES module mode is not supported in this build of compiler.`,
      [49]: `"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.`,
      [50]: `"scopeId" option is only supported in module mode.`,
      // deprecations
      [51]: `@vnode-* hooks in templates are deprecated. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support will be removed in 3.4.`,
      [52]: `v-is="component-name" has been deprecated. Use is="vue:component-name" instead. v-is support will be removed in 3.4.`,
      // just to fulfill types
      [53]: ``
    };
    FRAGMENT = Symbol(true ? `Fragment` : ``);
    TELEPORT = Symbol(true ? `Teleport` : ``);
    SUSPENSE = Symbol(true ? `Suspense` : ``);
    KEEP_ALIVE = Symbol(true ? `KeepAlive` : ``);
    BASE_TRANSITION = Symbol(true ? `BaseTransition` : ``);
    OPEN_BLOCK = Symbol(true ? `openBlock` : ``);
    CREATE_BLOCK = Symbol(true ? `createBlock` : ``);
    CREATE_ELEMENT_BLOCK = Symbol(true ? `createElementBlock` : ``);
    CREATE_VNODE = Symbol(true ? `createVNode` : ``);
    CREATE_ELEMENT_VNODE = Symbol(true ? `createElementVNode` : ``);
    CREATE_COMMENT = Symbol(true ? `createCommentVNode` : ``);
    CREATE_TEXT = Symbol(true ? `createTextVNode` : ``);
    CREATE_STATIC = Symbol(true ? `createStaticVNode` : ``);
    RESOLVE_COMPONENT = Symbol(true ? `resolveComponent` : ``);
    RESOLVE_DYNAMIC_COMPONENT = Symbol(
      true ? `resolveDynamicComponent` : ``
    );
    RESOLVE_DIRECTIVE = Symbol(true ? `resolveDirective` : ``);
    RESOLVE_FILTER = Symbol(true ? `resolveFilter` : ``);
    WITH_DIRECTIVES = Symbol(true ? `withDirectives` : ``);
    RENDER_LIST = Symbol(true ? `renderList` : ``);
    RENDER_SLOT = Symbol(true ? `renderSlot` : ``);
    CREATE_SLOTS = Symbol(true ? `createSlots` : ``);
    TO_DISPLAY_STRING = Symbol(true ? `toDisplayString` : ``);
    MERGE_PROPS = Symbol(true ? `mergeProps` : ``);
    NORMALIZE_CLASS = Symbol(true ? `normalizeClass` : ``);
    NORMALIZE_STYLE = Symbol(true ? `normalizeStyle` : ``);
    NORMALIZE_PROPS = Symbol(true ? `normalizeProps` : ``);
    GUARD_REACTIVE_PROPS = Symbol(true ? `guardReactiveProps` : ``);
    TO_HANDLERS = Symbol(true ? `toHandlers` : ``);
    CAMELIZE = Symbol(true ? `camelize` : ``);
    CAPITALIZE = Symbol(true ? `capitalize` : ``);
    TO_HANDLER_KEY = Symbol(true ? `toHandlerKey` : ``);
    SET_BLOCK_TRACKING = Symbol(true ? `setBlockTracking` : ``);
    PUSH_SCOPE_ID = Symbol(true ? `pushScopeId` : ``);
    POP_SCOPE_ID = Symbol(true ? `popScopeId` : ``);
    WITH_CTX = Symbol(true ? `withCtx` : ``);
    UNREF = Symbol(true ? `unref` : ``);
    IS_REF = Symbol(true ? `isRef` : ``);
    WITH_MEMO = Symbol(true ? `withMemo` : ``);
    IS_MEMO_SAME = Symbol(true ? `isMemoSame` : ``);
    helperNameMap = {
      [FRAGMENT]: `Fragment`,
      [TELEPORT]: `Teleport`,
      [SUSPENSE]: `Suspense`,
      [KEEP_ALIVE]: `KeepAlive`,
      [BASE_TRANSITION]: `BaseTransition`,
      [OPEN_BLOCK]: `openBlock`,
      [CREATE_BLOCK]: `createBlock`,
      [CREATE_ELEMENT_BLOCK]: `createElementBlock`,
      [CREATE_VNODE]: `createVNode`,
      [CREATE_ELEMENT_VNODE]: `createElementVNode`,
      [CREATE_COMMENT]: `createCommentVNode`,
      [CREATE_TEXT]: `createTextVNode`,
      [CREATE_STATIC]: `createStaticVNode`,
      [RESOLVE_COMPONENT]: `resolveComponent`,
      [RESOLVE_DYNAMIC_COMPONENT]: `resolveDynamicComponent`,
      [RESOLVE_DIRECTIVE]: `resolveDirective`,
      [RESOLVE_FILTER]: `resolveFilter`,
      [WITH_DIRECTIVES]: `withDirectives`,
      [RENDER_LIST]: `renderList`,
      [RENDER_SLOT]: `renderSlot`,
      [CREATE_SLOTS]: `createSlots`,
      [TO_DISPLAY_STRING]: `toDisplayString`,
      [MERGE_PROPS]: `mergeProps`,
      [NORMALIZE_CLASS]: `normalizeClass`,
      [NORMALIZE_STYLE]: `normalizeStyle`,
      [NORMALIZE_PROPS]: `normalizeProps`,
      [GUARD_REACTIVE_PROPS]: `guardReactiveProps`,
      [TO_HANDLERS]: `toHandlers`,
      [CAMELIZE]: `camelize`,
      [CAPITALIZE]: `capitalize`,
      [TO_HANDLER_KEY]: `toHandlerKey`,
      [SET_BLOCK_TRACKING]: `setBlockTracking`,
      [PUSH_SCOPE_ID]: `pushScopeId`,
      [POP_SCOPE_ID]: `popScopeId`,
      [WITH_CTX]: `withCtx`,
      [UNREF]: `unref`,
      [IS_REF]: `isRef`,
      [WITH_MEMO]: `withMemo`,
      [IS_MEMO_SAME]: `isMemoSame`
    };
    locStub = {
      source: "",
      start: { line: 1, column: 1, offset: 0 },
      end: { line: 1, column: 1, offset: 0 }
    };
    isStaticExp = (p) => p.type === 4 && p.isStatic;
    isBuiltInType = (tag, expected) => tag === expected || tag === hyphenate(expected);
    nonIdentifierRE = /^\d|[^\$\w]/;
    isSimpleIdentifier = (name) => !nonIdentifierRE.test(name);
    validFirstIdentCharRE = /[A-Za-z_$\xA0-\uFFFF]/;
    validIdentCharRE = /[\.\?\w$\xA0-\uFFFF]/;
    whitespaceRE = /\s+[.[]\s*|\s*[.[]\s+/g;
    isMemberExpressionBrowser = (path) => {
      path = path.trim().replace(whitespaceRE, (s) => s.trim());
      let state = 0;
      let stateStack = [];
      let currentOpenBracketCount = 0;
      let currentOpenParensCount = 0;
      let currentStringType = null;
      for (let i = 0; i < path.length; i++) {
        const char = path.charAt(i);
        switch (state) {
          case 0:
            if (char === "[") {
              stateStack.push(state);
              state = 1;
              currentOpenBracketCount++;
            } else if (char === "(") {
              stateStack.push(state);
              state = 2;
              currentOpenParensCount++;
            } else if (!(i === 0 ? validFirstIdentCharRE : validIdentCharRE).test(char)) {
              return false;
            }
            break;
          case 1:
            if (char === `'` || char === `"` || char === "`") {
              stateStack.push(state);
              state = 3;
              currentStringType = char;
            } else if (char === `[`) {
              currentOpenBracketCount++;
            } else if (char === `]`) {
              if (!--currentOpenBracketCount) {
                state = stateStack.pop();
              }
            }
            break;
          case 2:
            if (char === `'` || char === `"` || char === "`") {
              stateStack.push(state);
              state = 3;
              currentStringType = char;
            } else if (char === `(`) {
              currentOpenParensCount++;
            } else if (char === `)`) {
              if (i === path.length - 1) {
                return false;
              }
              if (!--currentOpenParensCount) {
                state = stateStack.pop();
              }
            }
            break;
          case 3:
            if (char === currentStringType) {
              state = stateStack.pop();
              currentStringType = null;
            }
            break;
        }
      }
      return !currentOpenBracketCount && !currentOpenParensCount;
    };
    isMemberExpressionNode = NOOP;
    isMemberExpression = isMemberExpressionBrowser;
    propsHelperSet = /* @__PURE__ */ new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);
    deprecationData = {
      ["COMPILER_IS_ON_ELEMENT"]: {
        message: `Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".`,
        link: `https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html`
      },
      ["COMPILER_V_BIND_SYNC"]: {
        message: (key) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${key}.sync\` should be changed to \`v-model:${key}\`.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/v-model.html`
      },
      ["COMPILER_V_BIND_PROP"]: {
        message: `.prop modifier for v-bind has been removed and no longer necessary. Vue 3 will automatically set a binding as DOM property when appropriate.`
      },
      ["COMPILER_V_BIND_OBJECT_ORDER"]: {
        message: `v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/v-bind.html`
      },
      ["COMPILER_V_ON_NATIVE"]: {
        message: `.native modifier for v-on has been removed as is no longer necessary.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html`
      },
      ["COMPILER_V_IF_V_FOR_PRECEDENCE"]: {
        message: `v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html`
      },
      ["COMPILER_NATIVE_TEMPLATE"]: {
        message: `<template> with no special directives will render as a native template element instead of its inner content in Vue 3.`
      },
      ["COMPILER_INLINE_TEMPLATE"]: {
        message: `"inline-template" has been removed in Vue 3.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html`
      },
      ["COMPILER_FILTER"]: {
        message: `filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/filters.html`
      }
    };
    decodeRE = /&(gt|lt|amp|apos|quot);/g;
    decodeMap = {
      gt: ">",
      lt: "<",
      amp: "&",
      apos: "'",
      quot: '"'
    };
    defaultParserOptions = {
      delimiters: [`{{`, `}}`],
      getNamespace: () => 0,
      getTextMode: () => 0,
      isVoidTag: NO,
      isPreTag: NO,
      isCustomElement: NO,
      decodeEntities: (rawText) => rawText.replace(decodeRE, (_, p1) => decodeMap[p1]),
      onError: defaultOnError,
      onWarn: defaultOnWarn,
      comments: true
    };
    TagType = ((TagType2) => {
      TagType2[TagType2["Start"] = 0] = "Start";
      TagType2[TagType2["End"] = 1] = "End";
      return TagType2;
    })(TagType || {});
    isSpecialTemplateDirective = makeMap(
      `if,else,else-if,for,slot`
    );
    allowHoistedHelperSet = /* @__PURE__ */ new Set([
      NORMALIZE_CLASS,
      NORMALIZE_STYLE,
      NORMALIZE_PROPS,
      GUARD_REACTIVE_PROPS
    ]);
    PURE_ANNOTATION = `/*#__PURE__*/`;
    aliasHelper = (s) => `${helperNameMap[s]}: _${helperNameMap[s]}`;
    isFunctionType = (node) => {
      return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
    };
    isStaticProperty = (node) => node && (node.type === "ObjectProperty" || node.type === "ObjectMethod") && !node.computed;
    isStaticPropertyKey = (node, parent) => isStaticProperty(parent) && parent.key === node;
    TS_NODE_TYPES = [
      "TSAsExpression",
      // foo as number
      "TSTypeAssertion",
      // (<number>foo)
      "TSNonNullExpression",
      // foo!
      "TSInstantiationExpression",
      // foo<string>
      "TSSatisfiesExpression"
      // foo satisfies T
    ];
    prohibitedKeywordRE = new RegExp(
      "\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b"
    );
    stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
    transformExpression = (node, context) => {
      if (node.type === 5) {
        node.content = processExpression(
          node.content,
          context
        );
      } else if (node.type === 1) {
        for (let i = 0; i < node.props.length; i++) {
          const dir = node.props[i];
          if (dir.type === 7 && dir.name !== "for") {
            const exp = dir.exp;
            const arg = dir.arg;
            if (exp && exp.type === 4 && !(dir.name === "on" && arg)) {
              dir.exp = processExpression(
                exp,
                context,
                // slot args must be processed as function params
                dir.name === "slot"
              );
            }
            if (arg && arg.type === 4 && !arg.isStatic) {
              dir.arg = processExpression(arg, context);
            }
          }
        }
      }
    };
    transformIf = createStructuralDirectiveTransform(
      /^(if|else|else-if)$/,
      (node, dir, context) => {
        return processIf(node, dir, context, (ifNode, branch, isRoot) => {
          const siblings = context.parent.children;
          let i = siblings.indexOf(ifNode);
          let key = 0;
          while (i-- >= 0) {
            const sibling = siblings[i];
            if (sibling && sibling.type === 9) {
              key += sibling.branches.length;
            }
          }
          return () => {
            if (isRoot) {
              ifNode.codegenNode = createCodegenNodeForBranch(
                branch,
                key,
                context
              );
            } else {
              const parentCondition = getParentCondition(ifNode.codegenNode);
              parentCondition.alternate = createCodegenNodeForBranch(
                branch,
                key + ifNode.branches.length - 1,
                context
              );
            }
          };
        });
      }
    );
    transformFor = createStructuralDirectiveTransform(
      "for",
      (node, dir, context) => {
        const { helper, removeHelper } = context;
        return processFor(node, dir, context, (forNode) => {
          const renderExp = createCallExpression(helper(RENDER_LIST), [
            forNode.source
          ]);
          const isTemplate = isTemplateNode(node);
          const memo = findDir(node, "memo");
          const keyProp = findProp(node, `key`);
          const keyExp = keyProp && (keyProp.type === 6 ? createSimpleExpression(keyProp.value.content, true) : keyProp.exp);
          const keyProperty = keyProp ? createObjectProperty(`key`, keyExp) : null;
          const isStableFragment = forNode.source.type === 4 && forNode.source.constType > 0;
          const fragmentFlag = isStableFragment ? 64 : keyProp ? 128 : 256;
          forNode.codegenNode = createVNodeCall(
            context,
            helper(FRAGMENT),
            void 0,
            renderExp,
            fragmentFlag + (true ? ` /* ${PatchFlagNames[fragmentFlag]} */` : ``),
            void 0,
            void 0,
            true,
            !isStableFragment,
            false,
            node.loc
          );
          return () => {
            let childBlock;
            const { children } = forNode;
            if (isTemplate) {
              node.children.some((c) => {
                if (c.type === 1) {
                  const key = findProp(c, "key");
                  if (key) {
                    context.onError(
                      createCompilerError(
                        33,
                        key.loc
                      )
                    );
                    return true;
                  }
                }
              });
            }
            const needFragmentWrapper = children.length !== 1 || children[0].type !== 1;
            const slotOutlet = isSlotOutlet(node) ? node : isTemplate && node.children.length === 1 && isSlotOutlet(node.children[0]) ? node.children[0] : null;
            if (slotOutlet) {
              childBlock = slotOutlet.codegenNode;
              if (isTemplate && keyProperty) {
                injectProp(childBlock, keyProperty, context);
              }
            } else if (needFragmentWrapper) {
              childBlock = createVNodeCall(
                context,
                helper(FRAGMENT),
                keyProperty ? createObjectExpression([keyProperty]) : void 0,
                node.children,
                64 + (true ? ` /* ${PatchFlagNames[64]} */` : ``),
                void 0,
                void 0,
                true,
                void 0,
                false
                /* isComponent */
              );
            } else {
              childBlock = children[0].codegenNode;
              if (isTemplate && keyProperty) {
                injectProp(childBlock, keyProperty, context);
              }
              if (childBlock.isBlock !== !isStableFragment) {
                if (childBlock.isBlock) {
                  removeHelper(OPEN_BLOCK);
                  removeHelper(
                    getVNodeBlockHelper(context.inSSR, childBlock.isComponent)
                  );
                } else {
                  removeHelper(
                    getVNodeHelper(context.inSSR, childBlock.isComponent)
                  );
                }
              }
              childBlock.isBlock = !isStableFragment;
              if (childBlock.isBlock) {
                helper(OPEN_BLOCK);
                helper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
              } else {
                helper(getVNodeHelper(context.inSSR, childBlock.isComponent));
              }
            }
            if (memo) {
              const loop = createFunctionExpression(
                createForLoopParams(forNode.parseResult, [
                  createSimpleExpression(`_cached`)
                ])
              );
              loop.body = createBlockStatement([
                createCompoundExpression([`const _memo = (`, memo.exp, `)`]),
                createCompoundExpression([
                  `if (_cached`,
                  ...keyExp ? [` && _cached.key === `, keyExp] : [],
                  ` && ${context.helperString(
                    IS_MEMO_SAME
                  )}(_cached, _memo)) return _cached`
                ]),
                createCompoundExpression([`const _item = `, childBlock]),
                createSimpleExpression(`_item.memo = _memo`),
                createSimpleExpression(`return _item`)
              ]);
              renderExp.arguments.push(
                loop,
                createSimpleExpression(`_cache`),
                createSimpleExpression(String(context.cached++))
              );
            } else {
              renderExp.arguments.push(
                createFunctionExpression(
                  createForLoopParams(forNode.parseResult),
                  childBlock,
                  true
                  /* force newline */
                )
              );
            }
          };
        });
      }
    );
    forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    stripParensRE = /^\(|\)$/g;
    defaultFallback = createSimpleExpression(`undefined`, false);
    trackSlotScopes = (node, context) => {
      if (node.type === 1 && (node.tagType === 1 || node.tagType === 3)) {
        const vSlot = findDir(node, "slot");
        if (vSlot) {
          vSlot.exp;
          context.scopes.vSlot++;
          return () => {
            context.scopes.vSlot--;
          };
        }
      }
    };
    trackVForSlotScopes = (node, context) => {
      let vFor;
      if (isTemplateNode(node) && node.props.some(isVSlot) && (vFor = findDir(node, "for"))) {
        const result = vFor.parseResult = parseForExpression(
          vFor.exp,
          context
        );
        if (result) {
          const { value, key, index } = result;
          const { addIdentifiers, removeIdentifiers } = context;
          value && addIdentifiers(value);
          key && addIdentifiers(key);
          index && addIdentifiers(index);
          return () => {
            value && removeIdentifiers(value);
            key && removeIdentifiers(key);
            index && removeIdentifiers(index);
          };
        }
      }
    };
    buildClientSlotFn = (props, children, loc) => createFunctionExpression(
      props,
      children,
      false,
      true,
      children.length ? children[0].loc : loc
    );
    directiveImportMap = /* @__PURE__ */ new WeakMap();
    transformElement = (node, context) => {
      return function postTransformElement() {
        node = context.currentNode;
        if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1))) {
          return;
        }
        const { tag, props } = node;
        const isComponent2 = node.tagType === 1;
        let vnodeTag = isComponent2 ? resolveComponentType(node, context) : `"${tag}"`;
        const isDynamicComponent = isObject(vnodeTag) && vnodeTag.callee === RESOLVE_DYNAMIC_COMPONENT;
        let vnodeProps;
        let vnodeChildren;
        let vnodePatchFlag;
        let patchFlag = 0;
        let vnodeDynamicProps;
        let dynamicPropNames;
        let vnodeDirectives;
        let shouldUseBlock = (
          // dynamic component may resolve to plain elements
          isDynamicComponent || vnodeTag === TELEPORT || vnodeTag === SUSPENSE || !isComponent2 && // <svg> and <foreignObject> must be forced into blocks so that block
          // updates inside get proper isSVG flag at runtime. (#639, #643)
          // This is technically web-specific, but splitting the logic out of core
          // leads to too much unnecessary complexity.
          (tag === "svg" || tag === "foreignObject")
        );
        if (props.length > 0) {
          const propsBuildResult = buildProps(
            node,
            context,
            void 0,
            isComponent2,
            isDynamicComponent
          );
          vnodeProps = propsBuildResult.props;
          patchFlag = propsBuildResult.patchFlag;
          dynamicPropNames = propsBuildResult.dynamicPropNames;
          const directives = propsBuildResult.directives;
          vnodeDirectives = directives && directives.length ? createArrayExpression(
            directives.map((dir) => buildDirectiveArgs(dir, context))
          ) : void 0;
          if (propsBuildResult.shouldUseBlock) {
            shouldUseBlock = true;
          }
        }
        if (node.children.length > 0) {
          if (vnodeTag === KEEP_ALIVE) {
            shouldUseBlock = true;
            patchFlag |= 1024;
            if (node.children.length > 1) {
              context.onError(
                createCompilerError(46, {
                  start: node.children[0].loc.start,
                  end: node.children[node.children.length - 1].loc.end,
                  source: ""
                })
              );
            }
          }
          const shouldBuildAsSlots = isComponent2 && // Teleport is not a real component and has dedicated runtime handling
          vnodeTag !== TELEPORT && // explained above.
          vnodeTag !== KEEP_ALIVE;
          if (shouldBuildAsSlots) {
            const { slots, hasDynamicSlots } = buildSlots(node, context);
            vnodeChildren = slots;
            if (hasDynamicSlots) {
              patchFlag |= 1024;
            }
          } else if (node.children.length === 1 && vnodeTag !== TELEPORT) {
            const child = node.children[0];
            const type = child.type;
            const hasDynamicTextChild = type === 5 || type === 8;
            if (hasDynamicTextChild && getConstantType(child, context) === 0) {
              patchFlag |= 1;
            }
            if (hasDynamicTextChild || type === 2) {
              vnodeChildren = child;
            } else {
              vnodeChildren = node.children;
            }
          } else {
            vnodeChildren = node.children;
          }
        }
        if (patchFlag !== 0) {
          if (true) {
            if (patchFlag < 0) {
              vnodePatchFlag = patchFlag + ` /* ${PatchFlagNames[patchFlag]} */`;
            } else {
              const flagNames = Object.keys(PatchFlagNames).map(Number).filter((n) => n > 0 && patchFlag & n).map((n) => PatchFlagNames[n]).join(`, `);
              vnodePatchFlag = patchFlag + ` /* ${flagNames} */`;
            }
          } else {
            vnodePatchFlag = String(patchFlag);
          }
          if (dynamicPropNames && dynamicPropNames.length) {
            vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames);
          }
        }
        node.codegenNode = createVNodeCall(
          context,
          vnodeTag,
          vnodeProps,
          vnodeChildren,
          vnodePatchFlag,
          vnodeDynamicProps,
          vnodeDirectives,
          !!shouldUseBlock,
          false,
          isComponent2,
          node.loc
        );
      };
    };
    transformSlotOutlet = (node, context) => {
      if (isSlotOutlet(node)) {
        const { children, loc } = node;
        const { slotName, slotProps } = processSlotOutlet(node, context);
        const slotArgs = [
          context.prefixIdentifiers ? `_ctx.$slots` : `$slots`,
          slotName,
          "{}",
          "undefined",
          "true"
        ];
        let expectedLen = 2;
        if (slotProps) {
          slotArgs[2] = slotProps;
          expectedLen = 3;
        }
        if (children.length) {
          slotArgs[3] = createFunctionExpression([], children, false, false, loc);
          expectedLen = 4;
        }
        if (context.scopeId && !context.slotted) {
          expectedLen = 5;
        }
        slotArgs.splice(expectedLen);
        node.codegenNode = createCallExpression(
          context.helper(RENDER_SLOT),
          slotArgs,
          loc
        );
      }
    };
    fnExpRE = /^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/;
    transformOn = (dir, node, context, augmentor) => {
      const { loc, modifiers, arg } = dir;
      if (!dir.exp && !modifiers.length) {
        context.onError(createCompilerError(35, loc));
      }
      let eventName;
      if (arg.type === 4) {
        if (arg.isStatic) {
          let rawName = arg.content;
          if (rawName.startsWith("vnode")) {
            context.onWarn(
              createCompilerError(51, arg.loc)
            );
          }
          if (rawName.startsWith("vue:")) {
            rawName = `vnode-${rawName.slice(4)}`;
          }
          const eventString = node.tagType !== 0 || rawName.startsWith("vnode") || !/[A-Z]/.test(rawName) ? (
            // for non-element and vnode lifecycle event listeners, auto convert
            // it to camelCase. See issue #2249
            toHandlerKey(camelize(rawName))
          ) : (
            // preserve case for plain element listeners that have uppercase
            // letters, as these may be custom elements' custom events
            `on:${rawName}`
          );
          eventName = createSimpleExpression(eventString, true, arg.loc);
        } else {
          eventName = createCompoundExpression([
            `${context.helperString(TO_HANDLER_KEY)}(`,
            arg,
            `)`
          ]);
        }
      } else {
        eventName = arg;
        eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY)}(`);
        eventName.children.push(`)`);
      }
      let exp = dir.exp;
      if (exp && !exp.content.trim()) {
        exp = void 0;
      }
      let shouldCache = context.cacheHandlers && !exp && !context.inVOnce;
      if (exp) {
        const isMemberExp = isMemberExpression(exp.content);
        const isInlineStatement = !(isMemberExp || fnExpRE.test(exp.content));
        const hasMultipleStatements = exp.content.includes(`;`);
        if (true) {
          validateBrowserExpression(
            exp,
            context,
            false,
            hasMultipleStatements
          );
        }
        if (isInlineStatement || shouldCache && isMemberExp) {
          exp = createCompoundExpression([
            `${isInlineStatement ? `$event` : `${``}(...args)`} => ${hasMultipleStatements ? `{` : `(`}`,
            exp,
            hasMultipleStatements ? `}` : `)`
          ]);
        }
      }
      let ret = {
        props: [
          createObjectProperty(
            eventName,
            exp || createSimpleExpression(`() => {}`, false, loc)
          )
        ]
      };
      if (augmentor) {
        ret = augmentor(ret);
      }
      if (shouldCache) {
        ret.props[0].value = context.cache(ret.props[0].value);
      }
      ret.props.forEach((p) => p.key.isHandlerKey = true);
      return ret;
    };
    transformBind = (dir, _node, context) => {
      const { exp, modifiers, loc } = dir;
      const arg = dir.arg;
      if (arg.type !== 4) {
        arg.children.unshift(`(`);
        arg.children.push(`) || ""`);
      } else if (!arg.isStatic) {
        arg.content = `${arg.content} || ""`;
      }
      if (modifiers.includes("camel")) {
        if (arg.type === 4) {
          if (arg.isStatic) {
            arg.content = camelize(arg.content);
          } else {
            arg.content = `${context.helperString(CAMELIZE)}(${arg.content})`;
          }
        } else {
          arg.children.unshift(`${context.helperString(CAMELIZE)}(`);
          arg.children.push(`)`);
        }
      }
      if (!context.inSSR) {
        if (modifiers.includes("prop")) {
          injectPrefix(arg, ".");
        }
        if (modifiers.includes("attr")) {
          injectPrefix(arg, "^");
        }
      }
      if (!exp || exp.type === 4 && !exp.content.trim()) {
        context.onError(createCompilerError(34, loc));
        return {
          props: [createObjectProperty(arg, createSimpleExpression("", true, loc))]
        };
      }
      return {
        props: [createObjectProperty(arg, exp)]
      };
    };
    injectPrefix = (arg, prefix) => {
      if (arg.type === 4) {
        if (arg.isStatic) {
          arg.content = prefix + arg.content;
        } else {
          arg.content = `\`${prefix}\${${arg.content}}\``;
        }
      } else {
        arg.children.unshift(`'${prefix}' + (`);
        arg.children.push(`)`);
      }
    };
    transformText = (node, context) => {
      if (node.type === 0 || node.type === 1 || node.type === 11 || node.type === 10) {
        return () => {
          const children = node.children;
          let currentContainer = void 0;
          let hasText = false;
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (isText$1(child)) {
              hasText = true;
              for (let j = i + 1; j < children.length; j++) {
                const next = children[j];
                if (isText$1(next)) {
                  if (!currentContainer) {
                    currentContainer = children[i] = createCompoundExpression(
                      [child],
                      child.loc
                    );
                  }
                  currentContainer.children.push(` + `, next);
                  children.splice(j, 1);
                  j--;
                } else {
                  currentContainer = void 0;
                  break;
                }
              }
            }
          }
          if (!hasText || // if this is a plain element with a single text child, leave it
          // as-is since the runtime has dedicated fast path for this by directly
          // setting textContent of the element.
          // for component root it's always normalized anyway.
          children.length === 1 && (node.type === 0 || node.type === 1 && node.tagType === 0 && // #3756
          // custom directives can potentially add DOM elements arbitrarily,
          // we need to avoid setting textContent of the element at runtime
          // to avoid accidentally overwriting the DOM elements added
          // by the user through custom directives.
          !node.props.find(
            (p) => p.type === 7 && !context.directiveTransforms[p.name]
          ) && // in compat mode, <template> tags with no special directives
          // will be rendered as a fragment so its children must be
          // converted into vnodes.
          !(node.tag === "template"))) {
            return;
          }
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (isText$1(child) || child.type === 8) {
              const callArgs = [];
              if (child.type !== 2 || child.content !== " ") {
                callArgs.push(child);
              }
              if (!context.ssr && getConstantType(child, context) === 0) {
                callArgs.push(
                  1 + (true ? ` /* ${PatchFlagNames[1]} */` : ``)
                );
              }
              children[i] = {
                type: 12,
                content: child,
                loc: child.loc,
                codegenNode: createCallExpression(
                  context.helper(CREATE_TEXT),
                  callArgs
                )
              };
            }
          }
        };
      }
    };
    seen$1 = /* @__PURE__ */ new WeakSet();
    transformOnce = (node, context) => {
      if (node.type === 1 && findDir(node, "once", true)) {
        if (seen$1.has(node) || context.inVOnce || context.inSSR) {
          return;
        }
        seen$1.add(node);
        context.inVOnce = true;
        context.helper(SET_BLOCK_TRACKING);
        return () => {
          context.inVOnce = false;
          const cur = context.currentNode;
          if (cur.codegenNode) {
            cur.codegenNode = context.cache(
              cur.codegenNode,
              true
              /* isVNode */
            );
          }
        };
      }
    };
    transformModel = (dir, node, context) => {
      const { exp, arg } = dir;
      if (!exp) {
        context.onError(
          createCompilerError(41, dir.loc)
        );
        return createTransformProps();
      }
      const rawExp = exp.loc.source;
      const expString = exp.type === 4 ? exp.content : rawExp;
      const bindingType = context.bindingMetadata[rawExp];
      if (bindingType === "props" || bindingType === "props-aliased") {
        context.onError(createCompilerError(44, exp.loc));
        return createTransformProps();
      }
      const maybeRef = false;
      if (!expString.trim() || !isMemberExpression(expString) && !maybeRef) {
        context.onError(
          createCompilerError(42, exp.loc)
        );
        return createTransformProps();
      }
      const propName = arg ? arg : createSimpleExpression("modelValue", true);
      const eventName = arg ? isStaticExp(arg) ? `onUpdate:${camelize(arg.content)}` : createCompoundExpression(['"onUpdate:" + ', arg]) : `onUpdate:modelValue`;
      let assignmentExp;
      const eventArg = context.isTS ? `($event: any)` : `$event`;
      {
        assignmentExp = createCompoundExpression([
          `${eventArg} => ((`,
          exp,
          `) = $event)`
        ]);
      }
      const props = [
        // modelValue: foo
        createObjectProperty(propName, dir.exp),
        // "onUpdate:modelValue": $event => (foo = $event)
        createObjectProperty(eventName, assignmentExp)
      ];
      if (dir.modifiers.length && node.tagType === 1) {
        const modifiers = dir.modifiers.map((m) => (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + `: true`).join(`, `);
        const modifiersKey = arg ? isStaticExp(arg) ? `${arg.content}Modifiers` : createCompoundExpression([arg, ' + "Modifiers"']) : `modelModifiers`;
        props.push(
          createObjectProperty(
            modifiersKey,
            createSimpleExpression(
              `{ ${modifiers} }`,
              false,
              dir.loc,
              2
            )
          )
        );
      }
      return createTransformProps(props);
    };
    validDivisionCharRE = /[\w).+\-_$\]]/;
    transformFilter = (node, context) => {
      if (!isCompatEnabled("COMPILER_FILTER", context)) {
        return;
      }
      if (node.type === 5) {
        rewriteFilter(node.content, context);
      }
      if (node.type === 1) {
        node.props.forEach((prop) => {
          if (prop.type === 7 && prop.name !== "for" && prop.exp) {
            rewriteFilter(prop.exp, context);
          }
        });
      }
    };
    seen = /* @__PURE__ */ new WeakSet();
    transformMemo = (node, context) => {
      if (node.type === 1) {
        const dir = findDir(node, "memo");
        if (!dir || seen.has(node)) {
          return;
        }
        seen.add(node);
        return () => {
          const codegenNode = node.codegenNode || context.currentNode.codegenNode;
          if (codegenNode && codegenNode.type === 13) {
            if (node.tagType !== 1) {
              convertToBlock(codegenNode, context);
            }
            node.codegenNode = createCallExpression(context.helper(WITH_MEMO), [
              dir.exp,
              createFunctionExpression(void 0, codegenNode),
              `_cache`,
              String(context.cached++)
            ]);
          }
        };
      }
    };
    noopDirectiveTransform = () => ({ props: [] });
  }
});

// node_modules/@vue/compiler-dom/dist/compiler-dom.esm-bundler.js
var compiler_dom_esm_bundler_exports = {};
__export(compiler_dom_esm_bundler_exports, {
  BASE_TRANSITION: () => BASE_TRANSITION,
  CAMELIZE: () => CAMELIZE,
  CAPITALIZE: () => CAPITALIZE,
  CREATE_BLOCK: () => CREATE_BLOCK,
  CREATE_COMMENT: () => CREATE_COMMENT,
  CREATE_ELEMENT_BLOCK: () => CREATE_ELEMENT_BLOCK,
  CREATE_ELEMENT_VNODE: () => CREATE_ELEMENT_VNODE,
  CREATE_SLOTS: () => CREATE_SLOTS,
  CREATE_STATIC: () => CREATE_STATIC,
  CREATE_TEXT: () => CREATE_TEXT,
  CREATE_VNODE: () => CREATE_VNODE,
  DOMDirectiveTransforms: () => DOMDirectiveTransforms,
  DOMNodeTransforms: () => DOMNodeTransforms,
  FRAGMENT: () => FRAGMENT,
  GUARD_REACTIVE_PROPS: () => GUARD_REACTIVE_PROPS,
  IS_MEMO_SAME: () => IS_MEMO_SAME,
  IS_REF: () => IS_REF,
  KEEP_ALIVE: () => KEEP_ALIVE,
  MERGE_PROPS: () => MERGE_PROPS,
  NORMALIZE_CLASS: () => NORMALIZE_CLASS,
  NORMALIZE_PROPS: () => NORMALIZE_PROPS,
  NORMALIZE_STYLE: () => NORMALIZE_STYLE,
  OPEN_BLOCK: () => OPEN_BLOCK,
  POP_SCOPE_ID: () => POP_SCOPE_ID,
  PUSH_SCOPE_ID: () => PUSH_SCOPE_ID,
  RENDER_LIST: () => RENDER_LIST,
  RENDER_SLOT: () => RENDER_SLOT,
  RESOLVE_COMPONENT: () => RESOLVE_COMPONENT,
  RESOLVE_DIRECTIVE: () => RESOLVE_DIRECTIVE,
  RESOLVE_DYNAMIC_COMPONENT: () => RESOLVE_DYNAMIC_COMPONENT,
  RESOLVE_FILTER: () => RESOLVE_FILTER,
  SET_BLOCK_TRACKING: () => SET_BLOCK_TRACKING,
  SUSPENSE: () => SUSPENSE,
  TELEPORT: () => TELEPORT,
  TO_DISPLAY_STRING: () => TO_DISPLAY_STRING,
  TO_HANDLERS: () => TO_HANDLERS,
  TO_HANDLER_KEY: () => TO_HANDLER_KEY,
  TRANSITION: () => TRANSITION,
  TRANSITION_GROUP: () => TRANSITION_GROUP,
  TS_NODE_TYPES: () => TS_NODE_TYPES,
  UNREF: () => UNREF,
  V_MODEL_CHECKBOX: () => V_MODEL_CHECKBOX,
  V_MODEL_DYNAMIC: () => V_MODEL_DYNAMIC,
  V_MODEL_RADIO: () => V_MODEL_RADIO,
  V_MODEL_SELECT: () => V_MODEL_SELECT,
  V_MODEL_TEXT: () => V_MODEL_TEXT,
  V_ON_WITH_KEYS: () => V_ON_WITH_KEYS,
  V_ON_WITH_MODIFIERS: () => V_ON_WITH_MODIFIERS,
  V_SHOW: () => V_SHOW,
  WITH_CTX: () => WITH_CTX,
  WITH_DIRECTIVES: () => WITH_DIRECTIVES,
  WITH_MEMO: () => WITH_MEMO,
  advancePositionWithClone: () => advancePositionWithClone,
  advancePositionWithMutation: () => advancePositionWithMutation,
  assert: () => assert,
  baseCompile: () => baseCompile,
  baseParse: () => baseParse,
  buildDirectiveArgs: () => buildDirectiveArgs,
  buildProps: () => buildProps,
  buildSlots: () => buildSlots,
  checkCompatEnabled: () => checkCompatEnabled,
  compile: () => compile,
  convertToBlock: () => convertToBlock,
  createArrayExpression: () => createArrayExpression,
  createAssignmentExpression: () => createAssignmentExpression,
  createBlockStatement: () => createBlockStatement,
  createCacheExpression: () => createCacheExpression,
  createCallExpression: () => createCallExpression,
  createCompilerError: () => createCompilerError,
  createCompoundExpression: () => createCompoundExpression,
  createConditionalExpression: () => createConditionalExpression,
  createDOMCompilerError: () => createDOMCompilerError,
  createForLoopParams: () => createForLoopParams,
  createFunctionExpression: () => createFunctionExpression,
  createIfStatement: () => createIfStatement,
  createInterpolation: () => createInterpolation,
  createObjectExpression: () => createObjectExpression,
  createObjectProperty: () => createObjectProperty,
  createReturnStatement: () => createReturnStatement,
  createRoot: () => createRoot,
  createSequenceExpression: () => createSequenceExpression,
  createSimpleExpression: () => createSimpleExpression,
  createStructuralDirectiveTransform: () => createStructuralDirectiveTransform,
  createTemplateLiteral: () => createTemplateLiteral,
  createTransformContext: () => createTransformContext,
  createVNodeCall: () => createVNodeCall,
  extractIdentifiers: () => extractIdentifiers,
  findDir: () => findDir,
  findProp: () => findProp,
  generate: () => generate,
  generateCodeFrame: () => generateCodeFrame,
  getBaseTransformPreset: () => getBaseTransformPreset,
  getConstantType: () => getConstantType,
  getInnerRange: () => getInnerRange,
  getMemoedVNodeCall: () => getMemoedVNodeCall,
  getVNodeBlockHelper: () => getVNodeBlockHelper,
  getVNodeHelper: () => getVNodeHelper,
  hasDynamicKeyVBind: () => hasDynamicKeyVBind,
  hasScopeRef: () => hasScopeRef,
  helperNameMap: () => helperNameMap,
  injectProp: () => injectProp,
  isBuiltInType: () => isBuiltInType,
  isCoreComponent: () => isCoreComponent,
  isFunctionType: () => isFunctionType,
  isInDestructureAssignment: () => isInDestructureAssignment,
  isMemberExpression: () => isMemberExpression,
  isMemberExpressionBrowser: () => isMemberExpressionBrowser,
  isMemberExpressionNode: () => isMemberExpressionNode,
  isReferencedIdentifier: () => isReferencedIdentifier,
  isSimpleIdentifier: () => isSimpleIdentifier,
  isSlotOutlet: () => isSlotOutlet,
  isStaticArgOf: () => isStaticArgOf,
  isStaticExp: () => isStaticExp,
  isStaticProperty: () => isStaticProperty,
  isStaticPropertyKey: () => isStaticPropertyKey,
  isTemplateNode: () => isTemplateNode,
  isText: () => isText$1,
  isVSlot: () => isVSlot,
  locStub: () => locStub,
  noopDirectiveTransform: () => noopDirectiveTransform,
  parse: () => parse,
  parserOptions: () => parserOptions,
  processExpression: () => processExpression,
  processFor: () => processFor,
  processIf: () => processIf,
  processSlotOutlet: () => processSlotOutlet,
  registerRuntimeHelpers: () => registerRuntimeHelpers,
  resolveComponentType: () => resolveComponentType,
  stringifyExpression: () => stringifyExpression,
  toValidAssetId: () => toValidAssetId,
  trackSlotScopes: () => trackSlotScopes,
  trackVForSlotScopes: () => trackVForSlotScopes,
  transform: () => transform,
  transformBind: () => transformBind,
  transformElement: () => transformElement,
  transformExpression: () => transformExpression,
  transformModel: () => transformModel,
  transformOn: () => transformOn,
  transformStyle: () => transformStyle,
  traverseNode: () => traverseNode,
  walkBlockDeclarations: () => walkBlockDeclarations,
  walkFunctionParams: () => walkFunctionParams,
  walkIdentifiers: () => walkIdentifiers,
  warnDeprecation: () => warnDeprecation
});
function decodeHtmlBrowser(raw, asAttr = false) {
  if (!decoder) {
    decoder = document.createElement("div");
  }
  if (asAttr) {
    decoder.innerHTML = `<div foo="${raw.replace(/"/g, "&quot;")}">`;
    return decoder.children[0].getAttribute("foo");
  } else {
    decoder.innerHTML = raw;
    return decoder.textContent;
  }
}
function createDOMCompilerError(code, loc) {
  return createCompilerError(
    code,
    loc,
    true ? DOMErrorMessages : void 0
  );
}
function hasMultipleChildren(node) {
  const children = node.children = node.children.filter(
    (c) => c.type !== 3 && !(c.type === 2 && !c.content.trim())
  );
  const child = children[0];
  return children.length !== 1 || child.type === 11 || child.type === 9 && child.branches.some(hasMultipleChildren);
}
function compile(template, options = {}) {
  return baseCompile(
    template,
    extend({}, parserOptions, options, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        ignoreSideEffectTags,
        ...DOMNodeTransforms,
        ...options.nodeTransforms || []
      ],
      directiveTransforms: extend(
        {},
        DOMDirectiveTransforms,
        options.directiveTransforms || {}
      ),
      transformHoist: null
    })
  );
}
function parse(template, options = {}) {
  return baseParse(template, extend({}, parserOptions, options));
}
var V_MODEL_RADIO, V_MODEL_CHECKBOX, V_MODEL_TEXT, V_MODEL_SELECT, V_MODEL_DYNAMIC, V_ON_WITH_MODIFIERS, V_ON_WITH_KEYS, V_SHOW, TRANSITION, TRANSITION_GROUP, decoder, isRawTextContainer, parserOptions, transformStyle, parseInlineCSS, DOMErrorMessages, transformVHtml, transformVText, transformModel2, isEventOptionModifier, isNonKeyModifier, maybeKeyModifier, isKeyboardEvent, resolveModifiers, transformClick, transformOn2, transformShow, transformTransition, ignoreSideEffectTags, DOMNodeTransforms, DOMDirectiveTransforms;
var init_compiler_dom_esm_bundler = __esm({
  "node_modules/@vue/compiler-dom/dist/compiler-dom.esm-bundler.js"() {
    init_compiler_core_esm_bundler();
    init_compiler_core_esm_bundler();
    init_shared_esm_bundler();
    V_MODEL_RADIO = Symbol(true ? `vModelRadio` : ``);
    V_MODEL_CHECKBOX = Symbol(true ? `vModelCheckbox` : ``);
    V_MODEL_TEXT = Symbol(true ? `vModelText` : ``);
    V_MODEL_SELECT = Symbol(true ? `vModelSelect` : ``);
    V_MODEL_DYNAMIC = Symbol(true ? `vModelDynamic` : ``);
    V_ON_WITH_MODIFIERS = Symbol(true ? `vOnModifiersGuard` : ``);
    V_ON_WITH_KEYS = Symbol(true ? `vOnKeysGuard` : ``);
    V_SHOW = Symbol(true ? `vShow` : ``);
    TRANSITION = Symbol(true ? `Transition` : ``);
    TRANSITION_GROUP = Symbol(true ? `TransitionGroup` : ``);
    registerRuntimeHelpers({
      [V_MODEL_RADIO]: `vModelRadio`,
      [V_MODEL_CHECKBOX]: `vModelCheckbox`,
      [V_MODEL_TEXT]: `vModelText`,
      [V_MODEL_SELECT]: `vModelSelect`,
      [V_MODEL_DYNAMIC]: `vModelDynamic`,
      [V_ON_WITH_MODIFIERS]: `withModifiers`,
      [V_ON_WITH_KEYS]: `withKeys`,
      [V_SHOW]: `vShow`,
      [TRANSITION]: `Transition`,
      [TRANSITION_GROUP]: `TransitionGroup`
    });
    isRawTextContainer = makeMap(
      "style,iframe,script,noscript",
      true
    );
    parserOptions = {
      isVoidTag,
      isNativeTag: (tag) => isHTMLTag(tag) || isSVGTag(tag),
      isPreTag: (tag) => tag === "pre",
      decodeEntities: decodeHtmlBrowser,
      isBuiltInComponent: (tag) => {
        if (isBuiltInType(tag, `Transition`)) {
          return TRANSITION;
        } else if (isBuiltInType(tag, `TransitionGroup`)) {
          return TRANSITION_GROUP;
        }
      },
      // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
      getNamespace(tag, parent) {
        let ns = parent ? parent.ns : 0;
        if (parent && ns === 2) {
          if (parent.tag === "annotation-xml") {
            if (tag === "svg") {
              return 1;
            }
            if (parent.props.some(
              (a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml")
            )) {
              ns = 0;
            }
          } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") {
            ns = 0;
          }
        } else if (parent && ns === 1) {
          if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") {
            ns = 0;
          }
        }
        if (ns === 0) {
          if (tag === "svg") {
            return 1;
          }
          if (tag === "math") {
            return 2;
          }
        }
        return ns;
      },
      // https://html.spec.whatwg.org/multipage/parsing.html#parsing-html-fragments
      getTextMode({ tag, ns }) {
        if (ns === 0) {
          if (tag === "textarea" || tag === "title") {
            return 1;
          }
          if (isRawTextContainer(tag)) {
            return 2;
          }
        }
        return 0;
      }
    };
    transformStyle = (node) => {
      if (node.type === 1) {
        node.props.forEach((p, i) => {
          if (p.type === 6 && p.name === "style" && p.value) {
            node.props[i] = {
              type: 7,
              name: `bind`,
              arg: createSimpleExpression(`style`, true, p.loc),
              exp: parseInlineCSS(p.value.content, p.loc),
              modifiers: [],
              loc: p.loc
            };
          }
        });
      }
    };
    parseInlineCSS = (cssText, loc) => {
      const normalized = parseStringStyle(cssText);
      return createSimpleExpression(
        JSON.stringify(normalized),
        false,
        loc,
        3
      );
    };
    DOMErrorMessages = {
      [53]: `v-html is missing expression.`,
      [54]: `v-html will override element children.`,
      [55]: `v-text is missing expression.`,
      [56]: `v-text will override element children.`,
      [57]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
      [58]: `v-model argument is not supported on plain elements.`,
      [59]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
      [60]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
      [61]: `v-show is missing expression.`,
      [62]: `<Transition> expects exactly one child element or component.`,
      [63]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`
    };
    transformVHtml = (dir, node, context) => {
      const { exp, loc } = dir;
      if (!exp) {
        context.onError(
          createDOMCompilerError(53, loc)
        );
      }
      if (node.children.length) {
        context.onError(
          createDOMCompilerError(54, loc)
        );
        node.children.length = 0;
      }
      return {
        props: [
          createObjectProperty(
            createSimpleExpression(`innerHTML`, true, loc),
            exp || createSimpleExpression("", true)
          )
        ]
      };
    };
    transformVText = (dir, node, context) => {
      const { exp, loc } = dir;
      if (!exp) {
        context.onError(
          createDOMCompilerError(55, loc)
        );
      }
      if (node.children.length) {
        context.onError(
          createDOMCompilerError(56, loc)
        );
        node.children.length = 0;
      }
      return {
        props: [
          createObjectProperty(
            createSimpleExpression(`textContent`, true),
            exp ? getConstantType(exp, context) > 0 ? exp : createCallExpression(
              context.helperString(TO_DISPLAY_STRING),
              [exp],
              loc
            ) : createSimpleExpression("", true)
          )
        ]
      };
    };
    transformModel2 = (dir, node, context) => {
      const baseResult = transformModel(dir, node, context);
      if (!baseResult.props.length || node.tagType === 1) {
        return baseResult;
      }
      if (dir.arg) {
        context.onError(
          createDOMCompilerError(
            58,
            dir.arg.loc
          )
        );
      }
      function checkDuplicatedValue() {
        const value = findProp(node, "value");
        if (value) {
          context.onError(
            createDOMCompilerError(
              60,
              value.loc
            )
          );
        }
      }
      const { tag } = node;
      const isCustomElement = context.isCustomElement(tag);
      if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
        let directiveToUse = V_MODEL_TEXT;
        let isInvalidType = false;
        if (tag === "input" || isCustomElement) {
          const type = findProp(node, `type`);
          if (type) {
            if (type.type === 7) {
              directiveToUse = V_MODEL_DYNAMIC;
            } else if (type.value) {
              switch (type.value.content) {
                case "radio":
                  directiveToUse = V_MODEL_RADIO;
                  break;
                case "checkbox":
                  directiveToUse = V_MODEL_CHECKBOX;
                  break;
                case "file":
                  isInvalidType = true;
                  context.onError(
                    createDOMCompilerError(
                      59,
                      dir.loc
                    )
                  );
                  break;
                default:
                  checkDuplicatedValue();
                  break;
              }
            }
          } else if (hasDynamicKeyVBind(node)) {
            directiveToUse = V_MODEL_DYNAMIC;
          } else {
            checkDuplicatedValue();
          }
        } else if (tag === "select") {
          directiveToUse = V_MODEL_SELECT;
        } else {
          checkDuplicatedValue();
        }
        if (!isInvalidType) {
          baseResult.needRuntime = context.helper(directiveToUse);
        }
      } else {
        context.onError(
          createDOMCompilerError(
            57,
            dir.loc
          )
        );
      }
      baseResult.props = baseResult.props.filter(
        (p) => !(p.key.type === 4 && p.key.content === "modelValue")
      );
      return baseResult;
    };
    isEventOptionModifier = makeMap(`passive,once,capture`);
    isNonKeyModifier = makeMap(
      // event propagation management
      `stop,prevent,self,ctrl,shift,alt,meta,exact,middle`
    );
    maybeKeyModifier = makeMap("left,right");
    isKeyboardEvent = makeMap(
      `onkeyup,onkeydown,onkeypress`,
      true
    );
    resolveModifiers = (key, modifiers, context, loc) => {
      const keyModifiers = [];
      const nonKeyModifiers = [];
      const eventOptionModifiers = [];
      for (let i = 0; i < modifiers.length; i++) {
        const modifier = modifiers[i];
        if (modifier === "native" && checkCompatEnabled(
          "COMPILER_V_ON_NATIVE",
          context,
          loc
        )) {
          eventOptionModifiers.push(modifier);
        } else if (isEventOptionModifier(modifier)) {
          eventOptionModifiers.push(modifier);
        } else {
          if (maybeKeyModifier(modifier)) {
            if (isStaticExp(key)) {
              if (isKeyboardEvent(key.content)) {
                keyModifiers.push(modifier);
              } else {
                nonKeyModifiers.push(modifier);
              }
            } else {
              keyModifiers.push(modifier);
              nonKeyModifiers.push(modifier);
            }
          } else {
            if (isNonKeyModifier(modifier)) {
              nonKeyModifiers.push(modifier);
            } else {
              keyModifiers.push(modifier);
            }
          }
        }
      }
      return {
        keyModifiers,
        nonKeyModifiers,
        eventOptionModifiers
      };
    };
    transformClick = (key, event) => {
      const isStaticClick = isStaticExp(key) && key.content.toLowerCase() === "onclick";
      return isStaticClick ? createSimpleExpression(event, true) : key.type !== 4 ? createCompoundExpression([
        `(`,
        key,
        `) === "onClick" ? "${event}" : (`,
        key,
        `)`
      ]) : key;
    };
    transformOn2 = (dir, node, context) => {
      return transformOn(dir, node, context, (baseResult) => {
        const { modifiers } = dir;
        if (!modifiers.length)
          return baseResult;
        let { key, value: handlerExp } = baseResult.props[0];
        const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(key, modifiers, context, dir.loc);
        if (nonKeyModifiers.includes("right")) {
          key = transformClick(key, `onContextmenu`);
        }
        if (nonKeyModifiers.includes("middle")) {
          key = transformClick(key, `onMouseup`);
        }
        if (nonKeyModifiers.length) {
          handlerExp = createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [
            handlerExp,
            JSON.stringify(nonKeyModifiers)
          ]);
        }
        if (keyModifiers.length && // if event name is dynamic, always wrap with keys guard
        (!isStaticExp(key) || isKeyboardEvent(key.content))) {
          handlerExp = createCallExpression(context.helper(V_ON_WITH_KEYS), [
            handlerExp,
            JSON.stringify(keyModifiers)
          ]);
        }
        if (eventOptionModifiers.length) {
          const modifierPostfix = eventOptionModifiers.map(capitalize).join("");
          key = isStaticExp(key) ? createSimpleExpression(`${key.content}${modifierPostfix}`, true) : createCompoundExpression([`(`, key, `) + "${modifierPostfix}"`]);
        }
        return {
          props: [createObjectProperty(key, handlerExp)]
        };
      });
    };
    transformShow = (dir, node, context) => {
      const { exp, loc } = dir;
      if (!exp) {
        context.onError(
          createDOMCompilerError(61, loc)
        );
      }
      return {
        props: [],
        needRuntime: context.helper(V_SHOW)
      };
    };
    transformTransition = (node, context) => {
      if (node.type === 1 && node.tagType === 1) {
        const component = context.isBuiltInComponent(node.tag);
        if (component === TRANSITION) {
          return () => {
            if (!node.children.length) {
              return;
            }
            if (hasMultipleChildren(node)) {
              context.onError(
                createDOMCompilerError(
                  62,
                  {
                    start: node.children[0].loc.start,
                    end: node.children[node.children.length - 1].loc.end,
                    source: ""
                  }
                )
              );
            }
            const child = node.children[0];
            if (child.type === 1) {
              for (const p of child.props) {
                if (p.type === 7 && p.name === "show") {
                  node.props.push({
                    type: 6,
                    name: "persisted",
                    value: void 0,
                    loc: node.loc
                  });
                }
              }
            }
          };
        }
      }
    };
    ignoreSideEffectTags = (node, context) => {
      if (node.type === 1 && node.tagType === 0 && (node.tag === "script" || node.tag === "style")) {
        context.onError(
          createDOMCompilerError(
            63,
            node.loc
          )
        );
        context.removeNode();
      }
    };
    DOMNodeTransforms = [
      transformStyle,
      ...true ? [transformTransition] : []
    ];
    DOMDirectiveTransforms = {
      cloak: noopDirectiveTransform,
      html: transformVHtml,
      text: transformVText,
      model: transformModel2,
      // override compiler-core
      on: transformOn2,
      // override compiler-core
      show: transformShow
    };
  }
});

// node_modules/vue/dist/vue.cjs.js
var require_vue_cjs = __commonJS({
  "node_modules/vue/dist/vue.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var compilerDom = (init_compiler_dom_esm_bundler(), __toCommonJS(compiler_dom_esm_bundler_exports));
    var runtimeDom = (init_runtime_dom_esm_bundler(), __toCommonJS(runtime_dom_esm_bundler_exports));
    var shared = (init_shared_esm_bundler(), __toCommonJS(shared_esm_bundler_exports));
    function _interopNamespaceDefault(e) {
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        for (var k in e) {
          n[k] = e[k];
        }
      }
      n.default = e;
      return Object.freeze(n);
    }
    var runtimeDom__namespace = _interopNamespaceDefault(runtimeDom);
    var compileCache = /* @__PURE__ */ Object.create(null);
    function compileToFunction(template, options) {
      if (!shared.isString(template)) {
        if (template.nodeType) {
          template = template.innerHTML;
        } else {
          runtimeDom.warn(`invalid template option: `, template);
          return shared.NOOP;
        }
      }
      const key = template;
      const cached = compileCache[key];
      if (cached) {
        return cached;
      }
      if (template[0] === "#") {
        const el = document.querySelector(template);
        if (!el) {
          runtimeDom.warn(`Template element not found or is empty: ${template}`);
        }
        template = el ? el.innerHTML : ``;
      }
      const opts = shared.extend(
        {
          hoistStatic: true,
          onError,
          onWarn: (e) => onError(e, true)
        },
        options
      );
      if (!opts.isCustomElement && typeof customElements !== "undefined") {
        opts.isCustomElement = (tag) => !!customElements.get(tag);
      }
      const { code } = compilerDom.compile(template, opts);
      function onError(err, asWarning = false) {
        const message = asWarning ? err.message : `Template compilation error: ${err.message}`;
        const codeFrame = err.loc && shared.generateCodeFrame(
          template,
          err.loc.start.offset,
          err.loc.end.offset
        );
        runtimeDom.warn(codeFrame ? `${message}
${codeFrame}` : message);
      }
      const render = new Function("Vue", code)(runtimeDom__namespace);
      render._rc = true;
      return compileCache[key] = render;
    }
    runtimeDom.registerRuntimeCompiler(compileToFunction);
    exports.compile = compileToFunction;
    Object.keys(runtimeDom).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        exports[k] = runtimeDom[k];
    });
  }
});

// node_modules/vue/index.js
var require_vue = __commonJS({
  "node_modules/vue/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_vue_cjs();
    }
  }
});

// node_modules/vue3-qr-reader/dist/vue3-qr-reader.common.js
var require_vue3_qr_reader_common = __commonJS({
  "node_modules/vue3-qr-reader/dist/vue3-qr-reader.common.js"(exports, module) {
    module.exports = /******/
    function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module2 = installedModules[moduleId] = {
          /******/
          i: moduleId,
          /******/
          l: false,
          /******/
          exports: {}
          /******/
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.l = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.d = function(exports2, name, getter) {
        if (!__webpack_require__.o(exports2, name)) {
          Object.defineProperty(exports2, name, { enumerable: true, get: getter });
        }
      };
      __webpack_require__.r = function(exports2) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
        }
        Object.defineProperty(exports2, "__esModule", { value: true });
      };
      __webpack_require__.t = function(value, mode) {
        if (mode & 1)
          value = __webpack_require__(value);
        if (mode & 8)
          return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule)
          return value;
        var ns = /* @__PURE__ */ Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", { enumerable: true, value });
        if (mode & 2 && typeof value != "string")
          for (var key in value)
            __webpack_require__.d(ns, key, (function(key2) {
              return value[key2];
            }).bind(null, key));
        return ns;
      };
      __webpack_require__.n = function(module2) {
        var getter = module2 && module2.__esModule ? (
          /******/
          function getDefault() {
            return module2["default"];
          }
        ) : (
          /******/
          function getModuleExports() {
            return module2;
          }
        );
        __webpack_require__.d(getter, "a", getter);
        return getter;
      };
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      __webpack_require__.p = "";
      return __webpack_require__(__webpack_require__.s = "fb15");
    }({
      /***/
      "00ee": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          var TO_STRING_TAG = wellKnownSymbol("toStringTag");
          var test = {};
          test[TO_STRING_TAG] = "z";
          module2.exports = String(test) === "[object z]";
        }
      ),
      /***/
      "0366": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var aFunction = __webpack_require__("1c0b");
          module2.exports = function(fn, that, length) {
            aFunction(fn);
            if (that === void 0)
              return fn;
            switch (length) {
              case 0:
                return function() {
                  return fn.call(that);
                };
              case 1:
                return function(a) {
                  return fn.call(that, a);
                };
              case 2:
                return function(a, b) {
                  return fn.call(that, a, b);
                };
              case 3:
                return function(a, b, c) {
                  return fn.call(that, a, b, c);
                };
            }
            return function() {
              return fn.apply(that, arguments);
            };
          };
        }
      ),
      /***/
      "0538": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var aFunction = __webpack_require__("1c0b");
          var isObject2 = __webpack_require__("861d");
          var slice = [].slice;
          var factories = {};
          var construct = function(C, argsLength, args) {
            if (!(argsLength in factories)) {
              for (var list = [], i = 0; i < argsLength; i++)
                list[i] = "a[" + i + "]";
              factories[argsLength] = Function("C,a", "return new C(" + list.join(",") + ")");
            }
            return factories[argsLength](C, args);
          };
          module2.exports = Function.bind || function bind(that) {
            var fn = aFunction(this);
            var partArgs = slice.call(arguments, 1);
            var boundFunction = function bound() {
              var args = partArgs.concat(slice.call(arguments));
              return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
            };
            if (isObject2(fn.prototype))
              boundFunction.prototype = fn.prototype;
            return boundFunction;
          };
        }
      ),
      /***/
      "057f": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var toIndexedObject = __webpack_require__("fc6a");
          var nativeGetOwnPropertyNames = __webpack_require__("241c").f;
          var toString = {}.toString;
          var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
          var getWindowNames = function(it) {
            try {
              return nativeGetOwnPropertyNames(it);
            } catch (error) {
              return windowNames.slice();
            }
          };
          module2.exports.f = function getOwnPropertyNames(it) {
            return windowNames && toString.call(it) == "[object Window]" ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
          };
        }
      ),
      /***/
      "06cf": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var propertyIsEnumerableModule = __webpack_require__("d1e7");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          var toIndexedObject = __webpack_require__("fc6a");
          var toPrimitive = __webpack_require__("c04e");
          var has = __webpack_require__("5135");
          var IE8_DOM_DEFINE = __webpack_require__("0cfb");
          var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
          exports2.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
            O = toIndexedObject(O);
            P = toPrimitive(P, true);
            if (IE8_DOM_DEFINE)
              try {
                return nativeGetOwnPropertyDescriptor(O, P);
              } catch (error) {
              }
            if (has(O, P))
              return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
          };
        }
      ),
      /***/
      "0cfb": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var fails = __webpack_require__("d039");
          var createElement = __webpack_require__("cc12");
          module2.exports = !DESCRIPTORS && !fails(function() {
            return Object.defineProperty(createElement("div"), "a", {
              get: function() {
                return 7;
              }
            }).a != 7;
          });
        }
      ),
      /***/
      "0d3b": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var fails = __webpack_require__("d039");
          var wellKnownSymbol = __webpack_require__("b622");
          var IS_PURE = __webpack_require__("c430");
          var ITERATOR = wellKnownSymbol("iterator");
          module2.exports = !fails(function() {
            var url = new URL("b?a=1&b=2&c=3", "http://a");
            var searchParams = url.searchParams;
            var result = "";
            url.pathname = "c%20d";
            searchParams.forEach(function(value, key) {
              searchParams["delete"]("b");
              result += key + value;
            });
            return IS_PURE && !url.toJSON || !searchParams.sort || url.href !== "http://a/c%20d?a=1&c=3" || searchParams.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !searchParams[ITERATOR] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("http://тест").host !== "xn--e1aybc" || new URL("http://a#б").hash !== "#%D0%B1" || result !== "a1c3" || new URL("http://x", void 0).host !== "x";
          });
        }
      ),
      /***/
      "159b": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var DOMIterables = __webpack_require__("fdbc");
          var forEach = __webpack_require__("17c2");
          var createNonEnumerableProperty = __webpack_require__("9112");
          for (var COLLECTION_NAME in DOMIterables) {
            var Collection = global[COLLECTION_NAME];
            var CollectionPrototype = Collection && Collection.prototype;
            if (CollectionPrototype && CollectionPrototype.forEach !== forEach)
              try {
                createNonEnumerableProperty(CollectionPrototype, "forEach", forEach);
              } catch (error) {
                CollectionPrototype.forEach = forEach;
              }
          }
        }
      ),
      /***/
      "17c2": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $forEach = __webpack_require__("b727").forEach;
          var arrayMethodIsStrict = __webpack_require__("a640");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var STRICT_METHOD = arrayMethodIsStrict("forEach");
          var USES_TO_LENGTH = arrayMethodUsesToLength("forEach");
          module2.exports = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn) {
            return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          } : [].forEach;
        }
      ),
      /***/
      "19aa": (
        /***/
        function(module2, exports2) {
          module2.exports = function(it, Constructor, name) {
            if (!(it instanceof Constructor)) {
              throw TypeError("Incorrect " + (name ? name + " " : "") + "invocation");
            }
            return it;
          };
        }
      ),
      /***/
      "1be4": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var getBuiltIn = __webpack_require__("d066");
          module2.exports = getBuiltIn("document", "documentElement");
        }
      ),
      /***/
      "1c0b": (
        /***/
        function(module2, exports2) {
          module2.exports = function(it) {
            if (typeof it != "function") {
              throw TypeError(String(it) + " is not a function");
            }
            return it;
          };
        }
      ),
      /***/
      "1c7e": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          var ITERATOR = wellKnownSymbol("iterator");
          var SAFE_CLOSING = false;
          try {
            var called = 0;
            var iteratorWithReturn = {
              next: function() {
                return { done: !!called++ };
              },
              "return": function() {
                SAFE_CLOSING = true;
              }
            };
            iteratorWithReturn[ITERATOR] = function() {
              return this;
            };
            Array.from(iteratorWithReturn, function() {
              throw 2;
            });
          } catch (error) {
          }
          module2.exports = function(exec, SKIP_CLOSING) {
            if (!SKIP_CLOSING && !SAFE_CLOSING)
              return false;
            var ITERATION_SUPPORT = false;
            try {
              var object = {};
              object[ITERATOR] = function() {
                return {
                  next: function() {
                    return { done: ITERATION_SUPPORT = true };
                  }
                };
              };
              exec(object);
            } catch (error) {
            }
            return ITERATION_SUPPORT;
          };
        }
      ),
      /***/
      "1cdc": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var userAgent = __webpack_require__("342f");
          module2.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);
        }
      ),
      /***/
      "1d80": (
        /***/
        function(module2, exports2) {
          module2.exports = function(it) {
            if (it == void 0)
              throw TypeError("Can't call method on " + it);
            return it;
          };
        }
      ),
      /***/
      "1dde": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var fails = __webpack_require__("d039");
          var wellKnownSymbol = __webpack_require__("b622");
          var V8_VERSION = __webpack_require__("2d00");
          var SPECIES = wellKnownSymbol("species");
          module2.exports = function(METHOD_NAME) {
            return V8_VERSION >= 51 || !fails(function() {
              var array = [];
              var constructor = array.constructor = {};
              constructor[SPECIES] = function() {
                return { foo: 1 };
              };
              return array[METHOD_NAME](Boolean).foo !== 1;
            });
          };
        }
      ),
      /***/
      "2266": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var isArrayIteratorMethod = __webpack_require__("e95a");
          var toLength = __webpack_require__("50c4");
          var bind = __webpack_require__("0366");
          var getIteratorMethod = __webpack_require__("35a1");
          var callWithSafeIterationClosing = __webpack_require__("9bdd");
          var Result = function(stopped, result) {
            this.stopped = stopped;
            this.result = result;
          };
          var iterate = module2.exports = function(iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
            var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
            var iterator, iterFn, index, length, result, next, step;
            if (IS_ITERATOR) {
              iterator = iterable;
            } else {
              iterFn = getIteratorMethod(iterable);
              if (typeof iterFn != "function")
                throw TypeError("Target is not iterable");
              if (isArrayIteratorMethod(iterFn)) {
                for (index = 0, length = toLength(iterable.length); length > index; index++) {
                  result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
                  if (result && result instanceof Result)
                    return result;
                }
                return new Result(false);
              }
              iterator = iterFn.call(iterable);
            }
            next = iterator.next;
            while (!(step = next.call(iterator)).done) {
              result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
              if (typeof result == "object" && result && result instanceof Result)
                return result;
            }
            return new Result(false);
          };
          iterate.stop = function(result) {
            return new Result(true, result);
          };
        }
      ),
      /***/
      "23cb": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var toInteger = __webpack_require__("a691");
          var max = Math.max;
          var min = Math.min;
          module2.exports = function(index, length) {
            var integer = toInteger(index);
            return integer < 0 ? max(integer + length, 0) : min(integer, length);
          };
        }
      ),
      /***/
      "23e7": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
          var createNonEnumerableProperty = __webpack_require__("9112");
          var redefine = __webpack_require__("6eeb");
          var setGlobal = __webpack_require__("ce4e");
          var copyConstructorProperties = __webpack_require__("e893");
          var isForced = __webpack_require__("94ca");
          module2.exports = function(options, source) {
            var TARGET = options.target;
            var GLOBAL = options.global;
            var STATIC = options.stat;
            var FORCED, target, key, targetProperty, sourceProperty, descriptor;
            if (GLOBAL) {
              target = global;
            } else if (STATIC) {
              target = global[TARGET] || setGlobal(TARGET, {});
            } else {
              target = (global[TARGET] || {}).prototype;
            }
            if (target)
              for (key in source) {
                sourceProperty = source[key];
                if (options.noTargetGet) {
                  descriptor = getOwnPropertyDescriptor(target, key);
                  targetProperty = descriptor && descriptor.value;
                } else
                  targetProperty = target[key];
                FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
                if (!FORCED && targetProperty !== void 0) {
                  if (typeof sourceProperty === typeof targetProperty)
                    continue;
                  copyConstructorProperties(sourceProperty, targetProperty);
                }
                if (options.sham || targetProperty && targetProperty.sham) {
                  createNonEnumerableProperty(sourceProperty, "sham", true);
                }
                redefine(target, key, sourceProperty, options);
              }
          };
        }
      ),
      /***/
      "241c": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var internalObjectKeys = __webpack_require__("ca84");
          var enumBugKeys = __webpack_require__("7839");
          var hiddenKeys = enumBugKeys.concat("length", "prototype");
          exports2.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
            return internalObjectKeys(O, hiddenKeys);
          };
        }
      ),
      /***/
      "24fb": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          module2.exports = function(useSourceMap) {
            var list = [];
            list.toString = function toString() {
              return this.map(function(item) {
                var content = cssWithMappingToString(item, useSourceMap);
                if (item[2]) {
                  return "@media ".concat(item[2], " {").concat(content, "}");
                }
                return content;
              }).join("");
            };
            list.i = function(modules, mediaQuery, dedupe) {
              if (typeof modules === "string") {
                modules = [[null, modules, ""]];
              }
              var alreadyImportedModules = {};
              if (dedupe) {
                for (var i = 0; i < this.length; i++) {
                  var id = this[i][0];
                  if (id != null) {
                    alreadyImportedModules[id] = true;
                  }
                }
              }
              for (var _i = 0; _i < modules.length; _i++) {
                var item = [].concat(modules[_i]);
                if (dedupe && alreadyImportedModules[item[0]]) {
                  continue;
                }
                if (mediaQuery) {
                  if (!item[2]) {
                    item[2] = mediaQuery;
                  } else {
                    item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
                  }
                }
                list.push(item);
              }
            };
            return list;
          };
          function cssWithMappingToString(item, useSourceMap) {
            var content = item[1] || "";
            var cssMapping = item[3];
            if (!cssMapping) {
              return content;
            }
            if (useSourceMap && typeof btoa === "function") {
              var sourceMapping = toComment(cssMapping);
              var sourceURLs = cssMapping.sources.map(function(source) {
                return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
              });
              return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
            }
            return [content].join("\n");
          }
          function toComment(sourceMap) {
            var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
            var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
            return "/*# ".concat(data, " */");
          }
        }
      ),
      /***/
      "2532": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var notARegExp = __webpack_require__("5a34");
          var requireObjectCoercible = __webpack_require__("1d80");
          var correctIsRegExpLogic = __webpack_require__("ab13");
          $({ target: "String", proto: true, forced: !correctIsRegExpLogic("includes") }, {
            includes: function includes(searchString) {
              return !!~String(requireObjectCoercible(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        }
      ),
      /***/
      "25f0": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var redefine = __webpack_require__("6eeb");
          var anObject = __webpack_require__("825a");
          var fails = __webpack_require__("d039");
          var flags = __webpack_require__("ad6d");
          var TO_STRING = "toString";
          var RegExpPrototype = RegExp.prototype;
          var nativeToString = RegExpPrototype[TO_STRING];
          var NOT_GENERIC = fails(function() {
            return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
          });
          var INCORRECT_NAME = nativeToString.name != TO_STRING;
          if (NOT_GENERIC || INCORRECT_NAME) {
            redefine(RegExp.prototype, TO_STRING, function toString() {
              var R = anObject(this);
              var p = String(R.source);
              var rf = R.flags;
              var f = String(rf === void 0 && R instanceof RegExp && !("flags" in RegExpPrototype) ? flags.call(R) : rf);
              return "/" + p + "/" + f;
            }, { unsafe: true });
          }
        }
      ),
      /***/
      "2626": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var getBuiltIn = __webpack_require__("d066");
          var definePropertyModule = __webpack_require__("9bf2");
          var wellKnownSymbol = __webpack_require__("b622");
          var DESCRIPTORS = __webpack_require__("83ab");
          var SPECIES = wellKnownSymbol("species");
          module2.exports = function(CONSTRUCTOR_NAME) {
            var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
            var defineProperty = definePropertyModule.f;
            if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
              defineProperty(Constructor, SPECIES, {
                configurable: true,
                get: function() {
                  return this;
                }
              });
            }
          };
        }
      ),
      /***/
      "2b3d": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          __webpack_require__("3ca3");
          var $ = __webpack_require__("23e7");
          var DESCRIPTORS = __webpack_require__("83ab");
          var USE_NATIVE_URL = __webpack_require__("0d3b");
          var global = __webpack_require__("da84");
          var defineProperties = __webpack_require__("37e8");
          var redefine = __webpack_require__("6eeb");
          var anInstance = __webpack_require__("19aa");
          var has = __webpack_require__("5135");
          var assign = __webpack_require__("60da");
          var arrayFrom = __webpack_require__("4df4");
          var codeAt = __webpack_require__("6547").codeAt;
          var toASCII = __webpack_require__("5fb2");
          var setToStringTag = __webpack_require__("d44e");
          var URLSearchParamsModule = __webpack_require__("9861");
          var InternalStateModule = __webpack_require__("69f3");
          var NativeURL = global.URL;
          var URLSearchParams2 = URLSearchParamsModule.URLSearchParams;
          var getInternalSearchParamsState = URLSearchParamsModule.getState;
          var setInternalState = InternalStateModule.set;
          var getInternalURLState = InternalStateModule.getterFor("URL");
          var floor = Math.floor;
          var pow = Math.pow;
          var INVALID_AUTHORITY = "Invalid authority";
          var INVALID_SCHEME = "Invalid scheme";
          var INVALID_HOST = "Invalid host";
          var INVALID_PORT = "Invalid port";
          var ALPHA = /[A-Za-z]/;
          var ALPHANUMERIC = /[\d+-.A-Za-z]/;
          var DIGIT = /\d/;
          var HEX_START = /^(0x|0X)/;
          var OCT = /^[0-7]+$/;
          var DEC = /^\d+$/;
          var HEX = /^[\dA-Fa-f]+$/;
          var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
          var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
          var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
          var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
          var EOF;
          var parseHost = function(url, input) {
            var result, codePoints, index;
            if (input.charAt(0) == "[") {
              if (input.charAt(input.length - 1) != "]")
                return INVALID_HOST;
              result = parseIPv6(input.slice(1, -1));
              if (!result)
                return INVALID_HOST;
              url.host = result;
            } else if (!isSpecial(url)) {
              if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input))
                return INVALID_HOST;
              result = "";
              codePoints = arrayFrom(input);
              for (index = 0; index < codePoints.length; index++) {
                result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
              }
              url.host = result;
            } else {
              input = toASCII(input);
              if (FORBIDDEN_HOST_CODE_POINT.test(input))
                return INVALID_HOST;
              result = parseIPv4(input);
              if (result === null)
                return INVALID_HOST;
              url.host = result;
            }
          };
          var parseIPv4 = function(input) {
            var parts = input.split(".");
            var partsLength, numbers, index, part, radix, number, ipv4;
            if (parts.length && parts[parts.length - 1] == "") {
              parts.pop();
            }
            partsLength = parts.length;
            if (partsLength > 4)
              return input;
            numbers = [];
            for (index = 0; index < partsLength; index++) {
              part = parts[index];
              if (part == "")
                return input;
              radix = 10;
              if (part.length > 1 && part.charAt(0) == "0") {
                radix = HEX_START.test(part) ? 16 : 8;
                part = part.slice(radix == 8 ? 1 : 2);
              }
              if (part === "") {
                number = 0;
              } else {
                if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part))
                  return input;
                number = parseInt(part, radix);
              }
              numbers.push(number);
            }
            for (index = 0; index < partsLength; index++) {
              number = numbers[index];
              if (index == partsLength - 1) {
                if (number >= pow(256, 5 - partsLength))
                  return null;
              } else if (number > 255)
                return null;
            }
            ipv4 = numbers.pop();
            for (index = 0; index < numbers.length; index++) {
              ipv4 += numbers[index] * pow(256, 3 - index);
            }
            return ipv4;
          };
          var parseIPv6 = function(input) {
            var address = [0, 0, 0, 0, 0, 0, 0, 0];
            var pieceIndex = 0;
            var compress = null;
            var pointer = 0;
            var value, length, numbersSeen, ipv4Piece, number, swaps, swap;
            var char = function() {
              return input.charAt(pointer);
            };
            if (char() == ":") {
              if (input.charAt(1) != ":")
                return;
              pointer += 2;
              pieceIndex++;
              compress = pieceIndex;
            }
            while (char()) {
              if (pieceIndex == 8)
                return;
              if (char() == ":") {
                if (compress !== null)
                  return;
                pointer++;
                pieceIndex++;
                compress = pieceIndex;
                continue;
              }
              value = length = 0;
              while (length < 4 && HEX.test(char())) {
                value = value * 16 + parseInt(char(), 16);
                pointer++;
                length++;
              }
              if (char() == ".") {
                if (length == 0)
                  return;
                pointer -= length;
                if (pieceIndex > 6)
                  return;
                numbersSeen = 0;
                while (char()) {
                  ipv4Piece = null;
                  if (numbersSeen > 0) {
                    if (char() == "." && numbersSeen < 4)
                      pointer++;
                    else
                      return;
                  }
                  if (!DIGIT.test(char()))
                    return;
                  while (DIGIT.test(char())) {
                    number = parseInt(char(), 10);
                    if (ipv4Piece === null)
                      ipv4Piece = number;
                    else if (ipv4Piece == 0)
                      return;
                    else
                      ipv4Piece = ipv4Piece * 10 + number;
                    if (ipv4Piece > 255)
                      return;
                    pointer++;
                  }
                  address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
                  numbersSeen++;
                  if (numbersSeen == 2 || numbersSeen == 4)
                    pieceIndex++;
                }
                if (numbersSeen != 4)
                  return;
                break;
              } else if (char() == ":") {
                pointer++;
                if (!char())
                  return;
              } else if (char())
                return;
              address[pieceIndex++] = value;
            }
            if (compress !== null) {
              swaps = pieceIndex - compress;
              pieceIndex = 7;
              while (pieceIndex != 0 && swaps > 0) {
                swap = address[pieceIndex];
                address[pieceIndex--] = address[compress + swaps - 1];
                address[compress + --swaps] = swap;
              }
            } else if (pieceIndex != 8)
              return;
            return address;
          };
          var findLongestZeroSequence = function(ipv6) {
            var maxIndex = null;
            var maxLength = 1;
            var currStart = null;
            var currLength = 0;
            var index = 0;
            for (; index < 8; index++) {
              if (ipv6[index] !== 0) {
                if (currLength > maxLength) {
                  maxIndex = currStart;
                  maxLength = currLength;
                }
                currStart = null;
                currLength = 0;
              } else {
                if (currStart === null)
                  currStart = index;
                ++currLength;
              }
            }
            if (currLength > maxLength) {
              maxIndex = currStart;
              maxLength = currLength;
            }
            return maxIndex;
          };
          var serializeHost = function(host) {
            var result, index, compress, ignore0;
            if (typeof host == "number") {
              result = [];
              for (index = 0; index < 4; index++) {
                result.unshift(host % 256);
                host = floor(host / 256);
              }
              return result.join(".");
            } else if (typeof host == "object") {
              result = "";
              compress = findLongestZeroSequence(host);
              for (index = 0; index < 8; index++) {
                if (ignore0 && host[index] === 0)
                  continue;
                if (ignore0)
                  ignore0 = false;
                if (compress === index) {
                  result += index ? ":" : "::";
                  ignore0 = true;
                } else {
                  result += host[index].toString(16);
                  if (index < 7)
                    result += ":";
                }
              }
              return "[" + result + "]";
            }
            return host;
          };
          var C0ControlPercentEncodeSet = {};
          var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
            " ": 1,
            '"': 1,
            "<": 1,
            ">": 1,
            "`": 1
          });
          var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
            "#": 1,
            "?": 1,
            "{": 1,
            "}": 1
          });
          var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
            "/": 1,
            ":": 1,
            ";": 1,
            "=": 1,
            "@": 1,
            "[": 1,
            "\\": 1,
            "]": 1,
            "^": 1,
            "|": 1
          });
          var percentEncode = function(char, set) {
            var code = codeAt(char, 0);
            return code > 32 && code < 127 && !has(set, char) ? char : encodeURIComponent(char);
          };
          var specialSchemes = {
            ftp: 21,
            file: null,
            http: 80,
            https: 443,
            ws: 80,
            wss: 443
          };
          var isSpecial = function(url) {
            return has(specialSchemes, url.scheme);
          };
          var includesCredentials = function(url) {
            return url.username != "" || url.password != "";
          };
          var cannotHaveUsernamePasswordPort = function(url) {
            return !url.host || url.cannotBeABaseURL || url.scheme == "file";
          };
          var isWindowsDriveLetter = function(string, normalized) {
            var second;
            return string.length == 2 && ALPHA.test(string.charAt(0)) && ((second = string.charAt(1)) == ":" || !normalized && second == "|");
          };
          var startsWithWindowsDriveLetter = function(string) {
            var third;
            return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (string.length == 2 || ((third = string.charAt(2)) === "/" || third === "\\" || third === "?" || third === "#"));
          };
          var shortenURLsPath = function(url) {
            var path = url.path;
            var pathSize = path.length;
            if (pathSize && (url.scheme != "file" || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
              path.pop();
            }
          };
          var isSingleDot = function(segment) {
            return segment === "." || segment.toLowerCase() === "%2e";
          };
          var isDoubleDot = function(segment) {
            segment = segment.toLowerCase();
            return segment === ".." || segment === "%2e." || segment === ".%2e" || segment === "%2e%2e";
          };
          var SCHEME_START = {};
          var SCHEME = {};
          var NO_SCHEME = {};
          var SPECIAL_RELATIVE_OR_AUTHORITY = {};
          var PATH_OR_AUTHORITY = {};
          var RELATIVE = {};
          var RELATIVE_SLASH = {};
          var SPECIAL_AUTHORITY_SLASHES = {};
          var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
          var AUTHORITY = {};
          var HOST = {};
          var HOSTNAME = {};
          var PORT = {};
          var FILE = {};
          var FILE_SLASH = {};
          var FILE_HOST = {};
          var PATH_START = {};
          var PATH = {};
          var CANNOT_BE_A_BASE_URL_PATH = {};
          var QUERY = {};
          var FRAGMENT2 = {};
          var parseURL = function(url, input, stateOverride, base) {
            var state = stateOverride || SCHEME_START;
            var pointer = 0;
            var buffer = "";
            var seenAt = false;
            var seenBracket = false;
            var seenPasswordToken = false;
            var codePoints, char, bufferCodePoints, failure;
            if (!stateOverride) {
              url.scheme = "";
              url.username = "";
              url.password = "";
              url.host = null;
              url.port = null;
              url.path = [];
              url.query = null;
              url.fragment = null;
              url.cannotBeABaseURL = false;
              input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, "");
            }
            input = input.replace(TAB_AND_NEW_LINE, "");
            codePoints = arrayFrom(input);
            while (pointer <= codePoints.length) {
              char = codePoints[pointer];
              switch (state) {
                case SCHEME_START:
                  if (char && ALPHA.test(char)) {
                    buffer += char.toLowerCase();
                    state = SCHEME;
                  } else if (!stateOverride) {
                    state = NO_SCHEME;
                    continue;
                  } else
                    return INVALID_SCHEME;
                  break;
                case SCHEME:
                  if (char && (ALPHANUMERIC.test(char) || char == "+" || char == "-" || char == ".")) {
                    buffer += char.toLowerCase();
                  } else if (char == ":") {
                    if (stateOverride && (isSpecial(url) != has(specialSchemes, buffer) || buffer == "file" && (includesCredentials(url) || url.port !== null) || url.scheme == "file" && !url.host))
                      return;
                    url.scheme = buffer;
                    if (stateOverride) {
                      if (isSpecial(url) && specialSchemes[url.scheme] == url.port)
                        url.port = null;
                      return;
                    }
                    buffer = "";
                    if (url.scheme == "file") {
                      state = FILE;
                    } else if (isSpecial(url) && base && base.scheme == url.scheme) {
                      state = SPECIAL_RELATIVE_OR_AUTHORITY;
                    } else if (isSpecial(url)) {
                      state = SPECIAL_AUTHORITY_SLASHES;
                    } else if (codePoints[pointer + 1] == "/") {
                      state = PATH_OR_AUTHORITY;
                      pointer++;
                    } else {
                      url.cannotBeABaseURL = true;
                      url.path.push("");
                      state = CANNOT_BE_A_BASE_URL_PATH;
                    }
                  } else if (!stateOverride) {
                    buffer = "";
                    state = NO_SCHEME;
                    pointer = 0;
                    continue;
                  } else
                    return INVALID_SCHEME;
                  break;
                case NO_SCHEME:
                  if (!base || base.cannotBeABaseURL && char != "#")
                    return INVALID_SCHEME;
                  if (base.cannotBeABaseURL && char == "#") {
                    url.scheme = base.scheme;
                    url.path = base.path.slice();
                    url.query = base.query;
                    url.fragment = "";
                    url.cannotBeABaseURL = true;
                    state = FRAGMENT2;
                    break;
                  }
                  state = base.scheme == "file" ? FILE : RELATIVE;
                  continue;
                case SPECIAL_RELATIVE_OR_AUTHORITY:
                  if (char == "/" && codePoints[pointer + 1] == "/") {
                    state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                    pointer++;
                  } else {
                    state = RELATIVE;
                    continue;
                  }
                  break;
                case PATH_OR_AUTHORITY:
                  if (char == "/") {
                    state = AUTHORITY;
                    break;
                  } else {
                    state = PATH;
                    continue;
                  }
                case RELATIVE:
                  url.scheme = base.scheme;
                  if (char == EOF) {
                    url.username = base.username;
                    url.password = base.password;
                    url.host = base.host;
                    url.port = base.port;
                    url.path = base.path.slice();
                    url.query = base.query;
                  } else if (char == "/" || char == "\\" && isSpecial(url)) {
                    state = RELATIVE_SLASH;
                  } else if (char == "?") {
                    url.username = base.username;
                    url.password = base.password;
                    url.host = base.host;
                    url.port = base.port;
                    url.path = base.path.slice();
                    url.query = "";
                    state = QUERY;
                  } else if (char == "#") {
                    url.username = base.username;
                    url.password = base.password;
                    url.host = base.host;
                    url.port = base.port;
                    url.path = base.path.slice();
                    url.query = base.query;
                    url.fragment = "";
                    state = FRAGMENT2;
                  } else {
                    url.username = base.username;
                    url.password = base.password;
                    url.host = base.host;
                    url.port = base.port;
                    url.path = base.path.slice();
                    url.path.pop();
                    state = PATH;
                    continue;
                  }
                  break;
                case RELATIVE_SLASH:
                  if (isSpecial(url) && (char == "/" || char == "\\")) {
                    state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                  } else if (char == "/") {
                    state = AUTHORITY;
                  } else {
                    url.username = base.username;
                    url.password = base.password;
                    url.host = base.host;
                    url.port = base.port;
                    state = PATH;
                    continue;
                  }
                  break;
                case SPECIAL_AUTHORITY_SLASHES:
                  state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                  if (char != "/" || buffer.charAt(pointer + 1) != "/")
                    continue;
                  pointer++;
                  break;
                case SPECIAL_AUTHORITY_IGNORE_SLASHES:
                  if (char != "/" && char != "\\") {
                    state = AUTHORITY;
                    continue;
                  }
                  break;
                case AUTHORITY:
                  if (char == "@") {
                    if (seenAt)
                      buffer = "%40" + buffer;
                    seenAt = true;
                    bufferCodePoints = arrayFrom(buffer);
                    for (var i = 0; i < bufferCodePoints.length; i++) {
                      var codePoint = bufferCodePoints[i];
                      if (codePoint == ":" && !seenPasswordToken) {
                        seenPasswordToken = true;
                        continue;
                      }
                      var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
                      if (seenPasswordToken)
                        url.password += encodedCodePoints;
                      else
                        url.username += encodedCodePoints;
                    }
                    buffer = "";
                  } else if (char == EOF || char == "/" || char == "?" || char == "#" || char == "\\" && isSpecial(url)) {
                    if (seenAt && buffer == "")
                      return INVALID_AUTHORITY;
                    pointer -= arrayFrom(buffer).length + 1;
                    buffer = "";
                    state = HOST;
                  } else
                    buffer += char;
                  break;
                case HOST:
                case HOSTNAME:
                  if (stateOverride && url.scheme == "file") {
                    state = FILE_HOST;
                    continue;
                  } else if (char == ":" && !seenBracket) {
                    if (buffer == "")
                      return INVALID_HOST;
                    failure = parseHost(url, buffer);
                    if (failure)
                      return failure;
                    buffer = "";
                    state = PORT;
                    if (stateOverride == HOSTNAME)
                      return;
                  } else if (char == EOF || char == "/" || char == "?" || char == "#" || char == "\\" && isSpecial(url)) {
                    if (isSpecial(url) && buffer == "")
                      return INVALID_HOST;
                    if (stateOverride && buffer == "" && (includesCredentials(url) || url.port !== null))
                      return;
                    failure = parseHost(url, buffer);
                    if (failure)
                      return failure;
                    buffer = "";
                    state = PATH_START;
                    if (stateOverride)
                      return;
                    continue;
                  } else {
                    if (char == "[")
                      seenBracket = true;
                    else if (char == "]")
                      seenBracket = false;
                    buffer += char;
                  }
                  break;
                case PORT:
                  if (DIGIT.test(char)) {
                    buffer += char;
                  } else if (char == EOF || char == "/" || char == "?" || char == "#" || char == "\\" && isSpecial(url) || stateOverride) {
                    if (buffer != "") {
                      var port = parseInt(buffer, 10);
                      if (port > 65535)
                        return INVALID_PORT;
                      url.port = isSpecial(url) && port === specialSchemes[url.scheme] ? null : port;
                      buffer = "";
                    }
                    if (stateOverride)
                      return;
                    state = PATH_START;
                    continue;
                  } else
                    return INVALID_PORT;
                  break;
                case FILE:
                  url.scheme = "file";
                  if (char == "/" || char == "\\")
                    state = FILE_SLASH;
                  else if (base && base.scheme == "file") {
                    if (char == EOF) {
                      url.host = base.host;
                      url.path = base.path.slice();
                      url.query = base.query;
                    } else if (char == "?") {
                      url.host = base.host;
                      url.path = base.path.slice();
                      url.query = "";
                      state = QUERY;
                    } else if (char == "#") {
                      url.host = base.host;
                      url.path = base.path.slice();
                      url.query = base.query;
                      url.fragment = "";
                      state = FRAGMENT2;
                    } else {
                      if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(""))) {
                        url.host = base.host;
                        url.path = base.path.slice();
                        shortenURLsPath(url);
                      }
                      state = PATH;
                      continue;
                    }
                  } else {
                    state = PATH;
                    continue;
                  }
                  break;
                case FILE_SLASH:
                  if (char == "/" || char == "\\") {
                    state = FILE_HOST;
                    break;
                  }
                  if (base && base.scheme == "file" && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(""))) {
                    if (isWindowsDriveLetter(base.path[0], true))
                      url.path.push(base.path[0]);
                    else
                      url.host = base.host;
                  }
                  state = PATH;
                  continue;
                case FILE_HOST:
                  if (char == EOF || char == "/" || char == "\\" || char == "?" || char == "#") {
                    if (!stateOverride && isWindowsDriveLetter(buffer)) {
                      state = PATH;
                    } else if (buffer == "") {
                      url.host = "";
                      if (stateOverride)
                        return;
                      state = PATH_START;
                    } else {
                      failure = parseHost(url, buffer);
                      if (failure)
                        return failure;
                      if (url.host == "localhost")
                        url.host = "";
                      if (stateOverride)
                        return;
                      buffer = "";
                      state = PATH_START;
                    }
                    continue;
                  } else
                    buffer += char;
                  break;
                case PATH_START:
                  if (isSpecial(url)) {
                    state = PATH;
                    if (char != "/" && char != "\\")
                      continue;
                  } else if (!stateOverride && char == "?") {
                    url.query = "";
                    state = QUERY;
                  } else if (!stateOverride && char == "#") {
                    url.fragment = "";
                    state = FRAGMENT2;
                  } else if (char != EOF) {
                    state = PATH;
                    if (char != "/")
                      continue;
                  }
                  break;
                case PATH:
                  if (char == EOF || char == "/" || char == "\\" && isSpecial(url) || !stateOverride && (char == "?" || char == "#")) {
                    if (isDoubleDot(buffer)) {
                      shortenURLsPath(url);
                      if (char != "/" && !(char == "\\" && isSpecial(url))) {
                        url.path.push("");
                      }
                    } else if (isSingleDot(buffer)) {
                      if (char != "/" && !(char == "\\" && isSpecial(url))) {
                        url.path.push("");
                      }
                    } else {
                      if (url.scheme == "file" && !url.path.length && isWindowsDriveLetter(buffer)) {
                        if (url.host)
                          url.host = "";
                        buffer = buffer.charAt(0) + ":";
                      }
                      url.path.push(buffer);
                    }
                    buffer = "";
                    if (url.scheme == "file" && (char == EOF || char == "?" || char == "#")) {
                      while (url.path.length > 1 && url.path[0] === "") {
                        url.path.shift();
                      }
                    }
                    if (char == "?") {
                      url.query = "";
                      state = QUERY;
                    } else if (char == "#") {
                      url.fragment = "";
                      state = FRAGMENT2;
                    }
                  } else {
                    buffer += percentEncode(char, pathPercentEncodeSet);
                  }
                  break;
                case CANNOT_BE_A_BASE_URL_PATH:
                  if (char == "?") {
                    url.query = "";
                    state = QUERY;
                  } else if (char == "#") {
                    url.fragment = "";
                    state = FRAGMENT2;
                  } else if (char != EOF) {
                    url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
                  }
                  break;
                case QUERY:
                  if (!stateOverride && char == "#") {
                    url.fragment = "";
                    state = FRAGMENT2;
                  } else if (char != EOF) {
                    if (char == "'" && isSpecial(url))
                      url.query += "%27";
                    else if (char == "#")
                      url.query += "%23";
                    else
                      url.query += percentEncode(char, C0ControlPercentEncodeSet);
                  }
                  break;
                case FRAGMENT2:
                  if (char != EOF)
                    url.fragment += percentEncode(char, fragmentPercentEncodeSet);
                  break;
              }
              pointer++;
            }
          };
          var URLConstructor = function URL2(url) {
            var that = anInstance(this, URLConstructor, "URL");
            var base = arguments.length > 1 ? arguments[1] : void 0;
            var urlString = String(url);
            var state = setInternalState(that, { type: "URL" });
            var baseState, failure;
            if (base !== void 0) {
              if (base instanceof URLConstructor)
                baseState = getInternalURLState(base);
              else {
                failure = parseURL(baseState = {}, String(base));
                if (failure)
                  throw TypeError(failure);
              }
            }
            failure = parseURL(state, urlString, null, baseState);
            if (failure)
              throw TypeError(failure);
            var searchParams = state.searchParams = new URLSearchParams2();
            var searchParamsState = getInternalSearchParamsState(searchParams);
            searchParamsState.updateSearchParams(state.query);
            searchParamsState.updateURL = function() {
              state.query = String(searchParams) || null;
            };
            if (!DESCRIPTORS) {
              that.href = serializeURL.call(that);
              that.origin = getOrigin.call(that);
              that.protocol = getProtocol.call(that);
              that.username = getUsername.call(that);
              that.password = getPassword.call(that);
              that.host = getHost.call(that);
              that.hostname = getHostname.call(that);
              that.port = getPort.call(that);
              that.pathname = getPathname.call(that);
              that.search = getSearch.call(that);
              that.searchParams = getSearchParams.call(that);
              that.hash = getHash.call(that);
            }
          };
          var URLPrototype = URLConstructor.prototype;
          var serializeURL = function() {
            var url = getInternalURLState(this);
            var scheme = url.scheme;
            var username = url.username;
            var password = url.password;
            var host = url.host;
            var port = url.port;
            var path = url.path;
            var query = url.query;
            var fragment = url.fragment;
            var output = scheme + ":";
            if (host !== null) {
              output += "//";
              if (includesCredentials(url)) {
                output += username + (password ? ":" + password : "") + "@";
              }
              output += serializeHost(host);
              if (port !== null)
                output += ":" + port;
            } else if (scheme == "file")
              output += "//";
            output += url.cannotBeABaseURL ? path[0] : path.length ? "/" + path.join("/") : "";
            if (query !== null)
              output += "?" + query;
            if (fragment !== null)
              output += "#" + fragment;
            return output;
          };
          var getOrigin = function() {
            var url = getInternalURLState(this);
            var scheme = url.scheme;
            var port = url.port;
            if (scheme == "blob")
              try {
                return new URL(scheme.path[0]).origin;
              } catch (error) {
                return "null";
              }
            if (scheme == "file" || !isSpecial(url))
              return "null";
            return scheme + "://" + serializeHost(url.host) + (port !== null ? ":" + port : "");
          };
          var getProtocol = function() {
            return getInternalURLState(this).scheme + ":";
          };
          var getUsername = function() {
            return getInternalURLState(this).username;
          };
          var getPassword = function() {
            return getInternalURLState(this).password;
          };
          var getHost = function() {
            var url = getInternalURLState(this);
            var host = url.host;
            var port = url.port;
            return host === null ? "" : port === null ? serializeHost(host) : serializeHost(host) + ":" + port;
          };
          var getHostname = function() {
            var host = getInternalURLState(this).host;
            return host === null ? "" : serializeHost(host);
          };
          var getPort = function() {
            var port = getInternalURLState(this).port;
            return port === null ? "" : String(port);
          };
          var getPathname = function() {
            var url = getInternalURLState(this);
            var path = url.path;
            return url.cannotBeABaseURL ? path[0] : path.length ? "/" + path.join("/") : "";
          };
          var getSearch = function() {
            var query = getInternalURLState(this).query;
            return query ? "?" + query : "";
          };
          var getSearchParams = function() {
            return getInternalURLState(this).searchParams;
          };
          var getHash = function() {
            var fragment = getInternalURLState(this).fragment;
            return fragment ? "#" + fragment : "";
          };
          var accessorDescriptor = function(getter, setter) {
            return { get: getter, set: setter, configurable: true, enumerable: true };
          };
          if (DESCRIPTORS) {
            defineProperties(URLPrototype, {
              // `URL.prototype.href` accessors pair
              // https://url.spec.whatwg.org/#dom-url-href
              href: accessorDescriptor(serializeURL, function(href) {
                var url = getInternalURLState(this);
                var urlString = String(href);
                var failure = parseURL(url, urlString);
                if (failure)
                  throw TypeError(failure);
                getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
              }),
              // `URL.prototype.origin` getter
              // https://url.spec.whatwg.org/#dom-url-origin
              origin: accessorDescriptor(getOrigin),
              // `URL.prototype.protocol` accessors pair
              // https://url.spec.whatwg.org/#dom-url-protocol
              protocol: accessorDescriptor(getProtocol, function(protocol) {
                var url = getInternalURLState(this);
                parseURL(url, String(protocol) + ":", SCHEME_START);
              }),
              // `URL.prototype.username` accessors pair
              // https://url.spec.whatwg.org/#dom-url-username
              username: accessorDescriptor(getUsername, function(username) {
                var url = getInternalURLState(this);
                var codePoints = arrayFrom(String(username));
                if (cannotHaveUsernamePasswordPort(url))
                  return;
                url.username = "";
                for (var i = 0; i < codePoints.length; i++) {
                  url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
                }
              }),
              // `URL.prototype.password` accessors pair
              // https://url.spec.whatwg.org/#dom-url-password
              password: accessorDescriptor(getPassword, function(password) {
                var url = getInternalURLState(this);
                var codePoints = arrayFrom(String(password));
                if (cannotHaveUsernamePasswordPort(url))
                  return;
                url.password = "";
                for (var i = 0; i < codePoints.length; i++) {
                  url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
                }
              }),
              // `URL.prototype.host` accessors pair
              // https://url.spec.whatwg.org/#dom-url-host
              host: accessorDescriptor(getHost, function(host) {
                var url = getInternalURLState(this);
                if (url.cannotBeABaseURL)
                  return;
                parseURL(url, String(host), HOST);
              }),
              // `URL.prototype.hostname` accessors pair
              // https://url.spec.whatwg.org/#dom-url-hostname
              hostname: accessorDescriptor(getHostname, function(hostname) {
                var url = getInternalURLState(this);
                if (url.cannotBeABaseURL)
                  return;
                parseURL(url, String(hostname), HOSTNAME);
              }),
              // `URL.prototype.port` accessors pair
              // https://url.spec.whatwg.org/#dom-url-port
              port: accessorDescriptor(getPort, function(port) {
                var url = getInternalURLState(this);
                if (cannotHaveUsernamePasswordPort(url))
                  return;
                port = String(port);
                if (port == "")
                  url.port = null;
                else
                  parseURL(url, port, PORT);
              }),
              // `URL.prototype.pathname` accessors pair
              // https://url.spec.whatwg.org/#dom-url-pathname
              pathname: accessorDescriptor(getPathname, function(pathname) {
                var url = getInternalURLState(this);
                if (url.cannotBeABaseURL)
                  return;
                url.path = [];
                parseURL(url, pathname + "", PATH_START);
              }),
              // `URL.prototype.search` accessors pair
              // https://url.spec.whatwg.org/#dom-url-search
              search: accessorDescriptor(getSearch, function(search) {
                var url = getInternalURLState(this);
                search = String(search);
                if (search == "") {
                  url.query = null;
                } else {
                  if ("?" == search.charAt(0))
                    search = search.slice(1);
                  url.query = "";
                  parseURL(url, search, QUERY);
                }
                getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
              }),
              // `URL.prototype.searchParams` getter
              // https://url.spec.whatwg.org/#dom-url-searchparams
              searchParams: accessorDescriptor(getSearchParams),
              // `URL.prototype.hash` accessors pair
              // https://url.spec.whatwg.org/#dom-url-hash
              hash: accessorDescriptor(getHash, function(hash) {
                var url = getInternalURLState(this);
                hash = String(hash);
                if (hash == "") {
                  url.fragment = null;
                  return;
                }
                if ("#" == hash.charAt(0))
                  hash = hash.slice(1);
                url.fragment = "";
                parseURL(url, hash, FRAGMENT2);
              })
            });
          }
          redefine(URLPrototype, "toJSON", function toJSON() {
            return serializeURL.call(this);
          }, { enumerable: true });
          redefine(URLPrototype, "toString", function toString() {
            return serializeURL.call(this);
          }, { enumerable: true });
          if (NativeURL) {
            var nativeCreateObjectURL = NativeURL.createObjectURL;
            var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
            if (nativeCreateObjectURL)
              redefine(URLConstructor, "createObjectURL", function createObjectURL(blob) {
                return nativeCreateObjectURL.apply(NativeURL, arguments);
              });
            if (nativeRevokeObjectURL)
              redefine(URLConstructor, "revokeObjectURL", function revokeObjectURL(url) {
                return nativeRevokeObjectURL.apply(NativeURL, arguments);
              });
          }
          setToStringTag(URLConstructor, "URL");
          $({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
            URL: URLConstructor
          });
        }
      ),
      /***/
      "2ca0": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
          var toLength = __webpack_require__("50c4");
          var notARegExp = __webpack_require__("5a34");
          var requireObjectCoercible = __webpack_require__("1d80");
          var correctIsRegExpLogic = __webpack_require__("ab13");
          var IS_PURE = __webpack_require__("c430");
          var nativeStartsWith = "".startsWith;
          var min = Math.min;
          var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("startsWith");
          var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function() {
            var descriptor = getOwnPropertyDescriptor(String.prototype, "startsWith");
            return descriptor && !descriptor.writable;
          }();
          $({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
            startsWith: function startsWith2(searchString) {
              var that = String(requireObjectCoercible(this));
              notARegExp(searchString);
              var index = toLength(min(arguments.length > 1 ? arguments[1] : void 0, that.length));
              var search = String(searchString);
              return nativeStartsWith ? nativeStartsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
            }
          });
        }
      ),
      /***/
      "2cf4": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var fails = __webpack_require__("d039");
          var classof = __webpack_require__("c6b6");
          var bind = __webpack_require__("0366");
          var html = __webpack_require__("1be4");
          var createElement = __webpack_require__("cc12");
          var IS_IOS = __webpack_require__("1cdc");
          var location2 = global.location;
          var set = global.setImmediate;
          var clear = global.clearImmediate;
          var process2 = global.process;
          var MessageChannel = global.MessageChannel;
          var Dispatch = global.Dispatch;
          var counter = 0;
          var queue = {};
          var ONREADYSTATECHANGE = "onreadystatechange";
          var defer, channel, port;
          var run = function(id) {
            if (queue.hasOwnProperty(id)) {
              var fn = queue[id];
              delete queue[id];
              fn();
            }
          };
          var runner = function(id) {
            return function() {
              run(id);
            };
          };
          var listener = function(event) {
            run(event.data);
          };
          var post = function(id) {
            global.postMessage(id + "", location2.protocol + "//" + location2.host);
          };
          if (!set || !clear) {
            set = function setImmediate(fn) {
              var args = [];
              var i = 1;
              while (arguments.length > i)
                args.push(arguments[i++]);
              queue[++counter] = function() {
                (typeof fn == "function" ? fn : Function(fn)).apply(void 0, args);
              };
              defer(counter);
              return counter;
            };
            clear = function clearImmediate(id) {
              delete queue[id];
            };
            if (classof(process2) == "process") {
              defer = function(id) {
                process2.nextTick(runner(id));
              };
            } else if (Dispatch && Dispatch.now) {
              defer = function(id) {
                Dispatch.now(runner(id));
              };
            } else if (MessageChannel && !IS_IOS) {
              channel = new MessageChannel();
              port = channel.port2;
              channel.port1.onmessage = listener;
              defer = bind(port.postMessage, port, 1);
            } else if (global.addEventListener && typeof postMessage == "function" && !global.importScripts && !fails(post) && location2.protocol !== "file:") {
              defer = post;
              global.addEventListener("message", listener, false);
            } else if (ONREADYSTATECHANGE in createElement("script")) {
              defer = function(id) {
                html.appendChild(createElement("script"))[ONREADYSTATECHANGE] = function() {
                  html.removeChild(this);
                  run(id);
                };
              };
            } else {
              defer = function(id) {
                setTimeout(runner(id), 0);
              };
            }
          }
          module2.exports = {
            set,
            clear
          };
        }
      ),
      /***/
      "2d00": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var userAgent = __webpack_require__("342f");
          var process2 = global.process;
          var versions = process2 && process2.versions;
          var v8 = versions && versions.v8;
          var match, version;
          if (v8) {
            match = v8.split(".");
            version = match[0] + match[1];
          } else if (userAgent) {
            match = userAgent.match(/Edge\/(\d+)/);
            if (!match || match[1] >= 74) {
              match = userAgent.match(/Chrome\/(\d+)/);
              if (match)
                version = match[1];
            }
          }
          module2.exports = version && +version;
        }
      ),
      /***/
      "3410": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var fails = __webpack_require__("d039");
          var toObject = __webpack_require__("7b0b");
          var nativeGetPrototypeOf = __webpack_require__("e163");
          var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");
          var FAILS_ON_PRIMITIVES = fails(function() {
            nativeGetPrototypeOf(1);
          });
          $({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
            getPrototypeOf: function getPrototypeOf(it) {
              return nativeGetPrototypeOf(toObject(it));
            }
          });
        }
      ),
      /***/
      "342f": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var getBuiltIn = __webpack_require__("d066");
          module2.exports = getBuiltIn("navigator", "userAgent") || "";
        }
      ),
      /***/
      "35a1": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var classof = __webpack_require__("f5df");
          var Iterators = __webpack_require__("3f8c");
          var wellKnownSymbol = __webpack_require__("b622");
          var ITERATOR = wellKnownSymbol("iterator");
          module2.exports = function(it) {
            if (it != void 0)
              return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
          };
        }
      ),
      /***/
      "37e8": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var definePropertyModule = __webpack_require__("9bf2");
          var anObject = __webpack_require__("825a");
          var objectKeys = __webpack_require__("df75");
          module2.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
            anObject(O);
            var keys = objectKeys(Properties);
            var length = keys.length;
            var index = 0;
            var key;
            while (length > index)
              definePropertyModule.f(O, key = keys[index++], Properties[key]);
            return O;
          };
        }
      ),
      /***/
      "3bbe": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var isObject2 = __webpack_require__("861d");
          module2.exports = function(it) {
            if (!isObject2(it) && it !== null) {
              throw TypeError("Can't set " + String(it) + " as a prototype");
            }
            return it;
          };
        }
      ),
      /***/
      "3ca3": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var charAt = __webpack_require__("6547").charAt;
          var InternalStateModule = __webpack_require__("69f3");
          var defineIterator = __webpack_require__("7dd0");
          var STRING_ITERATOR = "String Iterator";
          var setInternalState = InternalStateModule.set;
          var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
          defineIterator(String, "String", function(iterated) {
            setInternalState(this, {
              type: STRING_ITERATOR,
              string: String(iterated),
              index: 0
            });
          }, function next() {
            var state = getInternalState(this);
            var string = state.string;
            var index = state.index;
            var point;
            if (index >= string.length)
              return { value: void 0, done: true };
            point = charAt(string, index);
            state.index += point.length;
            return { value: point, done: false };
          });
        }
      ),
      /***/
      "3f8c": (
        /***/
        function(module2, exports2) {
          module2.exports = {};
        }
      ),
      /***/
      "4160": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var forEach = __webpack_require__("17c2");
          $({ target: "Array", proto: true, forced: [].forEach != forEach }, {
            forEach
          });
        }
      ),
      /***/
      "428f": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          module2.exports = global;
        }
      ),
      /***/
      "44ad": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var fails = __webpack_require__("d039");
          var classof = __webpack_require__("c6b6");
          var split = "".split;
          module2.exports = fails(function() {
            return !Object("z").propertyIsEnumerable(0);
          }) ? function(it) {
            return classof(it) == "String" ? split.call(it, "") : Object(it);
          } : Object;
        }
      ),
      /***/
      "44d2": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          var create = __webpack_require__("7c73");
          var definePropertyModule = __webpack_require__("9bf2");
          var UNSCOPABLES = wellKnownSymbol("unscopables");
          var ArrayPrototype = Array.prototype;
          if (ArrayPrototype[UNSCOPABLES] == void 0) {
            definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
              configurable: true,
              value: create(null)
            });
          }
          module2.exports = function(key) {
            ArrayPrototype[UNSCOPABLES][key] = true;
          };
        }
      ),
      /***/
      "44de": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          module2.exports = function(a, b) {
            var console2 = global.console;
            if (console2 && console2.error) {
              arguments.length === 1 ? console2.error(a) : console2.error(a, b);
            }
          };
        }
      ),
      /***/
      "44e7": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var isObject2 = __webpack_require__("861d");
          var classof = __webpack_require__("c6b6");
          var wellKnownSymbol = __webpack_require__("b622");
          var MATCH = wellKnownSymbol("match");
          module2.exports = function(it) {
            var isRegExp;
            return isObject2(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) == "RegExp");
          };
        }
      ),
      /***/
      "4840": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var aFunction = __webpack_require__("1c0b");
          var wellKnownSymbol = __webpack_require__("b622");
          var SPECIES = wellKnownSymbol("species");
          module2.exports = function(O, defaultConstructor) {
            var C = anObject(O).constructor;
            var S;
            return C === void 0 || (S = anObject(C)[SPECIES]) == void 0 ? defaultConstructor : aFunction(S);
          };
        }
      ),
      /***/
      "4930": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var fails = __webpack_require__("d039");
          module2.exports = !!Object.getOwnPropertySymbols && !fails(function() {
            return !String(Symbol());
          });
        }
      ),
      /***/
      "499e": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          __webpack_require__.d(__webpack_exports__, "default", function() {
            return (
              /* binding */
              addStylesClient
            );
          });
          function listToStyles(parentId, list) {
            var styles = [];
            var newStyles = {};
            for (var i = 0; i < list.length; i++) {
              var item = list[i];
              var id = item[0];
              var css = item[1];
              var media = item[2];
              var sourceMap = item[3];
              var part = {
                id: parentId + ":" + i,
                css,
                media,
                sourceMap
              };
              if (!newStyles[id]) {
                styles.push(newStyles[id] = { id, parts: [part] });
              } else {
                newStyles[id].parts.push(part);
              }
            }
            return styles;
          }
          var hasDocument = typeof document !== "undefined";
          if (typeof DEBUG !== "undefined" && DEBUG) {
            if (!hasDocument) {
              throw new Error(
                "vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
              );
            }
          }
          var stylesInDom = {
            /*
              [id: number]: {
                id: number,
                refs: number,
                parts: Array<(obj?: StyleObjectPart) => void>
              }
            */
          };
          var head = hasDocument && (document.head || document.getElementsByTagName("head")[0]);
          var singletonElement = null;
          var singletonCounter = 0;
          var isProduction = false;
          var noop = function() {
          };
          var options = null;
          var ssrIdKey = "data-vue-ssr-id";
          var isOldIE = typeof navigator !== "undefined" && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
          function addStylesClient(parentId, list, _isProduction, _options) {
            isProduction = _isProduction;
            options = _options || {};
            var styles = listToStyles(parentId, list);
            addStylesToDom(styles);
            return function update(newList) {
              var mayRemove = [];
              for (var i = 0; i < styles.length; i++) {
                var item = styles[i];
                var domStyle = stylesInDom[item.id];
                domStyle.refs--;
                mayRemove.push(domStyle);
              }
              if (newList) {
                styles = listToStyles(parentId, newList);
                addStylesToDom(styles);
              } else {
                styles = [];
              }
              for (var i = 0; i < mayRemove.length; i++) {
                var domStyle = mayRemove[i];
                if (domStyle.refs === 0) {
                  for (var j = 0; j < domStyle.parts.length; j++) {
                    domStyle.parts[j]();
                  }
                  delete stylesInDom[domStyle.id];
                }
              }
            };
          }
          function addStylesToDom(styles) {
            for (var i = 0; i < styles.length; i++) {
              var item = styles[i];
              var domStyle = stylesInDom[item.id];
              if (domStyle) {
                domStyle.refs++;
                for (var j = 0; j < domStyle.parts.length; j++) {
                  domStyle.parts[j](item.parts[j]);
                }
                for (; j < item.parts.length; j++) {
                  domStyle.parts.push(addStyle(item.parts[j]));
                }
                if (domStyle.parts.length > item.parts.length) {
                  domStyle.parts.length = item.parts.length;
                }
              } else {
                var parts = [];
                for (var j = 0; j < item.parts.length; j++) {
                  parts.push(addStyle(item.parts[j]));
                }
                stylesInDom[item.id] = { id: item.id, refs: 1, parts };
              }
            }
          }
          function createStyleElement() {
            var styleElement = document.createElement("style");
            styleElement.type = "text/css";
            head.appendChild(styleElement);
            return styleElement;
          }
          function addStyle(obj) {
            var update, remove;
            var styleElement = document.querySelector("style[" + ssrIdKey + '~="' + obj.id + '"]');
            if (styleElement) {
              if (isProduction) {
                return noop;
              } else {
                styleElement.parentNode.removeChild(styleElement);
              }
            }
            if (isOldIE) {
              var styleIndex = singletonCounter++;
              styleElement = singletonElement || (singletonElement = createStyleElement());
              update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
              remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
            } else {
              styleElement = createStyleElement();
              update = applyToTag.bind(null, styleElement);
              remove = function() {
                styleElement.parentNode.removeChild(styleElement);
              };
            }
            update(obj);
            return function updateStyle(newObj) {
              if (newObj) {
                if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
                  return;
                }
                update(obj = newObj);
              } else {
                remove();
              }
            };
          }
          var replaceText = function() {
            var textStore = [];
            return function(index, replacement) {
              textStore[index] = replacement;
              return textStore.filter(Boolean).join("\n");
            };
          }();
          function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (styleElement.styleSheet) {
              styleElement.styleSheet.cssText = replaceText(index, css);
            } else {
              var cssNode = document.createTextNode(css);
              var childNodes = styleElement.childNodes;
              if (childNodes[index])
                styleElement.removeChild(childNodes[index]);
              if (childNodes.length) {
                styleElement.insertBefore(cssNode, childNodes[index]);
              } else {
                styleElement.appendChild(cssNode);
              }
            }
          }
          function applyToTag(styleElement, obj) {
            var css = obj.css;
            var media = obj.media;
            var sourceMap = obj.sourceMap;
            if (media) {
              styleElement.setAttribute("media", media);
            }
            if (options.ssrId) {
              styleElement.setAttribute(ssrIdKey, obj.id);
            }
            if (sourceMap) {
              css += "\n/*# sourceURL=" + sourceMap.sources[0] + " */";
              css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
            }
            if (styleElement.styleSheet) {
              styleElement.styleSheet.cssText = css;
            } else {
              while (styleElement.firstChild) {
                styleElement.removeChild(styleElement.firstChild);
              }
              styleElement.appendChild(document.createTextNode(css));
            }
          }
        }
      ),
      /***/
      "4ae1": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var getBuiltIn = __webpack_require__("d066");
          var aFunction = __webpack_require__("1c0b");
          var anObject = __webpack_require__("825a");
          var isObject2 = __webpack_require__("861d");
          var create = __webpack_require__("7c73");
          var bind = __webpack_require__("0538");
          var fails = __webpack_require__("d039");
          var nativeConstruct = getBuiltIn("Reflect", "construct");
          var NEW_TARGET_BUG = fails(function() {
            function F() {
            }
            return !(nativeConstruct(function() {
            }, [], F) instanceof F);
          });
          var ARGS_BUG = !fails(function() {
            nativeConstruct(function() {
            });
          });
          var FORCED = NEW_TARGET_BUG || ARGS_BUG;
          $({ target: "Reflect", stat: true, forced: FORCED, sham: FORCED }, {
            construct: function construct(Target, args) {
              aFunction(Target);
              anObject(args);
              var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
              if (ARGS_BUG && !NEW_TARGET_BUG)
                return nativeConstruct(Target, args, newTarget);
              if (Target == newTarget) {
                switch (args.length) {
                  case 0:
                    return new Target();
                  case 1:
                    return new Target(args[0]);
                  case 2:
                    return new Target(args[0], args[1]);
                  case 3:
                    return new Target(args[0], args[1], args[2]);
                  case 4:
                    return new Target(args[0], args[1], args[2], args[3]);
                }
                var $args = [null];
                $args.push.apply($args, args);
                return new (bind.apply(Target, $args))();
              }
              var proto = newTarget.prototype;
              var instance = create(isObject2(proto) ? proto : Object.prototype);
              var result = Function.apply.call(Target, instance, args);
              return isObject2(result) ? result : instance;
            }
          });
        }
      ),
      /***/
      "4d64": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var toIndexedObject = __webpack_require__("fc6a");
          var toLength = __webpack_require__("50c4");
          var toAbsoluteIndex = __webpack_require__("23cb");
          var createMethod = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
              var O = toIndexedObject($this);
              var length = toLength(O.length);
              var index = toAbsoluteIndex(fromIndex, length);
              var value;
              if (IS_INCLUDES && el != el)
                while (length > index) {
                  value = O[index++];
                  if (value != value)
                    return true;
                }
              else
                for (; length > index; index++) {
                  if ((IS_INCLUDES || index in O) && O[index] === el)
                    return IS_INCLUDES || index || 0;
                }
              return !IS_INCLUDES && -1;
            };
          };
          module2.exports = {
            // `Array.prototype.includes` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.includes
            includes: createMethod(true),
            // `Array.prototype.indexOf` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
            indexOf: createMethod(false)
          };
        }
      ),
      /***/
      "4de4": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var $filter = __webpack_require__("b727").filter;
          var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
          var USES_TO_LENGTH = arrayMethodUsesToLength("filter");
          $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
            filter: function filter(callbackfn) {
              return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        }
      ),
      /***/
      "4df4": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var bind = __webpack_require__("0366");
          var toObject = __webpack_require__("7b0b");
          var callWithSafeIterationClosing = __webpack_require__("9bdd");
          var isArrayIteratorMethod = __webpack_require__("e95a");
          var toLength = __webpack_require__("50c4");
          var createProperty = __webpack_require__("8418");
          var getIteratorMethod = __webpack_require__("35a1");
          module2.exports = function from(arrayLike) {
            var O = toObject(arrayLike);
            var C = typeof this == "function" ? this : Array;
            var argumentsLength = arguments.length;
            var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
            var mapping = mapfn !== void 0;
            var iteratorMethod = getIteratorMethod(O);
            var index = 0;
            var length, result, step, iterator, next, value;
            if (mapping)
              mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
            if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
              iterator = iteratorMethod.call(O);
              next = iterator.next;
              result = new C();
              for (; !(step = next.call(iterator)).done; index++) {
                value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
                createProperty(result, index, value);
              }
            } else {
              length = toLength(O.length);
              result = new C(length);
              for (; length > index; index++) {
                value = mapping ? mapfn(O[index], index) : O[index];
                createProperty(result, index, value);
              }
            }
            result.length = index;
            return result;
          };
        }
      ),
      /***/
      "4ec9": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var collection = __webpack_require__("6d61");
          var collectionStrong = __webpack_require__("6566");
          module2.exports = collection("Map", function(init) {
            return function Map2() {
              return init(this, arguments.length ? arguments[0] : void 0);
            };
          }, collectionStrong);
        }
      ),
      /***/
      "50c4": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var toInteger = __webpack_require__("a691");
          var min = Math.min;
          module2.exports = function(argument) {
            return argument > 0 ? min(toInteger(argument), 9007199254740991) : 0;
          };
        }
      ),
      /***/
      "5135": (
        /***/
        function(module2, exports2) {
          var hasOwnProperty = {}.hasOwnProperty;
          module2.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
          };
        }
      ),
      /***/
      "5692": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var IS_PURE = __webpack_require__("c430");
          var store = __webpack_require__("c6cd");
          (module2.exports = function(key, value) {
            return store[key] || (store[key] = value !== void 0 ? value : {});
          })("versions", []).push({
            version: "3.6.5",
            mode: IS_PURE ? "pure" : "global",
            copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
          });
        }
      ),
      /***/
      "56ef": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var getBuiltIn = __webpack_require__("d066");
          var getOwnPropertyNamesModule = __webpack_require__("241c");
          var getOwnPropertySymbolsModule = __webpack_require__("7418");
          var anObject = __webpack_require__("825a");
          module2.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
            var keys = getOwnPropertyNamesModule.f(anObject(it));
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
          };
        }
      ),
      /***/
      "5951": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          "use strict";
          var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_QrStream_vue_vue_type_style_index_0_id_f73a6250_lang_css_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5d33");
          var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_QrStream_vue_vue_type_style_index_0_id_f73a6250_lang_css_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_QrStream_vue_vue_type_style_index_0_id_f73a6250_lang_css_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
        }
      ),
      /***/
      "5a34": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var isRegExp = __webpack_require__("44e7");
          module2.exports = function(it) {
            if (isRegExp(it)) {
              throw TypeError("The method doesn't accept regular expressions");
            }
            return it;
          };
        }
      ),
      /***/
      "5c6c": (
        /***/
        function(module2, exports2) {
          module2.exports = function(bitmap, value) {
            return {
              enumerable: !(bitmap & 1),
              configurable: !(bitmap & 2),
              writable: !(bitmap & 4),
              value
            };
          };
        }
      ),
      /***/
      "5d33": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var content = __webpack_require__("d4af");
          if (typeof content === "string")
            content = [[module2.i, content, ""]];
          if (content.locals)
            module2.exports = content.locals;
          var add = __webpack_require__("499e").default;
          var update = add("cba8d424", content, true, { "sourceMap": false, "shadowMode": false });
        }
      ),
      /***/
      "5fb2": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var maxInt = 2147483647;
          var base = 36;
          var tMin = 1;
          var tMax = 26;
          var skew = 38;
          var damp = 700;
          var initialBias = 72;
          var initialN = 128;
          var delimiter = "-";
          var regexNonASCII = /[^\0-\u007E]/;
          var regexSeparators = /[.\u3002\uFF0E\uFF61]/g;
          var OVERFLOW_ERROR = "Overflow: input needs wider integers to process";
          var baseMinusTMin = base - tMin;
          var floor = Math.floor;
          var stringFromCharCode = String.fromCharCode;
          var ucs2decode = function(string) {
            var output = [];
            var counter = 0;
            var length = string.length;
            while (counter < length) {
              var value = string.charCodeAt(counter++);
              if (value >= 55296 && value <= 56319 && counter < length) {
                var extra = string.charCodeAt(counter++);
                if ((extra & 64512) == 56320) {
                  output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                } else {
                  output.push(value);
                  counter--;
                }
              } else {
                output.push(value);
              }
            }
            return output;
          };
          var digitToBasic = function(digit) {
            return digit + 22 + 75 * (digit < 26);
          };
          var adapt = function(delta, numPoints, firstTime) {
            var k = 0;
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            for (; delta > baseMinusTMin * tMax >> 1; k += base) {
              delta = floor(delta / baseMinusTMin);
            }
            return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
          };
          var encode = function(input) {
            var output = [];
            input = ucs2decode(input);
            var inputLength = input.length;
            var n = initialN;
            var delta = 0;
            var bias = initialBias;
            var i, currentValue;
            for (i = 0; i < input.length; i++) {
              currentValue = input[i];
              if (currentValue < 128) {
                output.push(stringFromCharCode(currentValue));
              }
            }
            var basicLength = output.length;
            var handledCPCount = basicLength;
            if (basicLength) {
              output.push(delimiter);
            }
            while (handledCPCount < inputLength) {
              var m = maxInt;
              for (i = 0; i < input.length; i++) {
                currentValue = input[i];
                if (currentValue >= n && currentValue < m) {
                  m = currentValue;
                }
              }
              var handledCPCountPlusOne = handledCPCount + 1;
              if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                throw RangeError(OVERFLOW_ERROR);
              }
              delta += (m - n) * handledCPCountPlusOne;
              n = m;
              for (i = 0; i < input.length; i++) {
                currentValue = input[i];
                if (currentValue < n && ++delta > maxInt) {
                  throw RangeError(OVERFLOW_ERROR);
                }
                if (currentValue == n) {
                  var q = delta;
                  for (var k = base; ; k += base) {
                    var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                    if (q < t)
                      break;
                    var qMinusT = q - t;
                    var baseMinusT = base - t;
                    output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
                    q = floor(qMinusT / baseMinusT);
                  }
                  output.push(stringFromCharCode(digitToBasic(q)));
                  bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                  delta = 0;
                  ++handledCPCount;
                }
              }
              ++delta;
              ++n;
            }
            return output.join("");
          };
          module2.exports = function(input) {
            var encoded = [];
            var labels = input.toLowerCase().replace(regexSeparators, ".").split(".");
            var i, label;
            for (i = 0; i < labels.length; i++) {
              label = labels[i];
              encoded.push(regexNonASCII.test(label) ? "xn--" + encode(label) : label);
            }
            return encoded.join(".");
          };
        }
      ),
      /***/
      "60da": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var DESCRIPTORS = __webpack_require__("83ab");
          var fails = __webpack_require__("d039");
          var objectKeys = __webpack_require__("df75");
          var getOwnPropertySymbolsModule = __webpack_require__("7418");
          var propertyIsEnumerableModule = __webpack_require__("d1e7");
          var toObject = __webpack_require__("7b0b");
          var IndexedObject = __webpack_require__("44ad");
          var nativeAssign = Object.assign;
          var defineProperty = Object.defineProperty;
          module2.exports = !nativeAssign || fails(function() {
            if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, "a", {
              enumerable: true,
              get: function() {
                defineProperty(this, "b", {
                  value: 3,
                  enumerable: false
                });
              }
            }), { b: 2 })).b !== 1)
              return true;
            var A = {};
            var B = {};
            var symbol = Symbol();
            var alphabet = "abcdefghijklmnopqrst";
            A[symbol] = 7;
            alphabet.split("").forEach(function(chr) {
              B[chr] = chr;
            });
            return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join("") != alphabet;
          }) ? function assign(target, source) {
            var T = toObject(target);
            var argumentsLength = arguments.length;
            var index = 1;
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            var propertyIsEnumerable = propertyIsEnumerableModule.f;
            while (argumentsLength > index) {
              var S = IndexedObject(arguments[index++]);
              var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
              var length = keys.length;
              var j = 0;
              var key;
              while (length > j) {
                key = keys[j++];
                if (!DESCRIPTORS || propertyIsEnumerable.call(S, key))
                  T[key] = S[key];
              }
            }
            return T;
          } : nativeAssign;
        }
      ),
      /***/
      "6547": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var toInteger = __webpack_require__("a691");
          var requireObjectCoercible = __webpack_require__("1d80");
          var createMethod = function(CONVERT_TO_STRING) {
            return function($this, pos) {
              var S = String(requireObjectCoercible($this));
              var position = toInteger(pos);
              var size = S.length;
              var first, second;
              if (position < 0 || position >= size)
                return CONVERT_TO_STRING ? "" : void 0;
              first = S.charCodeAt(position);
              return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
            };
          };
          module2.exports = {
            // `String.prototype.codePointAt` method
            // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
            codeAt: createMethod(false),
            // `String.prototype.at` method
            // https://github.com/mathiasbynens/String.prototype.at
            charAt: createMethod(true)
          };
        }
      ),
      /***/
      "6566": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var defineProperty = __webpack_require__("9bf2").f;
          var create = __webpack_require__("7c73");
          var redefineAll = __webpack_require__("e2cc");
          var bind = __webpack_require__("0366");
          var anInstance = __webpack_require__("19aa");
          var iterate = __webpack_require__("2266");
          var defineIterator = __webpack_require__("7dd0");
          var setSpecies = __webpack_require__("2626");
          var DESCRIPTORS = __webpack_require__("83ab");
          var fastKey = __webpack_require__("f183").fastKey;
          var InternalStateModule = __webpack_require__("69f3");
          var setInternalState = InternalStateModule.set;
          var internalStateGetterFor = InternalStateModule.getterFor;
          module2.exports = {
            getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
              var C = wrapper(function(that, iterable) {
                anInstance(that, C, CONSTRUCTOR_NAME);
                setInternalState(that, {
                  type: CONSTRUCTOR_NAME,
                  index: create(null),
                  first: void 0,
                  last: void 0,
                  size: 0
                });
                if (!DESCRIPTORS)
                  that.size = 0;
                if (iterable != void 0)
                  iterate(iterable, that[ADDER], that, IS_MAP);
              });
              var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
              var define = function(that, key, value) {
                var state = getInternalState(that);
                var entry = getEntry(that, key);
                var previous, index;
                if (entry) {
                  entry.value = value;
                } else {
                  state.last = entry = {
                    index: index = fastKey(key, true),
                    key,
                    value,
                    previous: previous = state.last,
                    next: void 0,
                    removed: false
                  };
                  if (!state.first)
                    state.first = entry;
                  if (previous)
                    previous.next = entry;
                  if (DESCRIPTORS)
                    state.size++;
                  else
                    that.size++;
                  if (index !== "F")
                    state.index[index] = entry;
                }
                return that;
              };
              var getEntry = function(that, key) {
                var state = getInternalState(that);
                var index = fastKey(key);
                var entry;
                if (index !== "F")
                  return state.index[index];
                for (entry = state.first; entry; entry = entry.next) {
                  if (entry.key == key)
                    return entry;
                }
              };
              redefineAll(C.prototype, {
                // 23.1.3.1 Map.prototype.clear()
                // 23.2.3.2 Set.prototype.clear()
                clear: function clear() {
                  var that = this;
                  var state = getInternalState(that);
                  var data = state.index;
                  var entry = state.first;
                  while (entry) {
                    entry.removed = true;
                    if (entry.previous)
                      entry.previous = entry.previous.next = void 0;
                    delete data[entry.index];
                    entry = entry.next;
                  }
                  state.first = state.last = void 0;
                  if (DESCRIPTORS)
                    state.size = 0;
                  else
                    that.size = 0;
                },
                // 23.1.3.3 Map.prototype.delete(key)
                // 23.2.3.4 Set.prototype.delete(value)
                "delete": function(key) {
                  var that = this;
                  var state = getInternalState(that);
                  var entry = getEntry(that, key);
                  if (entry) {
                    var next = entry.next;
                    var prev = entry.previous;
                    delete state.index[entry.index];
                    entry.removed = true;
                    if (prev)
                      prev.next = next;
                    if (next)
                      next.previous = prev;
                    if (state.first == entry)
                      state.first = next;
                    if (state.last == entry)
                      state.last = prev;
                    if (DESCRIPTORS)
                      state.size--;
                    else
                      that.size--;
                  }
                  return !!entry;
                },
                // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
                // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
                forEach: function forEach(callbackfn) {
                  var state = getInternalState(this);
                  var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0, 3);
                  var entry;
                  while (entry = entry ? entry.next : state.first) {
                    boundFunction(entry.value, entry.key, this);
                    while (entry && entry.removed)
                      entry = entry.previous;
                  }
                },
                // 23.1.3.7 Map.prototype.has(key)
                // 23.2.3.7 Set.prototype.has(value)
                has: function has(key) {
                  return !!getEntry(this, key);
                }
              });
              redefineAll(C.prototype, IS_MAP ? {
                // 23.1.3.6 Map.prototype.get(key)
                get: function get(key) {
                  var entry = getEntry(this, key);
                  return entry && entry.value;
                },
                // 23.1.3.9 Map.prototype.set(key, value)
                set: function set(key, value) {
                  return define(this, key === 0 ? 0 : key, value);
                }
              } : {
                // 23.2.3.1 Set.prototype.add(value)
                add: function add(value) {
                  return define(this, value = value === 0 ? 0 : value, value);
                }
              });
              if (DESCRIPTORS)
                defineProperty(C.prototype, "size", {
                  get: function() {
                    return getInternalState(this).size;
                  }
                });
              return C;
            },
            setStrong: function(C, CONSTRUCTOR_NAME, IS_MAP) {
              var ITERATOR_NAME = CONSTRUCTOR_NAME + " Iterator";
              var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
              var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
              defineIterator(C, CONSTRUCTOR_NAME, function(iterated, kind) {
                setInternalState(this, {
                  type: ITERATOR_NAME,
                  target: iterated,
                  state: getInternalCollectionState(iterated),
                  kind,
                  last: void 0
                });
              }, function() {
                var state = getInternalIteratorState(this);
                var kind = state.kind;
                var entry = state.last;
                while (entry && entry.removed)
                  entry = entry.previous;
                if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
                  state.target = void 0;
                  return { value: void 0, done: true };
                }
                if (kind == "keys")
                  return { value: entry.key, done: false };
                if (kind == "values")
                  return { value: entry.value, done: false };
                return { value: [entry.key, entry.value], done: false };
              }, IS_MAP ? "entries" : "values", !IS_MAP, true);
              setSpecies(CONSTRUCTOR_NAME);
            }
          };
        }
      ),
      /***/
      "65f0": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var isObject2 = __webpack_require__("861d");
          var isArray2 = __webpack_require__("e8b5");
          var wellKnownSymbol = __webpack_require__("b622");
          var SPECIES = wellKnownSymbol("species");
          module2.exports = function(originalArray, length) {
            var C;
            if (isArray2(originalArray)) {
              C = originalArray.constructor;
              if (typeof C == "function" && (C === Array || isArray2(C.prototype)))
                C = void 0;
              else if (isObject2(C)) {
                C = C[SPECIES];
                if (C === null)
                  C = void 0;
              }
            }
            return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
          };
        }
      ),
      /***/
      "69f3": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
          var global = __webpack_require__("da84");
          var isObject2 = __webpack_require__("861d");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var objectHas = __webpack_require__("5135");
          var sharedKey = __webpack_require__("f772");
          var hiddenKeys = __webpack_require__("d012");
          var WeakMap2 = global.WeakMap;
          var set, get, has;
          var enforce = function(it) {
            return has(it) ? get(it) : set(it, {});
          };
          var getterFor = function(TYPE) {
            return function(it) {
              var state;
              if (!isObject2(it) || (state = get(it)).type !== TYPE) {
                throw TypeError("Incompatible receiver, " + TYPE + " required");
              }
              return state;
            };
          };
          if (NATIVE_WEAK_MAP) {
            var store = new WeakMap2();
            var wmget = store.get;
            var wmhas = store.has;
            var wmset = store.set;
            set = function(it, metadata) {
              wmset.call(store, it, metadata);
              return metadata;
            };
            get = function(it) {
              return wmget.call(store, it) || {};
            };
            has = function(it) {
              return wmhas.call(store, it);
            };
          } else {
            var STATE = sharedKey("state");
            hiddenKeys[STATE] = true;
            set = function(it, metadata) {
              createNonEnumerableProperty(it, STATE, metadata);
              return metadata;
            };
            get = function(it) {
              return objectHas(it, STATE) ? it[STATE] : {};
            };
            has = function(it) {
              return objectHas(it, STATE);
            };
          }
          module2.exports = {
            set,
            get,
            has,
            enforce,
            getterFor
          };
        }
      ),
      /***/
      "6d61": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var global = __webpack_require__("da84");
          var isForced = __webpack_require__("94ca");
          var redefine = __webpack_require__("6eeb");
          var InternalMetadataModule = __webpack_require__("f183");
          var iterate = __webpack_require__("2266");
          var anInstance = __webpack_require__("19aa");
          var isObject2 = __webpack_require__("861d");
          var fails = __webpack_require__("d039");
          var checkCorrectnessOfIteration = __webpack_require__("1c7e");
          var setToStringTag = __webpack_require__("d44e");
          var inheritIfRequired = __webpack_require__("7156");
          module2.exports = function(CONSTRUCTOR_NAME, wrapper, common) {
            var IS_MAP = CONSTRUCTOR_NAME.indexOf("Map") !== -1;
            var IS_WEAK = CONSTRUCTOR_NAME.indexOf("Weak") !== -1;
            var ADDER = IS_MAP ? "set" : "add";
            var NativeConstructor = global[CONSTRUCTOR_NAME];
            var NativePrototype = NativeConstructor && NativeConstructor.prototype;
            var Constructor = NativeConstructor;
            var exported = {};
            var fixMethod = function(KEY) {
              var nativeMethod = NativePrototype[KEY];
              redefine(
                NativePrototype,
                KEY,
                KEY == "add" ? function add(value) {
                  nativeMethod.call(this, value === 0 ? 0 : value);
                  return this;
                } : KEY == "delete" ? function(key) {
                  return IS_WEAK && !isObject2(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
                } : KEY == "get" ? function get(key) {
                  return IS_WEAK && !isObject2(key) ? void 0 : nativeMethod.call(this, key === 0 ? 0 : key);
                } : KEY == "has" ? function has(key) {
                  return IS_WEAK && !isObject2(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
                } : function set(key, value) {
                  nativeMethod.call(this, key === 0 ? 0 : key, value);
                  return this;
                }
              );
            };
            if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != "function" || !(IS_WEAK || NativePrototype.forEach && !fails(function() {
              new NativeConstructor().entries().next();
            })))) {
              Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
              InternalMetadataModule.REQUIRED = true;
            } else if (isForced(CONSTRUCTOR_NAME, true)) {
              var instance = new Constructor();
              var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
              var THROWS_ON_PRIMITIVES = fails(function() {
                instance.has(1);
              });
              var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function(iterable) {
                new NativeConstructor(iterable);
              });
              var BUGGY_ZERO = !IS_WEAK && fails(function() {
                var $instance = new NativeConstructor();
                var index = 5;
                while (index--)
                  $instance[ADDER](index, index);
                return !$instance.has(-0);
              });
              if (!ACCEPT_ITERABLES) {
                Constructor = wrapper(function(dummy, iterable) {
                  anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
                  var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
                  if (iterable != void 0)
                    iterate(iterable, that[ADDER], that, IS_MAP);
                  return that;
                });
                Constructor.prototype = NativePrototype;
                NativePrototype.constructor = Constructor;
              }
              if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
                fixMethod("delete");
                fixMethod("has");
                IS_MAP && fixMethod("get");
              }
              if (BUGGY_ZERO || HASNT_CHAINING)
                fixMethod(ADDER);
              if (IS_WEAK && NativePrototype.clear)
                delete NativePrototype.clear;
            }
            exported[CONSTRUCTOR_NAME] = Constructor;
            $({ global: true, forced: Constructor != NativeConstructor }, exported);
            setToStringTag(Constructor, CONSTRUCTOR_NAME);
            if (!IS_WEAK)
              common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
            return Constructor;
          };
        }
      ),
      /***/
      "6eeb": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var has = __webpack_require__("5135");
          var setGlobal = __webpack_require__("ce4e");
          var inspectSource = __webpack_require__("8925");
          var InternalStateModule = __webpack_require__("69f3");
          var getInternalState = InternalStateModule.get;
          var enforceInternalState = InternalStateModule.enforce;
          var TEMPLATE = String(String).split("String");
          (module2.exports = function(O, key, value, options) {
            var unsafe = options ? !!options.unsafe : false;
            var simple = options ? !!options.enumerable : false;
            var noTargetGet = options ? !!options.noTargetGet : false;
            if (typeof value == "function") {
              if (typeof key == "string" && !has(value, "name"))
                createNonEnumerableProperty(value, "name", key);
              enforceInternalState(value).source = TEMPLATE.join(typeof key == "string" ? key : "");
            }
            if (O === global) {
              if (simple)
                O[key] = value;
              else
                setGlobal(key, value);
              return;
            } else if (!unsafe) {
              delete O[key];
            } else if (!noTargetGet && O[key]) {
              simple = true;
            }
            if (simple)
              O[key] = value;
            else
              createNonEnumerableProperty(O, key, value);
          })(Function.prototype, "toString", function toString() {
            return typeof this == "function" && getInternalState(this).source || inspectSource(this);
          });
        }
      ),
      /***/
      "7156": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var isObject2 = __webpack_require__("861d");
          var setPrototypeOf = __webpack_require__("d2bb");
          module2.exports = function($this, dummy, Wrapper) {
            var NewTarget, NewTargetPrototype;
            if (
              // it can work only with native `setPrototypeOf`
              setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
              typeof (NewTarget = dummy.constructor) == "function" && NewTarget !== Wrapper && isObject2(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype
            )
              setPrototypeOf($this, NewTargetPrototype);
            return $this;
          };
        }
      ),
      /***/
      "7418": (
        /***/
        function(module2, exports2) {
          exports2.f = Object.getOwnPropertySymbols;
        }
      ),
      /***/
      "746f": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var path = __webpack_require__("428f");
          var has = __webpack_require__("5135");
          var wrappedWellKnownSymbolModule = __webpack_require__("e538");
          var defineProperty = __webpack_require__("9bf2").f;
          module2.exports = function(NAME) {
            var Symbol2 = path.Symbol || (path.Symbol = {});
            if (!has(Symbol2, NAME))
              defineProperty(Symbol2, NAME, {
                value: wrappedWellKnownSymbolModule.f(NAME)
              });
          };
        }
      ),
      /***/
      "7839": (
        /***/
        function(module2, exports2) {
          module2.exports = [
            "constructor",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "toLocaleString",
            "toString",
            "valueOf"
          ];
        }
      ),
      /***/
      "7b0b": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var requireObjectCoercible = __webpack_require__("1d80");
          module2.exports = function(argument) {
            return Object(requireObjectCoercible(argument));
          };
        }
      ),
      /***/
      "7c73": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var defineProperties = __webpack_require__("37e8");
          var enumBugKeys = __webpack_require__("7839");
          var hiddenKeys = __webpack_require__("d012");
          var html = __webpack_require__("1be4");
          var documentCreateElement = __webpack_require__("cc12");
          var sharedKey = __webpack_require__("f772");
          var GT = ">";
          var LT = "<";
          var PROTOTYPE = "prototype";
          var SCRIPT = "script";
          var IE_PROTO = sharedKey("IE_PROTO");
          var EmptyConstructor = function() {
          };
          var scriptTag = function(content) {
            return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
          };
          var NullProtoObjectViaActiveX = function(activeXDocument2) {
            activeXDocument2.write(scriptTag(""));
            activeXDocument2.close();
            var temp = activeXDocument2.parentWindow.Object;
            activeXDocument2 = null;
            return temp;
          };
          var NullProtoObjectViaIFrame = function() {
            var iframe = documentCreateElement("iframe");
            var JS = "java" + SCRIPT + ":";
            var iframeDocument;
            iframe.style.display = "none";
            html.appendChild(iframe);
            iframe.src = String(JS);
            iframeDocument = iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(scriptTag("document.F=Object"));
            iframeDocument.close();
            return iframeDocument.F;
          };
          var activeXDocument;
          var NullProtoObject = function() {
            try {
              activeXDocument = document.domain && new ActiveXObject("htmlfile");
            } catch (error) {
            }
            NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
            var length = enumBugKeys.length;
            while (length--)
              delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
            return NullProtoObject();
          };
          hiddenKeys[IE_PROTO] = true;
          module2.exports = Object.create || function create(O, Properties) {
            var result;
            if (O !== null) {
              EmptyConstructor[PROTOTYPE] = anObject(O);
              result = new EmptyConstructor();
              EmptyConstructor[PROTOTYPE] = null;
              result[IE_PROTO] = O;
            } else
              result = NullProtoObject();
            return Properties === void 0 ? result : defineProperties(result, Properties);
          };
        }
      ),
      /***/
      "7dd0": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var createIteratorConstructor = __webpack_require__("9ed3");
          var getPrototypeOf = __webpack_require__("e163");
          var setPrototypeOf = __webpack_require__("d2bb");
          var setToStringTag = __webpack_require__("d44e");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var redefine = __webpack_require__("6eeb");
          var wellKnownSymbol = __webpack_require__("b622");
          var IS_PURE = __webpack_require__("c430");
          var Iterators = __webpack_require__("3f8c");
          var IteratorsCore = __webpack_require__("ae93");
          var IteratorPrototype = IteratorsCore.IteratorPrototype;
          var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
          var ITERATOR = wellKnownSymbol("iterator");
          var KEYS = "keys";
          var VALUES = "values";
          var ENTRIES = "entries";
          var returnThis = function() {
            return this;
          };
          module2.exports = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
            createIteratorConstructor(IteratorConstructor, NAME, next);
            var getIterationMethod = function(KIND) {
              if (KIND === DEFAULT && defaultIterator)
                return defaultIterator;
              if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
                return IterablePrototype[KIND];
              switch (KIND) {
                case KEYS:
                  return function keys() {
                    return new IteratorConstructor(this, KIND);
                  };
                case VALUES:
                  return function values() {
                    return new IteratorConstructor(this, KIND);
                  };
                case ENTRIES:
                  return function entries() {
                    return new IteratorConstructor(this, KIND);
                  };
              }
              return function() {
                return new IteratorConstructor(this);
              };
            };
            var TO_STRING_TAG = NAME + " Iterator";
            var INCORRECT_VALUES_NAME = false;
            var IterablePrototype = Iterable.prototype;
            var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
            var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
            var anyNativeIterator = NAME == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
            var CurrentIteratorPrototype, methods, KEY;
            if (anyNativeIterator) {
              CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
              if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
                if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                  if (setPrototypeOf) {
                    setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                  } else if (typeof CurrentIteratorPrototype[ITERATOR] != "function") {
                    createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
                  }
                }
                setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
                if (IS_PURE)
                  Iterators[TO_STRING_TAG] = returnThis;
              }
            }
            if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
              INCORRECT_VALUES_NAME = true;
              defaultIterator = function values() {
                return nativeIterator.call(this);
              };
            }
            if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
              createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
            }
            Iterators[NAME] = defaultIterator;
            if (DEFAULT) {
              methods = {
                values: getIterationMethod(VALUES),
                keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                entries: getIterationMethod(ENTRIES)
              };
              if (FORCED)
                for (KEY in methods) {
                  if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                    redefine(IterablePrototype, KEY, methods[KEY]);
                  }
                }
              else
                $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
            }
            return methods;
          };
        }
      ),
      /***/
      "7f9a": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var inspectSource = __webpack_require__("8925");
          var WeakMap2 = global.WeakMap;
          module2.exports = typeof WeakMap2 === "function" && /native code/.test(inspectSource(WeakMap2));
        }
      ),
      /***/
      "825a": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var isObject2 = __webpack_require__("861d");
          module2.exports = function(it) {
            if (!isObject2(it)) {
              throw TypeError(String(it) + " is not an object");
            }
            return it;
          };
        }
      ),
      /***/
      "83ab": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var fails = __webpack_require__("d039");
          module2.exports = !fails(function() {
            return Object.defineProperty({}, 1, { get: function() {
              return 7;
            } })[1] != 7;
          });
        }
      ),
      /***/
      "8418": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var toPrimitive = __webpack_require__("c04e");
          var definePropertyModule = __webpack_require__("9bf2");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          module2.exports = function(object, key, value) {
            var propertyKey = toPrimitive(key);
            if (propertyKey in object)
              definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
            else
              object[propertyKey] = value;
          };
        }
      ),
      /***/
      "861d": (
        /***/
        function(module2, exports2) {
          module2.exports = function(it) {
            return typeof it === "object" ? it !== null : typeof it === "function";
          };
        }
      ),
      /***/
      "8875": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
          (function(root, factory) {
            if (true) {
              !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports2, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else {
            }
          })(typeof self !== "undefined" ? self : this, function() {
            function getCurrentScript() {
              var descriptor = Object.getOwnPropertyDescriptor(document, "currentScript");
              if (!descriptor && "currentScript" in document && document.currentScript) {
                return document.currentScript;
              }
              if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
                return document.currentScript;
              }
              try {
                throw new Error();
              } catch (err) {
                var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig, ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig, stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack), scriptLocation = stackDetails && stackDetails[1] || false, line = stackDetails && stackDetails[2] || false, currentLocation = document.location.href.replace(document.location.hash, ""), pageSource, inlineScriptSourceRegExp, inlineScriptSource, scripts = document.getElementsByTagName("script");
                if (scriptLocation === currentLocation) {
                  pageSource = document.documentElement.outerHTML;
                  inlineScriptSourceRegExp = new RegExp("(?:[^\\n]+?\\n){0," + (line - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i");
                  inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, "$1").trim();
                }
                for (var i = 0; i < scripts.length; i++) {
                  if (scripts[i].readyState === "interactive") {
                    return scripts[i];
                  }
                  if (scripts[i].src === scriptLocation) {
                    return scripts[i];
                  }
                  if (scriptLocation === currentLocation && scripts[i].innerHTML && scripts[i].innerHTML.trim() === inlineScriptSource) {
                    return scripts[i];
                  }
                }
                return null;
              }
            }
            ;
            return getCurrentScript;
          });
        }
      ),
      /***/
      "8925": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var store = __webpack_require__("c6cd");
          var functionToString = Function.toString;
          if (typeof store.inspectSource != "function") {
            store.inspectSource = function(it) {
              return functionToString.call(it);
            };
          }
          module2.exports = store.inspectSource;
        }
      ),
      /***/
      "8bbf": (
        /***/
        function(module2, exports2) {
          module2.exports = require_vue();
        }
      ),
      /***/
      "90e3": (
        /***/
        function(module2, exports2) {
          var id = 0;
          var postfix = Math.random();
          module2.exports = function(key) {
            return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
          };
        }
      ),
      /***/
      "9112": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var definePropertyModule = __webpack_require__("9bf2");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          module2.exports = DESCRIPTORS ? function(object, key, value) {
            return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
          } : function(object, key, value) {
            object[key] = value;
            return object;
          };
        }
      ),
      /***/
      "94ca": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var fails = __webpack_require__("d039");
          var replacement = /#|\.prototype\./;
          var isForced = function(feature, detection) {
            var value = data[normalize(feature)];
            return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails(detection) : !!detection;
          };
          var normalize = isForced.normalize = function(string) {
            return String(string).replace(replacement, ".").toLowerCase();
          };
          var data = isForced.data = {};
          var NATIVE = isForced.NATIVE = "N";
          var POLYFILL = isForced.POLYFILL = "P";
          module2.exports = isForced;
        }
      ),
      /***/
      "96cf": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var runtime = function(exports3) {
            "use strict";
            var Op = Object.prototype;
            var hasOwn = Op.hasOwnProperty;
            var undefined2;
            var $Symbol = typeof Symbol === "function" ? Symbol : {};
            var iteratorSymbol = $Symbol.iterator || "@@iterator";
            var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
            var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
            function define(obj, key, value) {
              Object.defineProperty(obj, key, {
                value,
                enumerable: true,
                configurable: true,
                writable: true
              });
              return obj[key];
            }
            try {
              define({}, "");
            } catch (err) {
              define = function(obj, key, value) {
                return obj[key] = value;
              };
            }
            function wrap(innerFn, outerFn, self2, tryLocsList) {
              var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
              var generator = Object.create(protoGenerator.prototype);
              var context = new Context(tryLocsList || []);
              generator._invoke = makeInvokeMethod(innerFn, self2, context);
              return generator;
            }
            exports3.wrap = wrap;
            function tryCatch(fn, obj, arg) {
              try {
                return { type: "normal", arg: fn.call(obj, arg) };
              } catch (err) {
                return { type: "throw", arg: err };
              }
            }
            var GenStateSuspendedStart = "suspendedStart";
            var GenStateSuspendedYield = "suspendedYield";
            var GenStateExecuting = "executing";
            var GenStateCompleted = "completed";
            var ContinueSentinel = {};
            function Generator() {
            }
            function GeneratorFunction() {
            }
            function GeneratorFunctionPrototype() {
            }
            var IteratorPrototype = {};
            IteratorPrototype[iteratorSymbol] = function() {
              return this;
            };
            var getProto = Object.getPrototypeOf;
            var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
            if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
              IteratorPrototype = NativeIteratorPrototype;
            }
            var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
            GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
            GeneratorFunctionPrototype.constructor = GeneratorFunction;
            GeneratorFunction.displayName = define(
              GeneratorFunctionPrototype,
              toStringTagSymbol,
              "GeneratorFunction"
            );
            function defineIteratorMethods(prototype) {
              ["next", "throw", "return"].forEach(function(method) {
                define(prototype, method, function(arg) {
                  return this._invoke(method, arg);
                });
              });
            }
            exports3.isGeneratorFunction = function(genFun) {
              var ctor = typeof genFun === "function" && genFun.constructor;
              return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
              // do is to check its .name property.
              (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
            };
            exports3.mark = function(genFun) {
              if (Object.setPrototypeOf) {
                Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
              } else {
                genFun.__proto__ = GeneratorFunctionPrototype;
                define(genFun, toStringTagSymbol, "GeneratorFunction");
              }
              genFun.prototype = Object.create(Gp);
              return genFun;
            };
            exports3.awrap = function(arg) {
              return { __await: arg };
            };
            function AsyncIterator(generator, PromiseImpl) {
              function invoke(method, arg, resolve, reject) {
                var record = tryCatch(generator[method], generator, arg);
                if (record.type === "throw") {
                  reject(record.arg);
                } else {
                  var result = record.arg;
                  var value = result.value;
                  if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
                    return PromiseImpl.resolve(value.__await).then(function(value2) {
                      invoke("next", value2, resolve, reject);
                    }, function(err) {
                      invoke("throw", err, resolve, reject);
                    });
                  }
                  return PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped;
                    resolve(result);
                  }, function(error) {
                    return invoke("throw", error, resolve, reject);
                  });
                }
              }
              var previousPromise;
              function enqueue(method, arg) {
                function callInvokeWithMethodAndArg() {
                  return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                  });
                }
                return previousPromise = // If enqueue has been called before, then we want to wait until
                // all previous Promises have been resolved before calling invoke,
                // so that results are always delivered in the correct order. If
                // enqueue has not been called before, then it is important to
                // call invoke immediately, without waiting on a callback to fire,
                // so that the async generator function has the opportunity to do
                // any necessary setup in a predictable way. This predictability
                // is why the Promise constructor synchronously invokes its
                // executor callback, and why async functions synchronously
                // execute code before the first await. Since we implement simple
                // async functions in terms of async generators, it is especially
                // important to get this right, even though it requires care.
                previousPromise ? previousPromise.then(
                  callInvokeWithMethodAndArg,
                  // Avoid propagating failures to Promises returned by later
                  // invocations of the iterator.
                  callInvokeWithMethodAndArg
                ) : callInvokeWithMethodAndArg();
              }
              this._invoke = enqueue;
            }
            defineIteratorMethods(AsyncIterator.prototype);
            AsyncIterator.prototype[asyncIteratorSymbol] = function() {
              return this;
            };
            exports3.AsyncIterator = AsyncIterator;
            exports3.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
              if (PromiseImpl === void 0)
                PromiseImpl = Promise;
              var iter = new AsyncIterator(
                wrap(innerFn, outerFn, self2, tryLocsList),
                PromiseImpl
              );
              return exports3.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
                return result.done ? result.value : iter.next();
              });
            };
            function makeInvokeMethod(innerFn, self2, context) {
              var state = GenStateSuspendedStart;
              return function invoke(method, arg) {
                if (state === GenStateExecuting) {
                  throw new Error("Generator is already running");
                }
                if (state === GenStateCompleted) {
                  if (method === "throw") {
                    throw arg;
                  }
                  return doneResult();
                }
                context.method = method;
                context.arg = arg;
                while (true) {
                  var delegate = context.delegate;
                  if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                      if (delegateResult === ContinueSentinel)
                        continue;
                      return delegateResult;
                    }
                  }
                  if (context.method === "next") {
                    context.sent = context._sent = context.arg;
                  } else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                      state = GenStateCompleted;
                      throw context.arg;
                    }
                    context.dispatchException(context.arg);
                  } else if (context.method === "return") {
                    context.abrupt("return", context.arg);
                  }
                  state = GenStateExecuting;
                  var record = tryCatch(innerFn, self2, context);
                  if (record.type === "normal") {
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) {
                      continue;
                    }
                    return {
                      value: record.arg,
                      done: context.done
                    };
                  } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    context.method = "throw";
                    context.arg = record.arg;
                  }
                }
              };
            }
            function maybeInvokeDelegate(delegate, context) {
              var method = delegate.iterator[context.method];
              if (method === undefined2) {
                context.delegate = null;
                if (context.method === "throw") {
                  if (delegate.iterator["return"]) {
                    context.method = "return";
                    context.arg = undefined2;
                    maybeInvokeDelegate(delegate, context);
                    if (context.method === "throw") {
                      return ContinueSentinel;
                    }
                  }
                  context.method = "throw";
                  context.arg = new TypeError(
                    "The iterator does not provide a 'throw' method"
                  );
                }
                return ContinueSentinel;
              }
              var record = tryCatch(method, delegate.iterator, context.arg);
              if (record.type === "throw") {
                context.method = "throw";
                context.arg = record.arg;
                context.delegate = null;
                return ContinueSentinel;
              }
              var info = record.arg;
              if (!info) {
                context.method = "throw";
                context.arg = new TypeError("iterator result is not an object");
                context.delegate = null;
                return ContinueSentinel;
              }
              if (info.done) {
                context[delegate.resultName] = info.value;
                context.next = delegate.nextLoc;
                if (context.method !== "return") {
                  context.method = "next";
                  context.arg = undefined2;
                }
              } else {
                return info;
              }
              context.delegate = null;
              return ContinueSentinel;
            }
            defineIteratorMethods(Gp);
            define(Gp, toStringTagSymbol, "Generator");
            Gp[iteratorSymbol] = function() {
              return this;
            };
            Gp.toString = function() {
              return "[object Generator]";
            };
            function pushTryEntry(locs) {
              var entry = { tryLoc: locs[0] };
              if (1 in locs) {
                entry.catchLoc = locs[1];
              }
              if (2 in locs) {
                entry.finallyLoc = locs[2];
                entry.afterLoc = locs[3];
              }
              this.tryEntries.push(entry);
            }
            function resetTryEntry(entry) {
              var record = entry.completion || {};
              record.type = "normal";
              delete record.arg;
              entry.completion = record;
            }
            function Context(tryLocsList) {
              this.tryEntries = [{ tryLoc: "root" }];
              tryLocsList.forEach(pushTryEntry, this);
              this.reset(true);
            }
            exports3.keys = function(object) {
              var keys = [];
              for (var key in object) {
                keys.push(key);
              }
              keys.reverse();
              return function next() {
                while (keys.length) {
                  var key2 = keys.pop();
                  if (key2 in object) {
                    next.value = key2;
                    next.done = false;
                    return next;
                  }
                }
                next.done = true;
                return next;
              };
            };
            function values(iterable) {
              if (iterable) {
                var iteratorMethod = iterable[iteratorSymbol];
                if (iteratorMethod) {
                  return iteratorMethod.call(iterable);
                }
                if (typeof iterable.next === "function") {
                  return iterable;
                }
                if (!isNaN(iterable.length)) {
                  var i = -1, next = function next2() {
                    while (++i < iterable.length) {
                      if (hasOwn.call(iterable, i)) {
                        next2.value = iterable[i];
                        next2.done = false;
                        return next2;
                      }
                    }
                    next2.value = undefined2;
                    next2.done = true;
                    return next2;
                  };
                  return next.next = next;
                }
              }
              return { next: doneResult };
            }
            exports3.values = values;
            function doneResult() {
              return { value: undefined2, done: true };
            }
            Context.prototype = {
              constructor: Context,
              reset: function(skipTempReset) {
                this.prev = 0;
                this.next = 0;
                this.sent = this._sent = undefined2;
                this.done = false;
                this.delegate = null;
                this.method = "next";
                this.arg = undefined2;
                this.tryEntries.forEach(resetTryEntry);
                if (!skipTempReset) {
                  for (var name in this) {
                    if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                      this[name] = undefined2;
                    }
                  }
                }
              },
              stop: function() {
                this.done = true;
                var rootEntry = this.tryEntries[0];
                var rootRecord = rootEntry.completion;
                if (rootRecord.type === "throw") {
                  throw rootRecord.arg;
                }
                return this.rval;
              },
              dispatchException: function(exception) {
                if (this.done) {
                  throw exception;
                }
                var context = this;
                function handle(loc, caught) {
                  record.type = "throw";
                  record.arg = exception;
                  context.next = loc;
                  if (caught) {
                    context.method = "next";
                    context.arg = undefined2;
                  }
                  return !!caught;
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  var record = entry.completion;
                  if (entry.tryLoc === "root") {
                    return handle("end");
                  }
                  if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                      if (this.prev < entry.catchLoc) {
                        return handle(entry.catchLoc, true);
                      } else if (this.prev < entry.finallyLoc) {
                        return handle(entry.finallyLoc);
                      }
                    } else if (hasCatch) {
                      if (this.prev < entry.catchLoc) {
                        return handle(entry.catchLoc, true);
                      }
                    } else if (hasFinally) {
                      if (this.prev < entry.finallyLoc) {
                        return handle(entry.finallyLoc);
                      }
                    } else {
                      throw new Error("try statement without catch or finally");
                    }
                  }
                }
              },
              abrupt: function(type, arg) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                  }
                }
                if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
                  finallyEntry = null;
                }
                var record = finallyEntry ? finallyEntry.completion : {};
                record.type = type;
                record.arg = arg;
                if (finallyEntry) {
                  this.method = "next";
                  this.next = finallyEntry.finallyLoc;
                  return ContinueSentinel;
                }
                return this.complete(record);
              },
              complete: function(record, afterLoc) {
                if (record.type === "throw") {
                  throw record.arg;
                }
                if (record.type === "break" || record.type === "continue") {
                  this.next = record.arg;
                } else if (record.type === "return") {
                  this.rval = this.arg = record.arg;
                  this.method = "return";
                  this.next = "end";
                } else if (record.type === "normal" && afterLoc) {
                  this.next = afterLoc;
                }
                return ContinueSentinel;
              },
              finish: function(finallyLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                  }
                }
              },
              "catch": function(tryLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                      var thrown = record.arg;
                      resetTryEntry(entry);
                    }
                    return thrown;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function(iterable, resultName, nextLoc) {
                this.delegate = {
                  iterator: values(iterable),
                  resultName,
                  nextLoc
                };
                if (this.method === "next") {
                  this.arg = undefined2;
                }
                return ContinueSentinel;
              }
            };
            return exports3;
          }(
            // If this script is executing as a CommonJS module, use module.exports
            // as the regeneratorRuntime namespace. Otherwise create a new empty
            // object. Either way, the resulting object will be used to initialize
            // the regeneratorRuntime variable at the top of this file.
            true ? module2.exports : void 0
          );
          try {
            regeneratorRuntime = runtime;
          } catch (accidentalStrictMode) {
            Function("r", "regeneratorRuntime = r")(runtime);
          }
        }
      ),
      /***/
      "9861": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          __webpack_require__("e260");
          var $ = __webpack_require__("23e7");
          var getBuiltIn = __webpack_require__("d066");
          var USE_NATIVE_URL = __webpack_require__("0d3b");
          var redefine = __webpack_require__("6eeb");
          var redefineAll = __webpack_require__("e2cc");
          var setToStringTag = __webpack_require__("d44e");
          var createIteratorConstructor = __webpack_require__("9ed3");
          var InternalStateModule = __webpack_require__("69f3");
          var anInstance = __webpack_require__("19aa");
          var hasOwn = __webpack_require__("5135");
          var bind = __webpack_require__("0366");
          var classof = __webpack_require__("f5df");
          var anObject = __webpack_require__("825a");
          var isObject2 = __webpack_require__("861d");
          var create = __webpack_require__("7c73");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          var getIterator = __webpack_require__("9a1f");
          var getIteratorMethod = __webpack_require__("35a1");
          var wellKnownSymbol = __webpack_require__("b622");
          var $fetch = getBuiltIn("fetch");
          var Headers = getBuiltIn("Headers");
          var ITERATOR = wellKnownSymbol("iterator");
          var URL_SEARCH_PARAMS = "URLSearchParams";
          var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + "Iterator";
          var setInternalState = InternalStateModule.set;
          var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
          var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
          var plus = /\+/g;
          var sequences = Array(4);
          var percentSequence = function(bytes) {
            return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp("((?:%[\\da-f]{2}){" + bytes + "})", "gi"));
          };
          var percentDecode = function(sequence) {
            try {
              return decodeURIComponent(sequence);
            } catch (error) {
              return sequence;
            }
          };
          var deserialize = function(it) {
            var result = it.replace(plus, " ");
            var bytes = 4;
            try {
              return decodeURIComponent(result);
            } catch (error) {
              while (bytes) {
                result = result.replace(percentSequence(bytes--), percentDecode);
              }
              return result;
            }
          };
          var find = /[!'()~]|%20/g;
          var replace = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+"
          };
          var replacer = function(match) {
            return replace[match];
          };
          var serialize = function(it) {
            return encodeURIComponent(it).replace(find, replacer);
          };
          var parseSearchParams = function(result, query) {
            if (query) {
              var attributes = query.split("&");
              var index = 0;
              var attribute, entry;
              while (index < attributes.length) {
                attribute = attributes[index++];
                if (attribute.length) {
                  entry = attribute.split("=");
                  result.push({
                    key: deserialize(entry.shift()),
                    value: deserialize(entry.join("="))
                  });
                }
              }
            }
          };
          var updateSearchParams = function(query) {
            this.entries.length = 0;
            parseSearchParams(this.entries, query);
          };
          var validateArgumentsLength = function(passed, required) {
            if (passed < required)
              throw TypeError("Not enough arguments");
          };
          var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
            setInternalState(this, {
              type: URL_SEARCH_PARAMS_ITERATOR,
              iterator: getIterator(getInternalParamsState(params).entries),
              kind
            });
          }, "Iterator", function next() {
            var state = getInternalIteratorState(this);
            var kind = state.kind;
            var step = state.iterator.next();
            var entry = step.value;
            if (!step.done) {
              step.value = kind === "keys" ? entry.key : kind === "values" ? entry.value : [entry.key, entry.value];
            }
            return step;
          });
          var URLSearchParamsConstructor = function URLSearchParams2() {
            anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
            var init = arguments.length > 0 ? arguments[0] : void 0;
            var that = this;
            var entries = [];
            var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;
            setInternalState(that, {
              type: URL_SEARCH_PARAMS,
              entries,
              updateURL: function() {
              },
              updateSearchParams
            });
            if (init !== void 0) {
              if (isObject2(init)) {
                iteratorMethod = getIteratorMethod(init);
                if (typeof iteratorMethod === "function") {
                  iterator = iteratorMethod.call(init);
                  next = iterator.next;
                  while (!(step = next.call(iterator)).done) {
                    entryIterator = getIterator(anObject(step.value));
                    entryNext = entryIterator.next;
                    if ((first = entryNext.call(entryIterator)).done || (second = entryNext.call(entryIterator)).done || !entryNext.call(entryIterator).done)
                      throw TypeError("Expected sequence with length 2");
                    entries.push({ key: first.value + "", value: second.value + "" });
                  }
                } else
                  for (key in init)
                    if (hasOwn(init, key))
                      entries.push({ key, value: init[key] + "" });
              } else {
                parseSearchParams(entries, typeof init === "string" ? init.charAt(0) === "?" ? init.slice(1) : init : init + "");
              }
            }
          };
          var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
          redefineAll(URLSearchParamsPrototype, {
            // `URLSearchParams.prototype.appent` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-append
            append: function append(name, value) {
              validateArgumentsLength(arguments.length, 2);
              var state = getInternalParamsState(this);
              state.entries.push({ key: name + "", value: value + "" });
              state.updateURL();
            },
            // `URLSearchParams.prototype.delete` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
            "delete": function(name) {
              validateArgumentsLength(arguments.length, 1);
              var state = getInternalParamsState(this);
              var entries = state.entries;
              var key = name + "";
              var index = 0;
              while (index < entries.length) {
                if (entries[index].key === key)
                  entries.splice(index, 1);
                else
                  index++;
              }
              state.updateURL();
            },
            // `URLSearchParams.prototype.get` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-get
            get: function get(name) {
              validateArgumentsLength(arguments.length, 1);
              var entries = getInternalParamsState(this).entries;
              var key = name + "";
              var index = 0;
              for (; index < entries.length; index++) {
                if (entries[index].key === key)
                  return entries[index].value;
              }
              return null;
            },
            // `URLSearchParams.prototype.getAll` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
            getAll: function getAll(name) {
              validateArgumentsLength(arguments.length, 1);
              var entries = getInternalParamsState(this).entries;
              var key = name + "";
              var result = [];
              var index = 0;
              for (; index < entries.length; index++) {
                if (entries[index].key === key)
                  result.push(entries[index].value);
              }
              return result;
            },
            // `URLSearchParams.prototype.has` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-has
            has: function has(name) {
              validateArgumentsLength(arguments.length, 1);
              var entries = getInternalParamsState(this).entries;
              var key = name + "";
              var index = 0;
              while (index < entries.length) {
                if (entries[index++].key === key)
                  return true;
              }
              return false;
            },
            // `URLSearchParams.prototype.set` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-set
            set: function set(name, value) {
              validateArgumentsLength(arguments.length, 1);
              var state = getInternalParamsState(this);
              var entries = state.entries;
              var found = false;
              var key = name + "";
              var val = value + "";
              var index = 0;
              var entry;
              for (; index < entries.length; index++) {
                entry = entries[index];
                if (entry.key === key) {
                  if (found)
                    entries.splice(index--, 1);
                  else {
                    found = true;
                    entry.value = val;
                  }
                }
              }
              if (!found)
                entries.push({ key, value: val });
              state.updateURL();
            },
            // `URLSearchParams.prototype.sort` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
            sort: function sort() {
              var state = getInternalParamsState(this);
              var entries = state.entries;
              var slice = entries.slice();
              var entry, entriesIndex, sliceIndex;
              entries.length = 0;
              for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
                entry = slice[sliceIndex];
                for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
                  if (entries[entriesIndex].key > entry.key) {
                    entries.splice(entriesIndex, 0, entry);
                    break;
                  }
                }
                if (entriesIndex === sliceIndex)
                  entries.push(entry);
              }
              state.updateURL();
            },
            // `URLSearchParams.prototype.forEach` method
            forEach: function forEach(callback) {
              var entries = getInternalParamsState(this).entries;
              var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : void 0, 3);
              var index = 0;
              var entry;
              while (index < entries.length) {
                entry = entries[index++];
                boundFunction(entry.value, entry.key, this);
              }
            },
            // `URLSearchParams.prototype.keys` method
            keys: function keys() {
              return new URLSearchParamsIterator(this, "keys");
            },
            // `URLSearchParams.prototype.values` method
            values: function values() {
              return new URLSearchParamsIterator(this, "values");
            },
            // `URLSearchParams.prototype.entries` method
            entries: function entries() {
              return new URLSearchParamsIterator(this, "entries");
            }
          }, { enumerable: true });
          redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);
          redefine(URLSearchParamsPrototype, "toString", function toString() {
            var entries = getInternalParamsState(this).entries;
            var result = [];
            var index = 0;
            var entry;
            while (index < entries.length) {
              entry = entries[index++];
              result.push(serialize(entry.key) + "=" + serialize(entry.value));
            }
            return result.join("&");
          }, { enumerable: true });
          setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
          $({ global: true, forced: !USE_NATIVE_URL }, {
            URLSearchParams: URLSearchParamsConstructor
          });
          if (!USE_NATIVE_URL && typeof $fetch == "function" && typeof Headers == "function") {
            $({ global: true, enumerable: true, forced: true }, {
              fetch: function fetch(input) {
                var args = [input];
                var init, body, headers;
                if (arguments.length > 1) {
                  init = arguments[1];
                  if (isObject2(init)) {
                    body = init.body;
                    if (classof(body) === URL_SEARCH_PARAMS) {
                      headers = init.headers ? new Headers(init.headers) : new Headers();
                      if (!headers.has("content-type")) {
                        headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                      }
                      init = create(init, {
                        body: createPropertyDescriptor(0, String(body)),
                        headers: createPropertyDescriptor(0, headers)
                      });
                    }
                  }
                  args.push(init);
                }
                return $fetch.apply(this, args);
              }
            });
          }
          module2.exports = {
            URLSearchParams: URLSearchParamsConstructor,
            getState: getInternalParamsState
          };
        }
      ),
      /***/
      "9a1f": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var getIteratorMethod = __webpack_require__("35a1");
          module2.exports = function(it) {
            var iteratorMethod = getIteratorMethod(it);
            if (typeof iteratorMethod != "function") {
              throw TypeError(String(it) + " is not iterable");
            }
            return anObject(iteratorMethod.call(it));
          };
        }
      ),
      /***/
      "9bdd": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          module2.exports = function(iterator, fn, value, ENTRIES) {
            try {
              return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
            } catch (error) {
              var returnMethod = iterator["return"];
              if (returnMethod !== void 0)
                anObject(returnMethod.call(iterator));
              throw error;
            }
          };
        }
      ),
      /***/
      "9bf2": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var IE8_DOM_DEFINE = __webpack_require__("0cfb");
          var anObject = __webpack_require__("825a");
          var toPrimitive = __webpack_require__("c04e");
          var nativeDefineProperty = Object.defineProperty;
          exports2.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPrimitive(P, true);
            anObject(Attributes);
            if (IE8_DOM_DEFINE)
              try {
                return nativeDefineProperty(O, P, Attributes);
              } catch (error) {
              }
            if ("get" in Attributes || "set" in Attributes)
              throw TypeError("Accessors not supported");
            if ("value" in Attributes)
              O[P] = Attributes.value;
            return O;
          };
        }
      ),
      /***/
      "9ed3": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
          var create = __webpack_require__("7c73");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          var setToStringTag = __webpack_require__("d44e");
          var Iterators = __webpack_require__("3f8c");
          var returnThis = function() {
            return this;
          };
          module2.exports = function(IteratorConstructor, NAME, next) {
            var TO_STRING_TAG = NAME + " Iterator";
            IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
            setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
            Iterators[TO_STRING_TAG] = returnThis;
            return IteratorConstructor;
          };
        }
      ),
      /***/
      "a4d3": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var global = __webpack_require__("da84");
          var getBuiltIn = __webpack_require__("d066");
          var IS_PURE = __webpack_require__("c430");
          var DESCRIPTORS = __webpack_require__("83ab");
          var NATIVE_SYMBOL = __webpack_require__("4930");
          var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
          var fails = __webpack_require__("d039");
          var has = __webpack_require__("5135");
          var isArray2 = __webpack_require__("e8b5");
          var isObject2 = __webpack_require__("861d");
          var anObject = __webpack_require__("825a");
          var toObject = __webpack_require__("7b0b");
          var toIndexedObject = __webpack_require__("fc6a");
          var toPrimitive = __webpack_require__("c04e");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          var nativeObjectCreate = __webpack_require__("7c73");
          var objectKeys = __webpack_require__("df75");
          var getOwnPropertyNamesModule = __webpack_require__("241c");
          var getOwnPropertyNamesExternal = __webpack_require__("057f");
          var getOwnPropertySymbolsModule = __webpack_require__("7418");
          var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
          var definePropertyModule = __webpack_require__("9bf2");
          var propertyIsEnumerableModule = __webpack_require__("d1e7");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var redefine = __webpack_require__("6eeb");
          var shared = __webpack_require__("5692");
          var sharedKey = __webpack_require__("f772");
          var hiddenKeys = __webpack_require__("d012");
          var uid = __webpack_require__("90e3");
          var wellKnownSymbol = __webpack_require__("b622");
          var wrappedWellKnownSymbolModule = __webpack_require__("e538");
          var defineWellKnownSymbol = __webpack_require__("746f");
          var setToStringTag = __webpack_require__("d44e");
          var InternalStateModule = __webpack_require__("69f3");
          var $forEach = __webpack_require__("b727").forEach;
          var HIDDEN = sharedKey("hidden");
          var SYMBOL = "Symbol";
          var PROTOTYPE = "prototype";
          var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
          var setInternalState = InternalStateModule.set;
          var getInternalState = InternalStateModule.getterFor(SYMBOL);
          var ObjectPrototype = Object[PROTOTYPE];
          var $Symbol = global.Symbol;
          var $stringify = getBuiltIn("JSON", "stringify");
          var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
          var nativeDefineProperty = definePropertyModule.f;
          var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
          var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
          var AllSymbols = shared("symbols");
          var ObjectPrototypeSymbols = shared("op-symbols");
          var StringToSymbolRegistry = shared("string-to-symbol-registry");
          var SymbolToStringRegistry = shared("symbol-to-string-registry");
          var WellKnownSymbolsStore = shared("wks");
          var QObject = global.QObject;
          var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
          var setSymbolDescriptor = DESCRIPTORS && fails(function() {
            return nativeObjectCreate(nativeDefineProperty({}, "a", {
              get: function() {
                return nativeDefineProperty(this, "a", { value: 7 }).a;
              }
            })).a != 7;
          }) ? function(O, P, Attributes) {
            var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
            if (ObjectPrototypeDescriptor)
              delete ObjectPrototype[P];
            nativeDefineProperty(O, P, Attributes);
            if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
              nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
            }
          } : nativeDefineProperty;
          var wrap = function(tag, description) {
            var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
            setInternalState(symbol, {
              type: SYMBOL,
              tag,
              description
            });
            if (!DESCRIPTORS)
              symbol.description = description;
            return symbol;
          };
          var isSymbol2 = USE_SYMBOL_AS_UID ? function(it) {
            return typeof it == "symbol";
          } : function(it) {
            return Object(it) instanceof $Symbol;
          };
          var $defineProperty = function defineProperty(O, P, Attributes) {
            if (O === ObjectPrototype)
              $defineProperty(ObjectPrototypeSymbols, P, Attributes);
            anObject(O);
            var key = toPrimitive(P, true);
            anObject(Attributes);
            if (has(AllSymbols, key)) {
              if (!Attributes.enumerable) {
                if (!has(O, HIDDEN))
                  nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
                O[HIDDEN][key] = true;
              } else {
                if (has(O, HIDDEN) && O[HIDDEN][key])
                  O[HIDDEN][key] = false;
                Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
              }
              return setSymbolDescriptor(O, key, Attributes);
            }
            return nativeDefineProperty(O, key, Attributes);
          };
          var $defineProperties = function defineProperties(O, Properties) {
            anObject(O);
            var properties = toIndexedObject(Properties);
            var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
            $forEach(keys, function(key) {
              if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key))
                $defineProperty(O, key, properties[key]);
            });
            return O;
          };
          var $create = function create(O, Properties) {
            return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
          };
          var $propertyIsEnumerable = function propertyIsEnumerable(V) {
            var P = toPrimitive(V, true);
            var enumerable = nativePropertyIsEnumerable.call(this, P);
            if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P))
              return false;
            return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
          };
          var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
            var it = toIndexedObject(O);
            var key = toPrimitive(P, true);
            if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key))
              return;
            var descriptor = nativeGetOwnPropertyDescriptor(it, key);
            if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
              descriptor.enumerable = true;
            }
            return descriptor;
          };
          var $getOwnPropertyNames = function getOwnPropertyNames(O) {
            var names = nativeGetOwnPropertyNames(toIndexedObject(O));
            var result = [];
            $forEach(names, function(key) {
              if (!has(AllSymbols, key) && !has(hiddenKeys, key))
                result.push(key);
            });
            return result;
          };
          var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
            var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
            var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
            var result = [];
            $forEach(names, function(key) {
              if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
                result.push(AllSymbols[key]);
              }
            });
            return result;
          };
          if (!NATIVE_SYMBOL) {
            $Symbol = function Symbol2() {
              if (this instanceof $Symbol)
                throw TypeError("Symbol is not a constructor");
              var description = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]);
              var tag = uid(description);
              var setter = function(value) {
                if (this === ObjectPrototype)
                  setter.call(ObjectPrototypeSymbols, value);
                if (has(this, HIDDEN) && has(this[HIDDEN], tag))
                  this[HIDDEN][tag] = false;
                setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
              };
              if (DESCRIPTORS && USE_SETTER)
                setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
              return wrap(tag, description);
            };
            redefine($Symbol[PROTOTYPE], "toString", function toString() {
              return getInternalState(this).tag;
            });
            redefine($Symbol, "withoutSetter", function(description) {
              return wrap(uid(description), description);
            });
            propertyIsEnumerableModule.f = $propertyIsEnumerable;
            definePropertyModule.f = $defineProperty;
            getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
            getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
            getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
            wrappedWellKnownSymbolModule.f = function(name) {
              return wrap(wellKnownSymbol(name), name);
            };
            if (DESCRIPTORS) {
              nativeDefineProperty($Symbol[PROTOTYPE], "description", {
                configurable: true,
                get: function description() {
                  return getInternalState(this).description;
                }
              });
              if (!IS_PURE) {
                redefine(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
              }
            }
          }
          $({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
            Symbol: $Symbol
          });
          $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
            defineWellKnownSymbol(name);
          });
          $({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
            // `Symbol.for` method
            // https://tc39.github.io/ecma262/#sec-symbol.for
            "for": function(key) {
              var string = String(key);
              if (has(StringToSymbolRegistry, string))
                return StringToSymbolRegistry[string];
              var symbol = $Symbol(string);
              StringToSymbolRegistry[string] = symbol;
              SymbolToStringRegistry[symbol] = string;
              return symbol;
            },
            // `Symbol.keyFor` method
            // https://tc39.github.io/ecma262/#sec-symbol.keyfor
            keyFor: function keyFor(sym) {
              if (!isSymbol2(sym))
                throw TypeError(sym + " is not a symbol");
              if (has(SymbolToStringRegistry, sym))
                return SymbolToStringRegistry[sym];
            },
            useSetter: function() {
              USE_SETTER = true;
            },
            useSimple: function() {
              USE_SETTER = false;
            }
          });
          $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
            // `Object.create` method
            // https://tc39.github.io/ecma262/#sec-object.create
            create: $create,
            // `Object.defineProperty` method
            // https://tc39.github.io/ecma262/#sec-object.defineproperty
            defineProperty: $defineProperty,
            // `Object.defineProperties` method
            // https://tc39.github.io/ecma262/#sec-object.defineproperties
            defineProperties: $defineProperties,
            // `Object.getOwnPropertyDescriptor` method
            // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor
          });
          $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
            // `Object.getOwnPropertyNames` method
            // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
            getOwnPropertyNames: $getOwnPropertyNames,
            // `Object.getOwnPropertySymbols` method
            // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
            getOwnPropertySymbols: $getOwnPropertySymbols
          });
          $({ target: "Object", stat: true, forced: fails(function() {
            getOwnPropertySymbolsModule.f(1);
          }) }, {
            getOwnPropertySymbols: function getOwnPropertySymbols(it) {
              return getOwnPropertySymbolsModule.f(toObject(it));
            }
          });
          if ($stringify) {
            var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function() {
              var symbol = $Symbol();
              return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
            });
            $({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
              // eslint-disable-next-line no-unused-vars
              stringify: function stringify(it, replacer, space) {
                var args = [it];
                var index = 1;
                var $replacer;
                while (arguments.length > index)
                  args.push(arguments[index++]);
                $replacer = replacer;
                if (!isObject2(replacer) && it === void 0 || isSymbol2(it))
                  return;
                if (!isArray2(replacer))
                  replacer = function(key, value) {
                    if (typeof $replacer == "function")
                      value = $replacer.call(this, key, value);
                    if (!isSymbol2(value))
                      return value;
                  };
                args[1] = replacer;
                return $stringify.apply(null, args);
              }
            });
          }
          if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
            createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
          }
          setToStringTag($Symbol, SYMBOL);
          hiddenKeys[HIDDEN] = true;
        }
      ),
      /***/
      "a630": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var from = __webpack_require__("4df4");
          var checkCorrectnessOfIteration = __webpack_require__("1c7e");
          var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
            Array.from(iterable);
          });
          $({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
            from
          });
        }
      ),
      /***/
      "a640": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var fails = __webpack_require__("d039");
          module2.exports = function(METHOD_NAME, argument) {
            var method = [][METHOD_NAME];
            return !!method && fails(function() {
              method.call(null, argument || function() {
                throw 1;
              }, 1);
            });
          };
        }
      ),
      /***/
      "a691": (
        /***/
        function(module2, exports2) {
          var ceil = Math.ceil;
          var floor = Math.floor;
          module2.exports = function(argument) {
            return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
          };
        }
      ),
      /***/
      "a79d": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var IS_PURE = __webpack_require__("c430");
          var NativePromise = __webpack_require__("fea9");
          var fails = __webpack_require__("d039");
          var getBuiltIn = __webpack_require__("d066");
          var speciesConstructor = __webpack_require__("4840");
          var promiseResolve = __webpack_require__("cdf9");
          var redefine = __webpack_require__("6eeb");
          var NON_GENERIC = !!NativePromise && fails(function() {
            NativePromise.prototype["finally"].call({ then: function() {
            } }, function() {
            });
          });
          $({ target: "Promise", proto: true, real: true, forced: NON_GENERIC }, {
            "finally": function(onFinally) {
              var C = speciesConstructor(this, getBuiltIn("Promise"));
              var isFunction = typeof onFinally == "function";
              return this.then(
                isFunction ? function(x) {
                  return promiseResolve(C, onFinally()).then(function() {
                    return x;
                  });
                } : onFinally,
                isFunction ? function(e) {
                  return promiseResolve(C, onFinally()).then(function() {
                    throw e;
                  });
                } : onFinally
              );
            }
          });
          if (!IS_PURE && typeof NativePromise == "function" && !NativePromise.prototype["finally"]) {
            redefine(NativePromise.prototype, "finally", getBuiltIn("Promise").prototype["finally"]);
          }
        }
      ),
      /***/
      "ab13": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          var MATCH = wellKnownSymbol("match");
          module2.exports = function(METHOD_NAME) {
            var regexp = /./;
            try {
              "/./"[METHOD_NAME](regexp);
            } catch (e) {
              try {
                regexp[MATCH] = false;
                return "/./"[METHOD_NAME](regexp);
              } catch (f) {
              }
            }
            return false;
          };
        }
      ),
      /***/
      "ad6d": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var anObject = __webpack_require__("825a");
          module2.exports = function() {
            var that = anObject(this);
            var result = "";
            if (that.global)
              result += "g";
            if (that.ignoreCase)
              result += "i";
            if (that.multiline)
              result += "m";
            if (that.dotAll)
              result += "s";
            if (that.unicode)
              result += "u";
            if (that.sticky)
              result += "y";
            return result;
          };
        }
      ),
      /***/
      "ae40": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var fails = __webpack_require__("d039");
          var has = __webpack_require__("5135");
          var defineProperty = Object.defineProperty;
          var cache = {};
          var thrower = function(it) {
            throw it;
          };
          module2.exports = function(METHOD_NAME, options) {
            if (has(cache, METHOD_NAME))
              return cache[METHOD_NAME];
            if (!options)
              options = {};
            var method = [][METHOD_NAME];
            var ACCESSORS = has(options, "ACCESSORS") ? options.ACCESSORS : false;
            var argument0 = has(options, 0) ? options[0] : thrower;
            var argument1 = has(options, 1) ? options[1] : void 0;
            return cache[METHOD_NAME] = !!method && !fails(function() {
              if (ACCESSORS && !DESCRIPTORS)
                return true;
              var O = { length: -1 };
              if (ACCESSORS)
                defineProperty(O, 1, { enumerable: true, get: thrower });
              else
                O[1] = 1;
              method.call(O, argument0, argument1);
            });
          };
        }
      ),
      /***/
      "ae93": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var getPrototypeOf = __webpack_require__("e163");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var has = __webpack_require__("5135");
          var wellKnownSymbol = __webpack_require__("b622");
          var IS_PURE = __webpack_require__("c430");
          var ITERATOR = wellKnownSymbol("iterator");
          var BUGGY_SAFARI_ITERATORS = false;
          var returnThis = function() {
            return this;
          };
          var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
          if ([].keys) {
            arrayIterator = [].keys();
            if (!("next" in arrayIterator))
              BUGGY_SAFARI_ITERATORS = true;
            else {
              PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
              if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
                IteratorPrototype = PrototypeOfArrayIteratorPrototype;
            }
          }
          if (IteratorPrototype == void 0)
            IteratorPrototype = {};
          if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
            createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
          }
          module2.exports = {
            IteratorPrototype,
            BUGGY_SAFARI_ITERATORS
          };
        }
      ),
      /***/
      "b041": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
          var classof = __webpack_require__("f5df");
          module2.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
            return "[object " + classof(this) + "]";
          };
        }
      ),
      /***/
      "b0c0": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var defineProperty = __webpack_require__("9bf2").f;
          var FunctionPrototype = Function.prototype;
          var FunctionPrototypeToString = FunctionPrototype.toString;
          var nameRE = /^\s*function ([^ (]*)/;
          var NAME = "name";
          if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
            defineProperty(FunctionPrototype, NAME, {
              configurable: true,
              get: function() {
                try {
                  return FunctionPrototypeToString.call(this).match(nameRE)[1];
                } catch (error) {
                  return "";
                }
              }
            });
          }
        }
      ),
      /***/
      "b575": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
          var classof = __webpack_require__("c6b6");
          var macrotask = __webpack_require__("2cf4").set;
          var IS_IOS = __webpack_require__("1cdc");
          var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
          var process2 = global.process;
          var Promise2 = global.Promise;
          var IS_NODE = classof(process2) == "process";
          var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, "queueMicrotask");
          var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
          var flush, head, last2, notify, toggle, node, promise, then;
          if (!queueMicrotask) {
            flush = function() {
              var parent, fn;
              if (IS_NODE && (parent = process2.domain))
                parent.exit();
              while (head) {
                fn = head.fn;
                head = head.next;
                try {
                  fn();
                } catch (error) {
                  if (head)
                    notify();
                  else
                    last2 = void 0;
                  throw error;
                }
              }
              last2 = void 0;
              if (parent)
                parent.enter();
            };
            if (IS_NODE) {
              notify = function() {
                process2.nextTick(flush);
              };
            } else if (MutationObserver && !IS_IOS) {
              toggle = true;
              node = document.createTextNode("");
              new MutationObserver(flush).observe(node, { characterData: true });
              notify = function() {
                node.data = toggle = !toggle;
              };
            } else if (Promise2 && Promise2.resolve) {
              promise = Promise2.resolve(void 0);
              then = promise.then;
              notify = function() {
                then.call(promise, flush);
              };
            } else {
              notify = function() {
                macrotask.call(global, flush);
              };
            }
          }
          module2.exports = queueMicrotask || function(fn) {
            var task = { fn, next: void 0 };
            if (last2)
              last2.next = task;
            if (!head) {
              head = task;
              notify();
            }
            last2 = task;
          };
        }
      ),
      /***/
      "b622": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var shared = __webpack_require__("5692");
          var has = __webpack_require__("5135");
          var uid = __webpack_require__("90e3");
          var NATIVE_SYMBOL = __webpack_require__("4930");
          var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
          var WellKnownSymbolsStore = shared("wks");
          var Symbol2 = global.Symbol;
          var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
          module2.exports = function(name) {
            if (!has(WellKnownSymbolsStore, name)) {
              if (NATIVE_SYMBOL && has(Symbol2, name))
                WellKnownSymbolsStore[name] = Symbol2[name];
              else
                WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
            }
            return WellKnownSymbolsStore[name];
          };
        }
      ),
      /***/
      "b64b": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var toObject = __webpack_require__("7b0b");
          var nativeKeys = __webpack_require__("df75");
          var fails = __webpack_require__("d039");
          var FAILS_ON_PRIMITIVES = fails(function() {
            nativeKeys(1);
          });
          $({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
            keys: function keys(it) {
              return nativeKeys(toObject(it));
            }
          });
        }
      ),
      /***/
      "b727": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var bind = __webpack_require__("0366");
          var IndexedObject = __webpack_require__("44ad");
          var toObject = __webpack_require__("7b0b");
          var toLength = __webpack_require__("50c4");
          var arraySpeciesCreate = __webpack_require__("65f0");
          var push = [].push;
          var createMethod = function(TYPE) {
            var IS_MAP = TYPE == 1;
            var IS_FILTER = TYPE == 2;
            var IS_SOME = TYPE == 3;
            var IS_EVERY = TYPE == 4;
            var IS_FIND_INDEX = TYPE == 6;
            var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
            return function($this, callbackfn, that, specificCreate) {
              var O = toObject($this);
              var self2 = IndexedObject(O);
              var boundFunction = bind(callbackfn, that, 3);
              var length = toLength(self2.length);
              var index = 0;
              var create = specificCreate || arraySpeciesCreate;
              var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : void 0;
              var value, result;
              for (; length > index; index++)
                if (NO_HOLES || index in self2) {
                  value = self2[index];
                  result = boundFunction(value, index, O);
                  if (TYPE) {
                    if (IS_MAP)
                      target[index] = result;
                    else if (result)
                      switch (TYPE) {
                        case 3:
                          return true;
                        case 5:
                          return value;
                        case 6:
                          return index;
                        case 2:
                          push.call(target, value);
                      }
                    else if (IS_EVERY)
                      return false;
                  }
                }
              return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
            };
          };
          module2.exports = {
            // `Array.prototype.forEach` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
            forEach: createMethod(0),
            // `Array.prototype.map` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.map
            map: createMethod(1),
            // `Array.prototype.filter` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.filter
            filter: createMethod(2),
            // `Array.prototype.some` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.some
            some: createMethod(3),
            // `Array.prototype.every` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.every
            every: createMethod(4),
            // `Array.prototype.find` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.find
            find: createMethod(5),
            // `Array.prototype.findIndex` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
            findIndex: createMethod(6)
          };
        }
      ),
      /***/
      "bb2f": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var fails = __webpack_require__("d039");
          module2.exports = !fails(function() {
            return Object.isExtensible(Object.preventExtensions({}));
          });
        }
      ),
      /***/
      "c04e": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var isObject2 = __webpack_require__("861d");
          module2.exports = function(input, PREFERRED_STRING) {
            if (!isObject2(input))
              return input;
            var fn, val;
            if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input)))
              return val;
            if (typeof (fn = input.valueOf) == "function" && !isObject2(val = fn.call(input)))
              return val;
            if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input)))
              return val;
            throw TypeError("Can't convert object to primitive value");
          };
        }
      ),
      /***/
      "c430": (
        /***/
        function(module2, exports2) {
          module2.exports = false;
        }
      ),
      /***/
      "c6b6": (
        /***/
        function(module2, exports2) {
          var toString = {}.toString;
          module2.exports = function(it) {
            return toString.call(it).slice(8, -1);
          };
        }
      ),
      /***/
      "c6cd": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var setGlobal = __webpack_require__("ce4e");
          var SHARED = "__core-js_shared__";
          var store = global[SHARED] || setGlobal(SHARED, {});
          module2.exports = store;
        }
      ),
      /***/
      "c8ba": (
        /***/
        function(module2, exports2) {
          var g;
          g = function() {
            return this;
          }();
          try {
            g = g || new Function("return this")();
          } catch (e) {
            if (typeof window === "object")
              g = window;
          }
          module2.exports = g;
        }
      ),
      /***/
      "c975": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var $indexOf = __webpack_require__("4d64").indexOf;
          var arrayMethodIsStrict = __webpack_require__("a640");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var nativeIndexOf = [].indexOf;
          var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
          var STRICT_METHOD = arrayMethodIsStrict("indexOf");
          var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
          $({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
            indexOf: function indexOf(searchElement) {
              return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        }
      ),
      /***/
      "ca84": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var has = __webpack_require__("5135");
          var toIndexedObject = __webpack_require__("fc6a");
          var indexOf = __webpack_require__("4d64").indexOf;
          var hiddenKeys = __webpack_require__("d012");
          module2.exports = function(object, names) {
            var O = toIndexedObject(object);
            var i = 0;
            var result = [];
            var key;
            for (key in O)
              !has(hiddenKeys, key) && has(O, key) && result.push(key);
            while (names.length > i)
              if (has(O, key = names[i++])) {
                ~indexOf(result, key) || result.push(key);
              }
            return result;
          };
        }
      ),
      /***/
      "caad": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var $includes = __webpack_require__("4d64").includes;
          var addToUnscopables = __webpack_require__("44d2");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
          $({ target: "Array", proto: true, forced: !USES_TO_LENGTH }, {
            includes: function includes(el) {
              return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
          addToUnscopables("includes");
        }
      ),
      /***/
      "cc12": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var isObject2 = __webpack_require__("861d");
          var document2 = global.document;
          var EXISTS = isObject2(document2) && isObject2(document2.createElement);
          module2.exports = function(it) {
            return EXISTS ? document2.createElement(it) : {};
          };
        }
      ),
      /***/
      "cdf9": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var isObject2 = __webpack_require__("861d");
          var newPromiseCapability = __webpack_require__("f069");
          module2.exports = function(C, x) {
            anObject(C);
            if (isObject2(x) && x.constructor === C)
              return x;
            var promiseCapability = newPromiseCapability.f(C);
            var resolve = promiseCapability.resolve;
            resolve(x);
            return promiseCapability.promise;
          };
        }
      ),
      /***/
      "ce4e": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var createNonEnumerableProperty = __webpack_require__("9112");
          module2.exports = function(key, value) {
            try {
              createNonEnumerableProperty(global, key, value);
            } catch (error) {
              global[key] = value;
            }
            return value;
          };
        }
      ),
      /***/
      "d012": (
        /***/
        function(module2, exports2) {
          module2.exports = {};
        }
      ),
      /***/
      "d039": (
        /***/
        function(module2, exports2) {
          module2.exports = function(exec) {
            try {
              return !!exec();
            } catch (error) {
              return true;
            }
          };
        }
      ),
      /***/
      "d066": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var path = __webpack_require__("428f");
          var global = __webpack_require__("da84");
          var aFunction = function(variable) {
            return typeof variable == "function" ? variable : void 0;
          };
          module2.exports = function(namespace, method) {
            return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
          };
        }
      ),
      /***/
      "d1e7": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
          var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
          var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
          exports2.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
            var descriptor = getOwnPropertyDescriptor(this, V);
            return !!descriptor && descriptor.enumerable;
          } : nativePropertyIsEnumerable;
        }
      ),
      /***/
      "d28b": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var defineWellKnownSymbol = __webpack_require__("746f");
          defineWellKnownSymbol("iterator");
        }
      ),
      /***/
      "d2bb": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var aPossiblePrototype = __webpack_require__("3bbe");
          module2.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
            var CORRECT_SETTER = false;
            var test = {};
            var setter;
            try {
              setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
              setter.call(test, []);
              CORRECT_SETTER = test instanceof Array;
            } catch (error) {
            }
            return function setPrototypeOf(O, proto) {
              anObject(O);
              aPossiblePrototype(proto);
              if (CORRECT_SETTER)
                setter.call(O, proto);
              else
                O.__proto__ = proto;
              return O;
            };
          }() : void 0);
        }
      ),
      /***/
      "d3b7": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
          var redefine = __webpack_require__("6eeb");
          var toString = __webpack_require__("b041");
          if (!TO_STRING_TAG_SUPPORT) {
            redefine(Object.prototype, "toString", toString, { unsafe: true });
          }
        }
      ),
      /***/
      "d44e": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var defineProperty = __webpack_require__("9bf2").f;
          var has = __webpack_require__("5135");
          var wellKnownSymbol = __webpack_require__("b622");
          var TO_STRING_TAG = wellKnownSymbol("toStringTag");
          module2.exports = function(it, TAG, STATIC) {
            if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
              defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
            }
          };
        }
      ),
      /***/
      "d4af": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
          exports2 = ___CSS_LOADER_API_IMPORT___(false);
          exports2.push([module2.i, ".qr-stream-wrapper[data-v-f73a6250]{width:100%;height:100%;position:relative;z-index:0}.qr-stream-overlay[data-v-f73a6250]{width:100%;height:100%;position:absolute;top:0;left:0}.qr-stream-camera[data-v-f73a6250]{width:100%;height:100%;display:block;-o-object-fit:cover;object-fit:cover}", ""]);
          module2.exports = exports2;
        }
      ),
      /***/
      "d81d": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var $map = __webpack_require__("b727").map;
          var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("map");
          var USES_TO_LENGTH = arrayMethodUsesToLength("map");
          $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
            map: function map(callbackfn) {
              return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        }
      ),
      /***/
      "da84": (
        /***/
        function(module2, exports2, __webpack_require__) {
          (function(global) {
            var check = function(it) {
              return it && it.Math == Math && it;
            };
            module2.exports = // eslint-disable-next-line no-undef
            check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global == "object" && global) || // eslint-disable-next-line no-new-func
            Function("return this")();
          }).call(this, __webpack_require__("c8ba"));
        }
      ),
      /***/
      "dbb4": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var DESCRIPTORS = __webpack_require__("83ab");
          var ownKeys = __webpack_require__("56ef");
          var toIndexedObject = __webpack_require__("fc6a");
          var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
          var createProperty = __webpack_require__("8418");
          $({ target: "Object", stat: true, sham: !DESCRIPTORS }, {
            getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
              var O = toIndexedObject(object);
              var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
              var keys = ownKeys(O);
              var result = {};
              var index = 0;
              var key, descriptor;
              while (keys.length > index) {
                descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
                if (descriptor !== void 0)
                  createProperty(result, key, descriptor);
              }
              return result;
            }
          });
        }
      ),
      /***/
      "ddb0": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          var DOMIterables = __webpack_require__("fdbc");
          var ArrayIteratorMethods = __webpack_require__("e260");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var wellKnownSymbol = __webpack_require__("b622");
          var ITERATOR = wellKnownSymbol("iterator");
          var TO_STRING_TAG = wellKnownSymbol("toStringTag");
          var ArrayValues = ArrayIteratorMethods.values;
          for (var COLLECTION_NAME in DOMIterables) {
            var Collection = global[COLLECTION_NAME];
            var CollectionPrototype = Collection && Collection.prototype;
            if (CollectionPrototype) {
              if (CollectionPrototype[ITERATOR] !== ArrayValues)
                try {
                  createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
                } catch (error) {
                  CollectionPrototype[ITERATOR] = ArrayValues;
                }
              if (!CollectionPrototype[TO_STRING_TAG]) {
                createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
              }
              if (DOMIterables[COLLECTION_NAME])
                for (var METHOD_NAME in ArrayIteratorMethods) {
                  if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
                    try {
                      createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
                    } catch (error) {
                      CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
                    }
                }
            }
          }
        }
      ),
      /***/
      "df75": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var internalObjectKeys = __webpack_require__("ca84");
          var enumBugKeys = __webpack_require__("7839");
          module2.exports = Object.keys || function keys(O) {
            return internalObjectKeys(O, enumBugKeys);
          };
        }
      ),
      /***/
      "e01a": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var DESCRIPTORS = __webpack_require__("83ab");
          var global = __webpack_require__("da84");
          var has = __webpack_require__("5135");
          var isObject2 = __webpack_require__("861d");
          var defineProperty = __webpack_require__("9bf2").f;
          var copyConstructorProperties = __webpack_require__("e893");
          var NativeSymbol = global.Symbol;
          if (DESCRIPTORS && typeof NativeSymbol == "function" && (!("description" in NativeSymbol.prototype) || // Safari 12 bug
          NativeSymbol().description !== void 0)) {
            var EmptyStringDescriptionStore = {};
            var SymbolWrapper = function Symbol2() {
              var description = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]);
              var result = this instanceof SymbolWrapper ? new NativeSymbol(description) : description === void 0 ? NativeSymbol() : NativeSymbol(description);
              if (description === "")
                EmptyStringDescriptionStore[result] = true;
              return result;
            };
            copyConstructorProperties(SymbolWrapper, NativeSymbol);
            var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
            symbolPrototype.constructor = SymbolWrapper;
            var symbolToString = symbolPrototype.toString;
            var native = String(NativeSymbol("test")) == "Symbol(test)";
            var regexp = /^Symbol\((.*)\)[^)]+$/;
            defineProperty(symbolPrototype, "description", {
              configurable: true,
              get: function description() {
                var symbol = isObject2(this) ? this.valueOf() : this;
                var string = symbolToString.call(symbol);
                if (has(EmptyStringDescriptionStore, symbol))
                  return "";
                var desc = native ? string.slice(7, -1) : string.replace(regexp, "$1");
                return desc === "" ? void 0 : desc;
              }
            });
            $({ global: true, forced: true }, {
              Symbol: SymbolWrapper
            });
          }
        }
      ),
      /***/
      "e163": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var has = __webpack_require__("5135");
          var toObject = __webpack_require__("7b0b");
          var sharedKey = __webpack_require__("f772");
          var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");
          var IE_PROTO = sharedKey("IE_PROTO");
          var ObjectPrototype = Object.prototype;
          module2.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
            O = toObject(O);
            if (has(O, IE_PROTO))
              return O[IE_PROTO];
            if (typeof O.constructor == "function" && O instanceof O.constructor) {
              return O.constructor.prototype;
            }
            return O instanceof Object ? ObjectPrototype : null;
          };
        }
      ),
      /***/
      "e177": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var fails = __webpack_require__("d039");
          module2.exports = !fails(function() {
            function F() {
            }
            F.prototype.constructor = null;
            return Object.getPrototypeOf(new F()) !== F.prototype;
          });
        }
      ),
      /***/
      "e260": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var toIndexedObject = __webpack_require__("fc6a");
          var addToUnscopables = __webpack_require__("44d2");
          var Iterators = __webpack_require__("3f8c");
          var InternalStateModule = __webpack_require__("69f3");
          var defineIterator = __webpack_require__("7dd0");
          var ARRAY_ITERATOR = "Array Iterator";
          var setInternalState = InternalStateModule.set;
          var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
          module2.exports = defineIterator(Array, "Array", function(iterated, kind) {
            setInternalState(this, {
              type: ARRAY_ITERATOR,
              target: toIndexedObject(iterated),
              // target
              index: 0,
              // next index
              kind
              // kind
            });
          }, function() {
            var state = getInternalState(this);
            var target = state.target;
            var kind = state.kind;
            var index = state.index++;
            if (!target || index >= target.length) {
              state.target = void 0;
              return { value: void 0, done: true };
            }
            if (kind == "keys")
              return { value: index, done: false };
            if (kind == "values")
              return { value: target[index], done: false };
            return { value: [index, target[index]], done: false };
          }, "values");
          Iterators.Arguments = Iterators.Array;
          addToUnscopables("keys");
          addToUnscopables("values");
          addToUnscopables("entries");
        }
      ),
      /***/
      "e2cc": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var redefine = __webpack_require__("6eeb");
          module2.exports = function(target, src, options) {
            for (var key in src)
              redefine(target, key, src[key], options);
            return target;
          };
        }
      ),
      /***/
      "e439": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var fails = __webpack_require__("d039");
          var toIndexedObject = __webpack_require__("fc6a");
          var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
          var DESCRIPTORS = __webpack_require__("83ab");
          var FAILS_ON_PRIMITIVES = fails(function() {
            nativeGetOwnPropertyDescriptor(1);
          });
          var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;
          $({ target: "Object", stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
            getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
              return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
            }
          });
        }
      ),
      /***/
      "e538": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          exports2.f = wellKnownSymbol;
        }
      ),
      /***/
      "e667": (
        /***/
        function(module2, exports2) {
          module2.exports = function(exec) {
            try {
              return { error: false, value: exec() };
            } catch (error) {
              return { error: true, value: error };
            }
          };
        }
      ),
      /***/
      "e6cf": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var IS_PURE = __webpack_require__("c430");
          var global = __webpack_require__("da84");
          var getBuiltIn = __webpack_require__("d066");
          var NativePromise = __webpack_require__("fea9");
          var redefine = __webpack_require__("6eeb");
          var redefineAll = __webpack_require__("e2cc");
          var setToStringTag = __webpack_require__("d44e");
          var setSpecies = __webpack_require__("2626");
          var isObject2 = __webpack_require__("861d");
          var aFunction = __webpack_require__("1c0b");
          var anInstance = __webpack_require__("19aa");
          var classof = __webpack_require__("c6b6");
          var inspectSource = __webpack_require__("8925");
          var iterate = __webpack_require__("2266");
          var checkCorrectnessOfIteration = __webpack_require__("1c7e");
          var speciesConstructor = __webpack_require__("4840");
          var task = __webpack_require__("2cf4").set;
          var microtask = __webpack_require__("b575");
          var promiseResolve = __webpack_require__("cdf9");
          var hostReportErrors = __webpack_require__("44de");
          var newPromiseCapabilityModule = __webpack_require__("f069");
          var perform = __webpack_require__("e667");
          var InternalStateModule = __webpack_require__("69f3");
          var isForced = __webpack_require__("94ca");
          var wellKnownSymbol = __webpack_require__("b622");
          var V8_VERSION = __webpack_require__("2d00");
          var SPECIES = wellKnownSymbol("species");
          var PROMISE = "Promise";
          var getInternalState = InternalStateModule.get;
          var setInternalState = InternalStateModule.set;
          var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
          var PromiseConstructor = NativePromise;
          var TypeError2 = global.TypeError;
          var document2 = global.document;
          var process2 = global.process;
          var $fetch = getBuiltIn("fetch");
          var newPromiseCapability = newPromiseCapabilityModule.f;
          var newGenericPromiseCapability = newPromiseCapability;
          var IS_NODE = classof(process2) == "process";
          var DISPATCH_EVENT = !!(document2 && document2.createEvent && global.dispatchEvent);
          var UNHANDLED_REJECTION = "unhandledrejection";
          var REJECTION_HANDLED = "rejectionhandled";
          var PENDING = 0;
          var FULFILLED = 1;
          var REJECTED = 2;
          var HANDLED = 1;
          var UNHANDLED = 2;
          var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
          var FORCED = isForced(PROMISE, function() {
            var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
            if (!GLOBAL_CORE_JS_PROMISE) {
              if (V8_VERSION === 66)
                return true;
              if (!IS_NODE && typeof PromiseRejectionEvent != "function")
                return true;
            }
            if (IS_PURE && !PromiseConstructor.prototype["finally"])
              return true;
            if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor))
              return false;
            var promise = PromiseConstructor.resolve(1);
            var FakePromise = function(exec) {
              exec(function() {
              }, function() {
              });
            };
            var constructor = promise.constructor = {};
            constructor[SPECIES] = FakePromise;
            return !(promise.then(function() {
            }) instanceof FakePromise);
          });
          var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function(iterable) {
            PromiseConstructor.all(iterable)["catch"](function() {
            });
          });
          var isThenable = function(it) {
            var then;
            return isObject2(it) && typeof (then = it.then) == "function" ? then : false;
          };
          var notify = function(promise, state, isReject) {
            if (state.notified)
              return;
            state.notified = true;
            var chain = state.reactions;
            microtask(function() {
              var value = state.value;
              var ok = state.state == FULFILLED;
              var index = 0;
              while (chain.length > index) {
                var reaction = chain[index++];
                var handler = ok ? reaction.ok : reaction.fail;
                var resolve = reaction.resolve;
                var reject = reaction.reject;
                var domain = reaction.domain;
                var result, then, exited;
                try {
                  if (handler) {
                    if (!ok) {
                      if (state.rejection === UNHANDLED)
                        onHandleUnhandled(promise, state);
                      state.rejection = HANDLED;
                    }
                    if (handler === true)
                      result = value;
                    else {
                      if (domain)
                        domain.enter();
                      result = handler(value);
                      if (domain) {
                        domain.exit();
                        exited = true;
                      }
                    }
                    if (result === reaction.promise) {
                      reject(TypeError2("Promise-chain cycle"));
                    } else if (then = isThenable(result)) {
                      then.call(result, resolve, reject);
                    } else
                      resolve(result);
                  } else
                    reject(value);
                } catch (error) {
                  if (domain && !exited)
                    domain.exit();
                  reject(error);
                }
              }
              state.reactions = [];
              state.notified = false;
              if (isReject && !state.rejection)
                onUnhandled(promise, state);
            });
          };
          var dispatchEvent = function(name, promise, reason) {
            var event, handler;
            if (DISPATCH_EVENT) {
              event = document2.createEvent("Event");
              event.promise = promise;
              event.reason = reason;
              event.initEvent(name, false, true);
              global.dispatchEvent(event);
            } else
              event = { promise, reason };
            if (handler = global["on" + name])
              handler(event);
            else if (name === UNHANDLED_REJECTION)
              hostReportErrors("Unhandled promise rejection", reason);
          };
          var onUnhandled = function(promise, state) {
            task.call(global, function() {
              var value = state.value;
              var IS_UNHANDLED = isUnhandled(state);
              var result;
              if (IS_UNHANDLED) {
                result = perform(function() {
                  if (IS_NODE) {
                    process2.emit("unhandledRejection", value, promise);
                  } else
                    dispatchEvent(UNHANDLED_REJECTION, promise, value);
                });
                state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
                if (result.error)
                  throw result.value;
              }
            });
          };
          var isUnhandled = function(state) {
            return state.rejection !== HANDLED && !state.parent;
          };
          var onHandleUnhandled = function(promise, state) {
            task.call(global, function() {
              if (IS_NODE) {
                process2.emit("rejectionHandled", promise);
              } else
                dispatchEvent(REJECTION_HANDLED, promise, state.value);
            });
          };
          var bind = function(fn, promise, state, unwrap) {
            return function(value) {
              fn(promise, state, value, unwrap);
            };
          };
          var internalReject = function(promise, state, value, unwrap) {
            if (state.done)
              return;
            state.done = true;
            if (unwrap)
              state = unwrap;
            state.value = value;
            state.state = REJECTED;
            notify(promise, state, true);
          };
          var internalResolve = function(promise, state, value, unwrap) {
            if (state.done)
              return;
            state.done = true;
            if (unwrap)
              state = unwrap;
            try {
              if (promise === value)
                throw TypeError2("Promise can't be resolved itself");
              var then = isThenable(value);
              if (then) {
                microtask(function() {
                  var wrapper = { done: false };
                  try {
                    then.call(
                      value,
                      bind(internalResolve, promise, wrapper, state),
                      bind(internalReject, promise, wrapper, state)
                    );
                  } catch (error) {
                    internalReject(promise, wrapper, error, state);
                  }
                });
              } else {
                state.value = value;
                state.state = FULFILLED;
                notify(promise, state, false);
              }
            } catch (error) {
              internalReject(promise, { done: false }, error, state);
            }
          };
          if (FORCED) {
            PromiseConstructor = function Promise2(executor) {
              anInstance(this, PromiseConstructor, PROMISE);
              aFunction(executor);
              Internal.call(this);
              var state = getInternalState(this);
              try {
                executor(bind(internalResolve, this, state), bind(internalReject, this, state));
              } catch (error) {
                internalReject(this, state, error);
              }
            };
            Internal = function Promise2(executor) {
              setInternalState(this, {
                type: PROMISE,
                done: false,
                notified: false,
                parent: false,
                reactions: [],
                rejection: false,
                state: PENDING,
                value: void 0
              });
            };
            Internal.prototype = redefineAll(PromiseConstructor.prototype, {
              // `Promise.prototype.then` method
              // https://tc39.github.io/ecma262/#sec-promise.prototype.then
              then: function then(onFulfilled, onRejected) {
                var state = getInternalPromiseState(this);
                var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
                reaction.ok = typeof onFulfilled == "function" ? onFulfilled : true;
                reaction.fail = typeof onRejected == "function" && onRejected;
                reaction.domain = IS_NODE ? process2.domain : void 0;
                state.parent = true;
                state.reactions.push(reaction);
                if (state.state != PENDING)
                  notify(this, state, false);
                return reaction.promise;
              },
              // `Promise.prototype.catch` method
              // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
              "catch": function(onRejected) {
                return this.then(void 0, onRejected);
              }
            });
            OwnPromiseCapability = function() {
              var promise = new Internal();
              var state = getInternalState(promise);
              this.promise = promise;
              this.resolve = bind(internalResolve, promise, state);
              this.reject = bind(internalReject, promise, state);
            };
            newPromiseCapabilityModule.f = newPromiseCapability = function(C) {
              return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
            };
            if (!IS_PURE && typeof NativePromise == "function") {
              nativeThen = NativePromise.prototype.then;
              redefine(NativePromise.prototype, "then", function then(onFulfilled, onRejected) {
                var that = this;
                return new PromiseConstructor(function(resolve, reject) {
                  nativeThen.call(that, resolve, reject);
                }).then(onFulfilled, onRejected);
              }, { unsafe: true });
              if (typeof $fetch == "function")
                $({ global: true, enumerable: true, forced: true }, {
                  // eslint-disable-next-line no-unused-vars
                  fetch: function fetch(input) {
                    return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
                  }
                });
            }
          }
          $({ global: true, wrap: true, forced: FORCED }, {
            Promise: PromiseConstructor
          });
          setToStringTag(PromiseConstructor, PROMISE, false, true);
          setSpecies(PROMISE);
          PromiseWrapper = getBuiltIn(PROMISE);
          $({ target: PROMISE, stat: true, forced: FORCED }, {
            // `Promise.reject` method
            // https://tc39.github.io/ecma262/#sec-promise.reject
            reject: function reject(r) {
              var capability = newPromiseCapability(this);
              capability.reject.call(void 0, r);
              return capability.promise;
            }
          });
          $({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
            // `Promise.resolve` method
            // https://tc39.github.io/ecma262/#sec-promise.resolve
            resolve: function resolve(x) {
              return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
            }
          });
          $({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
            // `Promise.all` method
            // https://tc39.github.io/ecma262/#sec-promise.all
            all: function all(iterable) {
              var C = this;
              var capability = newPromiseCapability(C);
              var resolve = capability.resolve;
              var reject = capability.reject;
              var result = perform(function() {
                var $promiseResolve = aFunction(C.resolve);
                var values = [];
                var counter = 0;
                var remaining = 1;
                iterate(iterable, function(promise) {
                  var index = counter++;
                  var alreadyCalled = false;
                  values.push(void 0);
                  remaining++;
                  $promiseResolve.call(C, promise).then(function(value) {
                    if (alreadyCalled)
                      return;
                    alreadyCalled = true;
                    values[index] = value;
                    --remaining || resolve(values);
                  }, reject);
                });
                --remaining || resolve(values);
              });
              if (result.error)
                reject(result.value);
              return capability.promise;
            },
            // `Promise.race` method
            // https://tc39.github.io/ecma262/#sec-promise.race
            race: function race(iterable) {
              var C = this;
              var capability = newPromiseCapability(C);
              var reject = capability.reject;
              var result = perform(function() {
                var $promiseResolve = aFunction(C.resolve);
                iterate(iterable, function(promise) {
                  $promiseResolve.call(C, promise).then(capability.resolve, reject);
                });
              });
              if (result.error)
                reject(result.value);
              return capability.promise;
            }
          });
        }
      ),
      /***/
      "e893": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var has = __webpack_require__("5135");
          var ownKeys = __webpack_require__("56ef");
          var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
          var definePropertyModule = __webpack_require__("9bf2");
          module2.exports = function(target, source) {
            var keys = ownKeys(source);
            var defineProperty = definePropertyModule.f;
            var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (!has(target, key))
                defineProperty(target, key, getOwnPropertyDescriptor(source, key));
            }
          };
        }
      ),
      /***/
      "e8b5": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var classof = __webpack_require__("c6b6");
          module2.exports = Array.isArray || function isArray2(arg) {
            return classof(arg) == "Array";
          };
        }
      ),
      /***/
      "e95a": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          var Iterators = __webpack_require__("3f8c");
          var ITERATOR = wellKnownSymbol("iterator");
          var ArrayPrototype = Array.prototype;
          module2.exports = function(it) {
            return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
          };
        }
      ),
      /***/
      "f069": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var aFunction = __webpack_require__("1c0b");
          var PromiseCapability = function(C) {
            var resolve, reject;
            this.promise = new C(function($$resolve, $$reject) {
              if (resolve !== void 0 || reject !== void 0)
                throw TypeError("Bad Promise constructor");
              resolve = $$resolve;
              reject = $$reject;
            });
            this.resolve = aFunction(resolve);
            this.reject = aFunction(reject);
          };
          module2.exports.f = function(C) {
            return new PromiseCapability(C);
          };
        }
      ),
      /***/
      "f183": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var hiddenKeys = __webpack_require__("d012");
          var isObject2 = __webpack_require__("861d");
          var has = __webpack_require__("5135");
          var defineProperty = __webpack_require__("9bf2").f;
          var uid = __webpack_require__("90e3");
          var FREEZING = __webpack_require__("bb2f");
          var METADATA = uid("meta");
          var id = 0;
          var isExtensible = Object.isExtensible || function() {
            return true;
          };
          var setMetadata = function(it) {
            defineProperty(it, METADATA, { value: {
              objectID: "O" + ++id,
              // object ID
              weakData: {}
              // weak collections IDs
            } });
          };
          var fastKey = function(it, create) {
            if (!isObject2(it))
              return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
            if (!has(it, METADATA)) {
              if (!isExtensible(it))
                return "F";
              if (!create)
                return "E";
              setMetadata(it);
            }
            return it[METADATA].objectID;
          };
          var getWeakData = function(it, create) {
            if (!has(it, METADATA)) {
              if (!isExtensible(it))
                return true;
              if (!create)
                return false;
              setMetadata(it);
            }
            return it[METADATA].weakData;
          };
          var onFreeze = function(it) {
            if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA))
              setMetadata(it);
            return it;
          };
          var meta = module2.exports = {
            REQUIRED: false,
            fastKey,
            getWeakData,
            onFreeze
          };
          hiddenKeys[METADATA] = true;
        }
      ),
      /***/
      "f5df": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
          var classofRaw = __webpack_require__("c6b6");
          var wellKnownSymbol = __webpack_require__("b622");
          var TO_STRING_TAG = wellKnownSymbol("toStringTag");
          var CORRECT_ARGUMENTS = classofRaw(function() {
            return arguments;
          }()) == "Arguments";
          var tryGet = function(it, key) {
            try {
              return it[key];
            } catch (error) {
            }
          };
          module2.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
            var O, tag, result;
            return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
          };
        }
      ),
      /***/
      "f772": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var shared = __webpack_require__("5692");
          var uid = __webpack_require__("90e3");
          var keys = shared("keys");
          module2.exports = function(key) {
            return keys[key] || (keys[key] = uid(key));
          };
        }
      ),
      /***/
      "fb15": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          "use strict";
          __webpack_require__.r(__webpack_exports__);
          __webpack_require__.d(__webpack_exports__, "QrStream", function() {
            return (
              /* reexport */
              QrStream
            );
          });
          __webpack_require__.d(__webpack_exports__, "QrDropzone", function() {
            return (
              /* reexport */
              QrDropzone
            );
          });
          __webpack_require__.d(__webpack_exports__, "QrCapture", function() {
            return (
              /* reexport */
              QrCapture
            );
          });
          if (typeof window !== "undefined") {
            var currentScript = window.document.currentScript;
            if (true) {
              var getCurrentScript = __webpack_require__("8875");
              currentScript = getCurrentScript();
              if (!("currentScript" in document)) {
                Object.defineProperty(document, "currentScript", { get: getCurrentScript });
              }
            }
            var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
            if (src) {
              __webpack_require__.p = src[1];
            }
          }
          var setPublicPath = null;
          var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
          var _withId = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withScopeId"])("data-v-f73a6250");
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-f73a6250");
          var _hoisted_1 = {
            class: "qr-stream-wrapper"
          };
          var _hoisted_2 = {
            ref: "video",
            class: "qr-stream-camera",
            autoplay: "",
            muted: "",
            playsinline: ""
          };
          var _hoisted_3 = {
            ref: "pauseFrame",
            class: "qr-stream-camera"
          };
          var _hoisted_4 = {
            ref: "trackingLayer",
            class: "qr-stream-overlay"
          };
          var _hoisted_5 = {
            class: "qr-stream-overlay"
          };
          Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])();
          var QrStreamvue_type_template_id_f73a6250_scoped_true_bindings_render = _withId(function render(_ctx, _cache, $props, $setup, $data, $options) {
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])("div", _hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("video", _hoisted_2, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.shouldScan]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("canvas", _hoisted_3, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !_ctx.shouldScan]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("canvas", _hoisted_4, null, 512), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("div", _hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "default")])]);
          });
          var es_object_to_string = __webpack_require__("d3b7");
          var es_promise = __webpack_require__("e6cf");
          var es_symbol = __webpack_require__("a4d3");
          var es_array_filter = __webpack_require__("4de4");
          var es_array_for_each = __webpack_require__("4160");
          var es_object_get_own_property_descriptor = __webpack_require__("e439");
          var es_object_get_own_property_descriptors = __webpack_require__("dbb4");
          var es_object_keys = __webpack_require__("b64b");
          var web_dom_collections_for_each = __webpack_require__("159b");
          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              obj[key] = value;
            }
            return obj;
          }
          function ownKeys(object, enumerableOnly) {
            var keys = Object.keys(object);
            if (Object.getOwnPropertySymbols) {
              var symbols = Object.getOwnPropertySymbols(object);
              if (enumerableOnly)
                symbols = symbols.filter(function(sym) {
                  return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                });
              keys.push.apply(keys, symbols);
            }
            return keys;
          }
          function _objectSpread2(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i] != null ? arguments[i] : {};
              if (i % 2) {
                ownKeys(Object(source), true).forEach(function(key) {
                  _defineProperty(target, key, source[key]);
                });
              } else if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
              } else {
                ownKeys(Object(source)).forEach(function(key) {
                  Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                });
              }
            }
            return target;
          }
          var runtime = __webpack_require__("96cf");
          function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
            try {
              var info = gen[key](arg);
              var value = info.value;
            } catch (error) {
              reject(error);
              return;
            }
            if (info.done) {
              resolve(value);
            } else {
              Promise.resolve(value).then(_next, _throw);
            }
          }
          function _asyncToGenerator(fn) {
            return function() {
              var self2 = this, args = arguments;
              return new Promise(function(resolve, reject) {
                var gen = fn.apply(self2, args);
                function _next(value) {
                  asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                  asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(void 0);
              });
            };
          }
          var es_promise_finally = __webpack_require__("a79d");
          var indempotent = function indempotent2(action) {
            var called = false;
            var result = void 0;
            return function() {
              if (called) {
                return result;
              } else {
                result = action.apply(void 0, arguments);
                called = true;
                return result;
              }
            };
          };
          function asyncListenEvent(eventTarget, successEvent, errorEvent) {
            var _resolve, _reject;
            var promise = new Promise(function(resolve, reject) {
              _resolve = resolve;
              _reject = reject;
            });
            eventTarget.addEventListener(successEvent, _resolve);
            eventTarget.addEventListener(errorEvent, _reject);
            promise.finally(function() {
              eventTarget.removeEventListener(successEvent, _resolve);
              eventTarget.removeEventListener(errorEvent, _reject);
            });
            return promise;
          }
          function sleep(ms) {
            return new Promise(function(resolve) {
              setTimeout(resolve, ms);
            });
          }
          function scan(_x, _x2) {
            return _scan.apply(this, arguments);
          }
          function _scan() {
            _scan = _asyncToGenerator(regeneratorRuntime.mark(function _callee(Worker2, imageData) {
              var worker, event;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      worker = new Worker2();
                      worker.postMessage(imageData, [imageData.data.buffer]);
                      _context.next = 4;
                      return asyncListenEvent(worker, "message");
                    case 4:
                      event = _context.sent;
                      worker.terminate();
                      return _context.abrupt("return", event.data);
                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
            return _scan.apply(this, arguments);
          }
          function keepScanning(Worker2, camera, options) {
            var detectHandler = options.detectHandler, locateHandler = options.locateHandler, minDelay = options.minDelay;
            var contentBefore = null;
            var locationBefore = null;
            var lastScanned = performance.now();
            var worker = new Worker2();
            var workerBusy = false;
            var shouldContinue = true;
            worker.onmessage = function(event) {
              workerBusy = false;
              var _event$data = event.data, content = _event$data.content, location2 = _event$data.location;
              if (content !== null && content !== contentBefore) {
                detectHandler(event.data);
              }
              if (location2 !== locationBefore) {
                locateHandler(location2);
              }
              contentBefore = content || contentBefore;
              locationBefore = location2;
            };
            var processFrame = function processFrame2(timeNow) {
              if (shouldContinue) {
                window.requestAnimationFrame(processFrame2);
                if (timeNow - lastScanned >= minDelay) {
                  lastScanned = timeNow;
                  if (workerBusy === false) {
                    workerBusy = true;
                    var imageData = camera.captureFrame();
                    worker.postMessage(imageData, [imageData.data.buffer]);
                  }
                }
              } else {
                worker.terminate();
              }
            };
            processFrame();
            return function() {
              shouldContinue = false;
            };
          }
          function thinSquare(_ref) {
            var color = _ref.color;
            return function(location2, ctx) {
              var topLeftCorner = location2.topLeftCorner, topRightCorner = location2.topRightCorner, bottomLeftCorner = location2.bottomLeftCorner, bottomRightCorner = location2.bottomRightCorner;
              ctx.strokeStyle = color;
              ctx.beginPath();
              ctx.moveTo(topLeftCorner.x, topLeftCorner.y);
              ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y);
              ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y);
              ctx.lineTo(topRightCorner.x, topRightCorner.y);
              ctx.lineTo(topLeftCorner.x, topLeftCorner.y);
              ctx.closePath();
              ctx.stroke();
            };
          }
          var es_array_iterator = __webpack_require__("e260");
          var es_string_iterator = __webpack_require__("3ca3");
          var web_dom_collections_iterator = __webpack_require__("ddb0");
          var web_url = __webpack_require__("2b3d");
          function _arrayWithHoles(arr) {
            if (Array.isArray(arr))
              return arr;
          }
          var es_symbol_description = __webpack_require__("e01a");
          var es_symbol_iterator = __webpack_require__("d28b");
          function _iterableToArrayLimit(arr, i) {
            if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
              return;
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = void 0;
            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i)
                  break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"] != null)
                  _i["return"]();
              } finally {
                if (_d)
                  throw _e;
              }
            }
            return _arr;
          }
          var es_array_from = __webpack_require__("a630");
          var es_array_slice = __webpack_require__("fb6a");
          var es_function_name = __webpack_require__("b0c0");
          var es_regexp_to_string = __webpack_require__("25f0");
          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length)
              len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }
          function _unsupportedIterableToArray(o, minLen) {
            if (!o)
              return;
            if (typeof o === "string")
              return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor)
              n = o.constructor.name;
            if (n === "Map" || n === "Set")
              return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
              return _arrayLikeToArray(o, minLen);
          }
          function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
          }
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor)
                descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
              _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
              _defineProperties(Constructor, staticProps);
            return Constructor;
          }
          function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
              o2.__proto__ = p2;
              return o2;
            };
            return _setPrototypeOf(o, p);
          }
          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
              constructor: {
                value: subClass,
                writable: true,
                configurable: true
              }
            });
            if (superClass)
              _setPrototypeOf(subClass, superClass);
          }
          var es_reflect_construct = __webpack_require__("4ae1");
          var es_object_get_prototype_of = __webpack_require__("3410");
          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if (typeof Proxy === "function")
              return true;
            try {
              Date.prototype.toString.call(Reflect.construct(Date, [], function() {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
          function _assertThisInitialized(self2) {
            if (self2 === void 0) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self2;
          }
          function _possibleConstructorReturn(self2, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
              return call;
            }
            return _assertThisInitialized(self2);
          }
          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }
          var es_map = __webpack_require__("4ec9");
          var es_array_index_of = __webpack_require__("c975");
          function _isNativeFunction(fn) {
            return Function.toString.call(fn).indexOf("[native code]") !== -1;
          }
          function construct_construct(Parent, args, Class) {
            if (_isNativeReflectConstruct()) {
              construct_construct = Reflect.construct;
            } else {
              construct_construct = function _construct(Parent2, args2, Class2) {
                var a = [null];
                a.push.apply(a, args2);
                var Constructor = Function.bind.apply(Parent2, a);
                var instance = new Constructor();
                if (Class2)
                  _setPrototypeOf(instance, Class2.prototype);
                return instance;
              };
            }
            return construct_construct.apply(null, arguments);
          }
          function wrapNativeSuper_wrapNativeSuper(Class) {
            var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
            wrapNativeSuper_wrapNativeSuper = function _wrapNativeSuper(Class2) {
              if (Class2 === null || !_isNativeFunction(Class2))
                return Class2;
              if (typeof Class2 !== "function") {
                throw new TypeError("Super expression must either be null or a function");
              }
              if (typeof _cache !== "undefined") {
                if (_cache.has(Class2))
                  return _cache.get(Class2);
                _cache.set(Class2, Wrapper);
              }
              function Wrapper() {
                return construct_construct(Class2, arguments, _getPrototypeOf(this).constructor);
              }
              Wrapper.prototype = Object.create(Class2.prototype, {
                constructor: {
                  value: Wrapper,
                  enumerable: false,
                  writable: true,
                  configurable: true
                }
              });
              return _setPrototypeOf(Wrapper, Class2);
            };
            return wrapNativeSuper_wrapNativeSuper(Class);
          }
          var errors_DropImageFetchError = function(_Error) {
            _inherits(DropImageFetchError, _Error);
            var _super = _createSuper(DropImageFetchError);
            function DropImageFetchError() {
              var _this;
              _classCallCheck(this, DropImageFetchError);
              _this = _super.call(this, "can't process cross-origin image");
              _this.name = "DropImageFetchError";
              return _this;
            }
            return DropImageFetchError;
          }(wrapNativeSuper_wrapNativeSuper(Error));
          var errors_DropImageDecodeError = function(_Error2) {
            _inherits(DropImageDecodeError, _Error2);
            var _super2 = _createSuper(DropImageDecodeError);
            function DropImageDecodeError() {
              var _this2;
              _classCallCheck(this, DropImageDecodeError);
              _this2 = _super2.call(this, "drag-and-dropped file is not of type image and can't be decoded");
              _this2.name = "DropImageDecodeError";
              return _this2;
            }
            return DropImageDecodeError;
          }(wrapNativeSuper_wrapNativeSuper(Error));
          var errors_StreamApiNotSupportedError = function(_Error3) {
            _inherits(StreamApiNotSupportedError, _Error3);
            var _super3 = _createSuper(StreamApiNotSupportedError);
            function StreamApiNotSupportedError() {
              var _this3;
              _classCallCheck(this, StreamApiNotSupportedError);
              _this3 = _super3.call(this, "this browser has no Stream API support");
              _this3.name = "StreamApiNotSupportedError";
              return _this3;
            }
            return StreamApiNotSupportedError;
          }(wrapNativeSuper_wrapNativeSuper(Error));
          var errors_InsecureContextError = function(_Error4) {
            _inherits(InsecureContextError, _Error4);
            var _super4 = _createSuper(InsecureContextError);
            function InsecureContextError() {
              var _this4;
              _classCallCheck(this, InsecureContextError);
              _this4 = _super4.call(this, "camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.");
              _this4.name = "InsecureContextError";
              return _this4;
            }
            return InsecureContextError;
          }(wrapNativeSuper_wrapNativeSuper(Error));
          var es_array_includes = __webpack_require__("caad");
          var es_string_includes = __webpack_require__("2532");
          var es_string_starts_with = __webpack_require__("2ca0");
          var canvas = document.createElement("canvas");
          var canvasCtx = canvas.getContext("2d");
          canvas.width = 1920;
          canvas.height = 1080;
          function imageDataFromCanvas(canvasImageSource, width, height) {
            var scalingRatio = Math.min(1, canvas.width / width, canvas.height / height);
            var widthScaled = scalingRatio * width;
            var heightScaled = scalingRatio * height;
            canvasCtx.drawImage(canvasImageSource, 0, 0, widthScaled, heightScaled);
            return canvasCtx.getImageData(0, 0, widthScaled, heightScaled);
          }
          function imageDataFromImage(imageElement) {
            var width = imageElement.naturalWidth;
            var height = imageElement.naturalHeight;
            return imageDataFromCanvas(imageElement, width, height);
          }
          function imageDataFromVideo(videoElement) {
            var width = videoElement.videoWidth;
            var height = videoElement.videoHeight;
            return imageDataFromCanvas(videoElement, width, height);
          }
          function imageDataFromUrl(_x) {
            return _imageDataFromUrl.apply(this, arguments);
          }
          function _imageDataFromUrl() {
            _imageDataFromUrl = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
              var image;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!(url.startsWith("http") && url.includes(location.host) === false)) {
                        _context.next = 2;
                        break;
                      }
                      throw new errors_DropImageFetchError();
                    case 2:
                      image = document.createElement("img");
                      image.src = url;
                      _context.next = 6;
                      return asyncListenEvent(image, "load");
                    case 6:
                      return _context.abrupt("return", imageDataFromImage(image));
                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
            return _imageDataFromUrl.apply(this, arguments);
          }
          function imageDataFromFile(_x2) {
            return _imageDataFromFile.apply(this, arguments);
          }
          function _imageDataFromFile() {
            _imageDataFromFile = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(file) {
              var reader, result, dataURL;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!/image.*/.test(file.type)) {
                        _context2.next = 10;
                        break;
                      }
                      reader = new FileReader();
                      reader.readAsDataURL(file);
                      _context2.next = 5;
                      return asyncListenEvent(reader, "load");
                    case 5:
                      result = _context2.sent;
                      dataURL = result.target.result;
                      return _context2.abrupt("return", imageDataFromUrl(dataURL));
                    case 10:
                      throw new errors_DropImageDecodeError();
                    case 11:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));
            return _imageDataFromFile.apply(this, arguments);
          }
          var camera_Camera = function() {
            function Camera(videoEl, stream) {
              _classCallCheck(this, Camera);
              this.videoEl = videoEl;
              this.stream = stream;
            }
            _createClass(Camera, [{
              key: "stop",
              value: function stop() {
                this.stream.getTracks().forEach(function(track) {
                  return track.stop();
                });
              }
            }, {
              key: "captureFrame",
              value: function captureFrame() {
                return imageDataFromVideo(this.videoEl);
              }
            }, {
              key: "getCapabilities",
              value: function getCapabilities() {
                var _track$getCapabilitie, _track$getCapabilitie2;
                var _this$stream$getVideo = this.stream.getVideoTracks(), _this$stream$getVideo2 = _slicedToArray(_this$stream$getVideo, 1), track = _this$stream$getVideo2[0];
                return (_track$getCapabilitie = track === null || track === void 0 ? void 0 : (_track$getCapabilitie2 = track.getCapabilities) === null || _track$getCapabilitie2 === void 0 ? void 0 : _track$getCapabilitie2.call(track)) !== null && _track$getCapabilitie !== void 0 ? _track$getCapabilitie : {};
              }
            }]);
            return Camera;
          }();
          var narrowDownFacingMode = function() {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(camera) {
              var devices, frontCamera, rearCamera;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return navigator.mediaDevices.enumerateDevices();
                    case 2:
                      devices = _context.sent.filter(function(_ref2) {
                        var kind = _ref2.kind;
                        return kind === "videoinput";
                      });
                      if (!(devices.length > 2)) {
                        _context.next = 15;
                        break;
                      }
                      frontCamera = devices[0];
                      rearCamera = devices[devices.length - 1];
                      _context.t0 = camera;
                      _context.next = _context.t0 === "auto" ? 9 : _context.t0 === "rear" ? 10 : _context.t0 === "front" ? 11 : 12;
                      break;
                    case 9:
                      return _context.abrupt("return", {
                        deviceId: {
                          exact: rearCamera.deviceId
                        }
                      });
                    case 10:
                      return _context.abrupt("return", {
                        deviceId: {
                          exact: rearCamera.deviceId
                        }
                      });
                    case 11:
                      return _context.abrupt("return", {
                        deviceId: {
                          exact: frontCamera.deviceId
                        }
                      });
                    case 12:
                      return _context.abrupt("return", void 0);
                    case 13:
                      _context.next = 22;
                      break;
                    case 15:
                      _context.t1 = camera;
                      _context.next = _context.t1 === "auto" ? 18 : _context.t1 === "rear" ? 19 : _context.t1 === "front" ? 20 : 21;
                      break;
                    case 18:
                      return _context.abrupt("return", {
                        facingMode: {
                          ideal: "environment"
                        }
                      });
                    case 19:
                      return _context.abrupt("return", {
                        facingMode: {
                          exact: "environment"
                        }
                      });
                    case 20:
                      return _context.abrupt("return", {
                        facingMode: {
                          exact: "user"
                        }
                      });
                    case 21:
                      return _context.abrupt("return", void 0);
                    case 22:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
            return function narrowDownFacingMode2(_x) {
              return _ref.apply(this, arguments);
            };
          }();
          var misc_camera = function(_x2, _x3) {
            return _ref4.apply(this, arguments);
          };
          function _ref4() {
            _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(videoEl, _ref3) {
              var _navigator, _navigator$mediaDevic;
              var camera, torch, constraints, stream, _stream$getVideoTrack, _stream$getVideoTrack2, track, capabilities;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      camera = _ref3.camera, torch = _ref3.torch;
                      if (!(window.isSecureContext !== true)) {
                        _context2.next = 3;
                        break;
                      }
                      throw new errors_InsecureContextError();
                    case 3:
                      if (!(((_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$mediaDevic = _navigator.mediaDevices) === null || _navigator$mediaDevic === void 0 ? void 0 : _navigator$mediaDevic.getUserMedia) === void 0)) {
                        _context2.next = 5;
                        break;
                      }
                      throw new errors_StreamApiNotSupportedError();
                    case 5:
                      _context2.t0 = _objectSpread2;
                      _context2.t1 = {
                        width: {
                          min: 360,
                          ideal: 640,
                          max: 1920
                        },
                        height: {
                          min: 240,
                          ideal: 480,
                          max: 1080
                        }
                      };
                      _context2.next = 9;
                      return narrowDownFacingMode(camera);
                    case 9:
                      _context2.t2 = _context2.sent;
                      _context2.t3 = (0, _context2.t0)(_context2.t1, _context2.t2);
                      constraints = {
                        audio: false,
                        video: _context2.t3
                      };
                      _context2.next = 14;
                      return navigator.mediaDevices.getUserMedia(constraints);
                    case 14:
                      stream = _context2.sent;
                      if (videoEl.srcObject !== void 0) {
                        videoEl.srcObject = stream;
                      } else if (videoEl.mozSrcObject !== void 0) {
                        videoEl.mozSrcObject = stream;
                      } else if (window.URL.createObjectURL) {
                        videoEl.src = window.URL.createObjectURL(stream);
                      } else if (window.webkitURL) {
                        videoEl.src = window.webkitURL.createObjectURL(stream);
                      } else {
                        videoEl.src = stream;
                      }
                      _context2.next = 18;
                      return asyncListenEvent(videoEl, "loadeddata");
                    case 18:
                      _context2.next = 20;
                      return sleep(500);
                    case 20:
                      if (torch) {
                        _stream$getVideoTrack = stream.getVideoTracks(), _stream$getVideoTrack2 = _slicedToArray(_stream$getVideoTrack, 1), track = _stream$getVideoTrack2[0];
                        capabilities = track.getCapabilities();
                        if (capabilities.torch) {
                          track.applyConstraints({
                            advanced: [{
                              torch: true
                            }]
                          });
                        } else {
                          console.warn("device does not support torch capability");
                        }
                      }
                      return _context2.abrupt("return", new camera_Camera(videoEl, stream));
                    case 22:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));
            return _ref4.apply(this, arguments);
          }
          var built_worker = URL.createObjectURL(new Blob([`
!function(o){"function"==typeof define&&define.amd?define(o):o()}(function(){function o(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var e,r=o((function(o,e){var r;"undefined"!=typeof self&&self,r=function(){return function(o){var e={};function r(t){if(e[t])return e[t].exports;var c=e[t]={i:t,l:!1,exports:{}};return o[t].call(c.exports,c,c.exports,r),c.l=!0,c.exports}return r.m=o,r.c=e,r.d=function(o,e,t){r.o(o,e)||Object.defineProperty(o,e,{configurable:!1,enumerable:!0,get:t})},r.n=function(o){var e=o&&o.__esModule?function(){return o.default}:function(){return o};return r.d(e,"a",e),e},r.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},r.p="",r(r.s=3)}([function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function o(o,e){this.width=e,this.height=o.length/e,this.data=o}return o.createEmpty=function(e,r){return new o(new Uint8ClampedArray(e*r),e)},o.prototype.get=function(o,e){return!(o<0||o>=this.width||e<0||e>=this.height||!this.data[e*this.width+o])},o.prototype.set=function(o,e,r){this.data[e*this.width+o]=r?1:0},o.prototype.setRegion=function(o,e,r,t,c){for(var s=e;s<e+t;s++)for(var a=o;a<o+r;a++)this.set(a,s,!!c)},o}();e.BitMatrix=t},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t=r(2);e.addOrSubtractGF=function(o,e){return o^e};var c=function(){function o(o,e,r){this.primitive=o,this.size=e,this.generatorBase=r,this.expTable=new Array(this.size),this.logTable=new Array(this.size);for(var c=1,s=0;s<this.size;s++)this.expTable[s]=c,(c*=2)>=this.size&&(c=(c^this.primitive)&this.size-1);for(s=0;s<this.size-1;s++)this.logTable[this.expTable[s]]=s;this.zero=new t.default(this,Uint8ClampedArray.from([0])),this.one=new t.default(this,Uint8ClampedArray.from([1]))}return o.prototype.multiply=function(o,e){return 0===o||0===e?0:this.expTable[(this.logTable[o]+this.logTable[e])%(this.size-1)]},o.prototype.inverse=function(o){if(0===o)throw new Error("Can't invert 0");return this.expTable[this.size-this.logTable[o]-1]},o.prototype.buildMonomial=function(o,e){if(o<0)throw new Error("Invalid monomial degree less than 0");if(0===e)return this.zero;var r=new Uint8ClampedArray(o+1);return r[0]=e,new t.default(this,r)},o.prototype.log=function(o){if(0===o)throw new Error("Can't take log(0)");return this.logTable[o]},o.prototype.exp=function(o){return this.expTable[o]},o}();e.default=c},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t=r(1),c=function(){function o(o,e){if(0===e.length)throw new Error("No coefficients.");this.field=o;var r=e.length;if(r>1&&0===e[0]){for(var t=1;t<r&&0===e[t];)t++;if(t===r)this.coefficients=o.zero.coefficients;else{this.coefficients=new Uint8ClampedArray(r-t);for(var c=0;c<this.coefficients.length;c++)this.coefficients[c]=e[t+c]}}else this.coefficients=e}return o.prototype.degree=function(){return this.coefficients.length-1},o.prototype.isZero=function(){return 0===this.coefficients[0]},o.prototype.getCoefficient=function(o){return this.coefficients[this.coefficients.length-1-o]},o.prototype.addOrSubtract=function(e){var r;if(this.isZero())return e;if(e.isZero())return this;var c=this.coefficients,s=e.coefficients;c.length>s.length&&(c=(r=[s,c])[0],s=r[1]);for(var a=new Uint8ClampedArray(s.length),n=s.length-c.length,d=0;d<n;d++)a[d]=s[d];for(d=n;d<s.length;d++)a[d]=t.addOrSubtractGF(c[d-n],s[d]);return new o(this.field,a)},o.prototype.multiply=function(e){if(0===e)return this.field.zero;if(1===e)return this;for(var r=this.coefficients.length,t=new Uint8ClampedArray(r),c=0;c<r;c++)t[c]=this.field.multiply(this.coefficients[c],e);return new o(this.field,t)},o.prototype.multiplyPoly=function(e){if(this.isZero()||e.isZero())return this.field.zero;for(var r=this.coefficients,c=r.length,s=e.coefficients,a=s.length,n=new Uint8ClampedArray(c+a-1),d=0;d<c;d++)for(var l=r[d],i=0;i<a;i++)n[d+i]=t.addOrSubtractGF(n[d+i],this.field.multiply(l,s[i]));return new o(this.field,n)},o.prototype.multiplyByMonomial=function(e,r){if(e<0)throw new Error("Invalid degree less than 0");if(0===r)return this.field.zero;for(var t=this.coefficients.length,c=new Uint8ClampedArray(t+e),s=0;s<t;s++)c[s]=this.field.multiply(this.coefficients[s],r);return new o(this.field,c)},o.prototype.evaluateAt=function(o){var e=0;if(0===o)return this.getCoefficient(0);var r=this.coefficients.length;if(1===o)return this.coefficients.forEach(function(o){e=t.addOrSubtractGF(e,o)}),e;e=this.coefficients[0];for(var c=1;c<r;c++)e=t.addOrSubtractGF(this.field.multiply(o,e),this.coefficients[c]);return e},o}();e.default=c},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t=r(4),c=r(5),s=r(11),a=r(12);function n(o){var e=a.locate(o);if(!e)return null;for(var r=0,t=e;r<t.length;r++){var n=t[r],d=s.extract(o,n),l=c.decode(d.matrix);if(l)return{binaryData:l.bytes,data:l.text,chunks:l.chunks,version:l.version,location:{topRightCorner:d.mappingFunction(n.dimension,0),topLeftCorner:d.mappingFunction(0,0),bottomRightCorner:d.mappingFunction(n.dimension,n.dimension),bottomLeftCorner:d.mappingFunction(0,n.dimension),topRightFinderPattern:n.topRight,topLeftFinderPattern:n.topLeft,bottomLeftFinderPattern:n.bottomLeft,bottomRightAlignmentPattern:n.alignmentPattern}}}return null}var d={inversionAttempts:"attemptBoth"};function l(o,e,r,c){void 0===c&&(c={});var s=d;Object.keys(s||{}).forEach(function(o){s[o]=c[o]||s[o]});var a="onlyInvert"===s.inversionAttempts||"invertFirst"===s.inversionAttempts,l=t.binarize(o,e,r,"attemptBoth"===s.inversionAttempts||"invertFirst"===s.inversionAttempts),i=l.binarized,B=l.inverted,k=n(a?B:i);return k||"attemptBoth"!==s.inversionAttempts&&"invertFirst"!==s.inversionAttempts||(k=n(a?i:B)),k}l.default=l,e.default=l},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t=r(0);function c(o,e,r){return o<e?e:o>r?r:o}var s=function(){function o(o,e){this.width=o,this.data=new Uint8ClampedArray(o*e)}return o.prototype.get=function(o,e){return this.data[e*this.width+o]},o.prototype.set=function(o,e,r){this.data[e*this.width+o]=r},o}();e.binarize=function(o,e,r,a){if(o.length!==e*r*4)throw new Error("Malformed data passed to binarizer.");for(var n=new s(e,r),d=0;d<e;d++)for(var l=0;l<r;l++)n.set(d,l,.2126*o[4*(l*e+d)+0]+.7152*o[4*(l*e+d)+1]+.0722*o[4*(l*e+d)+2]);for(var i=Math.ceil(e/8),B=Math.ceil(r/8),k=new s(i,B),u=0;u<B;u++)for(var C=0;C<i;C++){var f=0,m=Infinity,w=0;for(l=0;l<8;l++)for(d=0;d<8;d++){var P=n.get(8*C+d,8*u+l);f+=P,m=Math.min(m,P),w=Math.max(w,P)}var v=f/Math.pow(8,2);if(w-m<=24&&(v=m/2,u>0&&C>0)){var h=(k.get(C,u-1)+2*k.get(C-1,u)+k.get(C-1,u-1))/4;m<h&&(v=h)}k.set(C,u,v)}var y=t.BitMatrix.createEmpty(e,r),p=null;for(a&&(p=t.BitMatrix.createEmpty(e,r)),u=0;u<B;u++)for(C=0;C<i;C++){for(var b=c(C,2,i-3),g=c(u,2,B-3),x=(f=0,-2);x<=2;x++)for(var M=-2;M<=2;M++)f+=k.get(b+x,g+M);var L=f/25;for(x=0;x<8;x++)for(M=0;M<8;M++){var I=n.get(d=8*C+x,l=8*u+M);y.set(d,l,I<=L),a&&p.set(d,l,!(I<=L))}}return a?{binarized:y,inverted:p}:{binarized:y}}},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t=r(0),c=r(6),s=r(9),a=r(10);function n(o,e){for(var r=o^e,t=0;r;)t++,r&=r-1;return t}function d(o,e){return e<<1|o}var l=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,dataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,formatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,dataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],i=[function(o){return(o.y+o.x)%2==0},function(o){return o.y%2==0},function(o){return o.x%3==0},function(o){return(o.y+o.x)%3==0},function(o){return(Math.floor(o.y/2)+Math.floor(o.x/3))%2==0},function(o){return o.x*o.y%2+o.x*o.y%3==0},function(o){return(o.y*o.x%2+o.y*o.x%3)%2==0},function(o){return((o.y+o.x)%2+o.y*o.x%3)%2==0}];function B(o){var e=function(o){var e=o.height,r=Math.floor((e-17)/4);if(r<=6)return a.VERSIONS[r-1];for(var t=0,c=5;c>=0;c--)for(var s=e-9;s>=e-11;s--)t=d(o.get(s,c),t);var l=0;for(s=5;s>=0;s--)for(c=e-9;c>=e-11;c--)l=d(o.get(s,c),l);for(var i,B=Infinity,k=0,u=a.VERSIONS;k<u.length;k++){var C=u[k];if(C.infoBits===t||C.infoBits===l)return C;var f=n(t,C.infoBits);f<B&&(i=C,B=f),(f=n(l,C.infoBits))<B&&(i=C,B=f)}return B<=3?i:void 0}(o);if(!e)return null;var r=function(o){for(var e=0,r=0;r<=8;r++)6!==r&&(e=d(o.get(r,8),e));for(var t=7;t>=0;t--)6!==t&&(e=d(o.get(8,t),e));var c=o.height,s=0;for(t=c-1;t>=c-7;t--)s=d(o.get(8,t),s);for(r=c-8;r<c;r++)s=d(o.get(r,8),s);for(var a=Infinity,i=null,B=0,k=l;B<k.length;B++){var u=k[B],C=u.bits,f=u.formatInfo;if(C===e||C===s)return f;var m=n(e,C);m<a&&(i=f,a=m),e!==s&&(m=n(s,C))<a&&(i=f,a=m)}return a<=3?i:null}(o);if(!r)return null;var B=function(o,e,r){var t=e.errorCorrectionLevels[r],c=[],s=0;if(t.ecBlocks.forEach(function(o){for(var e=0;e<o.numBlocks;e++)c.push({numDataCodewords:o.dataCodewordsPerBlock,codewords:[]}),s+=o.dataCodewordsPerBlock+t.ecCodewordsPerBlock}),o.length<s)return null;o=o.slice(0,s);for(var a=t.ecBlocks[0].dataCodewordsPerBlock,n=0;n<a;n++)for(var d=0,l=c;d<l.length;d++)l[d].codewords.push(o.shift());if(t.ecBlocks.length>1){var i=t.ecBlocks[0].numBlocks,B=t.ecBlocks[1].numBlocks;for(n=0;n<B;n++)c[i+n].codewords.push(o.shift())}for(;o.length>0;)for(var k=0,u=c;k<u.length;k++)u[k].codewords.push(o.shift());return c}(function(o,e,r){for(var c=i[r.dataMask],s=o.height,a=function(o){var e=17+4*o.versionNumber,r=t.BitMatrix.createEmpty(e,e);r.setRegion(0,0,9,9,!0),r.setRegion(e-8,0,8,9,!0),r.setRegion(0,e-8,9,8,!0);for(var c=0,s=o.alignmentPatternCenters;c<s.length;c++)for(var a=s[c],n=0,d=o.alignmentPatternCenters;n<d.length;n++){var l=d[n];6===a&&6===l||6===a&&l===e-7||a===e-7&&6===l||r.setRegion(a-2,l-2,5,5,!0)}return r.setRegion(6,9,1,e-17,!0),r.setRegion(9,6,e-17,1,!0),o.versionNumber>6&&(r.setRegion(e-11,0,3,6,!0),r.setRegion(0,e-11,6,3,!0)),r}(e),n=[],l=0,B=0,k=!0,u=s-1;u>0;u-=2){6===u&&u--;for(var C=0;C<s;C++)for(var f=k?s-1-C:C,m=0;m<2;m++){var w=u-m;if(!a.get(w,f)){B++;var P=o.get(w,f);c({y:f,x:w})&&(P=!P),l=d(P,l),8===B&&(n.push(l),B=0,l=0)}}k=!k}return n}(o,e,r),e,r.errorCorrectionLevel);if(!B)return null;for(var k=B.reduce(function(o,e){return o+e.numDataCodewords},0),u=new Uint8ClampedArray(k),C=0,f=0,m=B;f<m.length;f++){var w=m[f],P=s.decode(w.codewords,w.codewords.length-w.numDataCodewords);if(!P)return null;for(var v=0;v<w.numDataCodewords;v++)u[C++]=P[v]}try{return c.decode(u,e.versionNumber)}catch(o){return null}}e.decode=function(o){if(null==o)return null;var e=B(o);if(e)return e;for(var r=0;r<o.width;r++)for(var t=r+1;t<o.height;t++)o.get(r,t)!==o.get(t,r)&&(o.set(r,t,!o.get(r,t)),o.set(t,r,!o.get(t,r)));return B(o)}},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t,c,s=r(7),a=r(8);function n(o,e){for(var r=[],t="",c=o.readBits([10,12,14][e]);c>=3;){if((d=o.readBits(10))>=1e3)throw new Error("Invalid numeric value above 999");var s=Math.floor(d/100),a=Math.floor(d/10)%10,n=d%10;r.push(48+s,48+a,48+n),t+=s.toString()+a.toString()+n.toString(),c-=3}if(2===c){if((d=o.readBits(7))>=100)throw new Error("Invalid numeric value above 99");s=Math.floor(d/10),r.push(48+s,48+(a=d%10)),t+=s.toString()+a.toString()}else if(1===c){var d;if((d=o.readBits(4))>=10)throw new Error("Invalid numeric value above 9");r.push(48+d),t+=d.toString()}return{bytes:r,text:t}}!function(o){o.Numeric="numeric",o.Alphanumeric="alphanumeric",o.Byte="byte",o.Kanji="kanji",o.ECI="eci"}(t=e.Mode||(e.Mode={})),function(o){o[o.Terminator=0]="Terminator",o[o.Numeric=1]="Numeric",o[o.Alphanumeric=2]="Alphanumeric",o[o.Byte=4]="Byte",o[o.Kanji=8]="Kanji",o[o.ECI=7]="ECI"}(c||(c={}));var d=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function l(o,e){for(var r=[],t="",c=o.readBits([9,11,13][e]);c>=2;){var s=o.readBits(11),a=Math.floor(s/45),n=s%45;r.push(d[a].charCodeAt(0),d[n].charCodeAt(0)),t+=d[a]+d[n],c-=2}return 1===c&&(a=o.readBits(6),r.push(d[a].charCodeAt(0)),t+=d[a]),{bytes:r,text:t}}function i(o,e){for(var r=[],t="",c=o.readBits([8,16,16][e]),s=0;s<c;s++){var a=o.readBits(8);r.push(a)}try{t+=decodeURIComponent(r.map(function(o){return"%"+("0"+o.toString(16)).substr(-2)}).join(""))}catch(o){}return{bytes:r,text:t}}function B(o,e){for(var r=[],t="",c=o.readBits([8,10,12][e]),s=0;s<c;s++){var n=o.readBits(13),d=Math.floor(n/192)<<8|n%192;r.push((d+=d<7936?33088:49472)>>8,255&d),t+=String.fromCharCode(a.shiftJISTable[d])}return{bytes:r,text:t}}e.decode=function(o,e){for(var r,a,d,k,u=new s.BitStream(o),C=e<=9?0:e<=26?1:2,f={text:"",bytes:[],chunks:[],version:e};u.available()>=4;){var m=u.readBits(4);if(m===c.Terminator)return f;if(m===c.ECI)0===u.readBits(1)?f.chunks.push({type:t.ECI,assignmentNumber:u.readBits(7)}):0===u.readBits(1)?f.chunks.push({type:t.ECI,assignmentNumber:u.readBits(14)}):0===u.readBits(1)?f.chunks.push({type:t.ECI,assignmentNumber:u.readBits(21)}):f.chunks.push({type:t.ECI,assignmentNumber:-1});else if(m===c.Numeric){var w=n(u,C);f.text+=w.text,(r=f.bytes).push.apply(r,w.bytes),f.chunks.push({type:t.Numeric,text:w.text})}else if(m===c.Alphanumeric){var P=l(u,C);f.text+=P.text,(a=f.bytes).push.apply(a,P.bytes),f.chunks.push({type:t.Alphanumeric,text:P.text})}else if(m===c.Byte){var v=i(u,C);f.text+=v.text,(d=f.bytes).push.apply(d,v.bytes),f.chunks.push({type:t.Byte,bytes:v.bytes,text:v.text})}else if(m===c.Kanji){var h=B(u,C);f.text+=h.text,(k=f.bytes).push.apply(k,h.bytes),f.chunks.push({type:t.Kanji,bytes:h.bytes,text:h.text})}}if(0===u.available()||0===u.readBits(u.available()))return f}},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function o(o){this.byteOffset=0,this.bitOffset=0,this.bytes=o}return o.prototype.readBits=function(o){if(o<1||o>32||o>this.available())throw new Error("Cannot read "+o.toString()+" bits");var e=0;if(this.bitOffset>0){var r=8-this.bitOffset,t=o<r?o:r;e=(this.bytes[this.byteOffset]&255>>8-t<<(c=r-t))>>c,o-=t,this.bitOffset+=t,8===this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(o>0){for(;o>=8;)e=e<<8|255&this.bytes[this.byteOffset],this.byteOffset++,o-=8;var c;o>0&&(e=e<<o|(this.bytes[this.byteOffset]&255>>(c=8-o)<<c)>>c,this.bitOffset+=o)}return e},o.prototype.available=function(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset},o}();e.BitStream=t},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.shiftJISTable={32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,58:58,59:59,60:60,61:61,62:62,63:63,64:64,65:65,66:66,67:67,68:68,69:69,70:70,71:71,72:72,73:73,74:74,75:75,76:76,77:77,78:78,79:79,80:80,81:81,82:82,83:83,84:84,85:85,86:86,87:87,88:88,89:89,90:90,91:91,92:165,93:93,94:94,95:95,96:96,97:97,98:98,99:99,100:100,101:101,102:102,103:103,104:104,105:105,106:106,107:107,108:108,109:109,110:110,111:111,112:112,113:113,114:114,115:115,116:116,117:117,118:118,119:119,120:120,121:121,122:122,123:123,124:124,125:125,126:8254,33088:12288,33089:12289,33090:12290,33091:65292,33092:65294,33093:12539,33094:65306,33095:65307,33096:65311,33097:65281,33098:12443,33099:12444,33100:180,33101:65344,33102:168,33103:65342,33104:65507,33105:65343,33106:12541,33107:12542,33108:12445,33109:12446,33110:12291,33111:20189,33112:12293,33113:12294,33114:12295,33115:12540,33116:8213,33117:8208,33118:65295,33119:92,33120:12316,33121:8214,33122:65372,33123:8230,33124:8229,33125:8216,33126:8217,33127:8220,33128:8221,33129:65288,33130:65289,33131:12308,33132:12309,33133:65339,33134:65341,33135:65371,33136:65373,33137:12296,33138:12297,33139:12298,33140:12299,33141:12300,33142:12301,33143:12302,33144:12303,33145:12304,33146:12305,33147:65291,33148:8722,33149:177,33150:215,33152:247,33153:65309,33154:8800,33155:65308,33156:65310,33157:8806,33158:8807,33159:8734,33160:8756,33161:9794,33162:9792,33163:176,33164:8242,33165:8243,33166:8451,33167:65509,33168:65284,33169:162,33170:163,33171:65285,33172:65283,33173:65286,33174:65290,33175:65312,33176:167,33177:9734,33178:9733,33179:9675,33180:9679,33181:9678,33182:9671,33183:9670,33184:9633,33185:9632,33186:9651,33187:9650,33188:9661,33189:9660,33190:8251,33191:12306,33192:8594,33193:8592,33194:8593,33195:8595,33196:12307,33208:8712,33209:8715,33210:8838,33211:8839,33212:8834,33213:8835,33214:8746,33215:8745,33224:8743,33225:8744,33226:172,33227:8658,33228:8660,33229:8704,33230:8707,33242:8736,33243:8869,33244:8978,33245:8706,33246:8711,33247:8801,33248:8786,33249:8810,33250:8811,33251:8730,33252:8765,33253:8733,33254:8757,33255:8747,33256:8748,33264:8491,33265:8240,33266:9839,33267:9837,33268:9834,33269:8224,33270:8225,33271:182,33276:9711,33359:65296,33360:65297,33361:65298,33362:65299,33363:65300,33364:65301,33365:65302,33366:65303,33367:65304,33368:65305,33376:65313,33377:65314,33378:65315,33379:65316,33380:65317,33381:65318,33382:65319,33383:65320,33384:65321,33385:65322,33386:65323,33387:65324,33388:65325,33389:65326,33390:65327,33391:65328,33392:65329,33393:65330,33394:65331,33395:65332,33396:65333,33397:65334,33398:65335,33399:65336,33400:65337,33401:65338,33409:65345,33410:65346,33411:65347,33412:65348,33413:65349,33414:65350,33415:65351,33416:65352,33417:65353,33418:65354,33419:65355,33420:65356,33421:65357,33422:65358,33423:65359,33424:65360,33425:65361,33426:65362,33427:65363,33428:65364,33429:65365,33430:65366,33431:65367,33432:65368,33433:65369,33434:65370,33439:12353,33440:12354,33441:12355,33442:12356,33443:12357,33444:12358,33445:12359,33446:12360,33447:12361,33448:12362,33449:12363,33450:12364,33451:12365,33452:12366,33453:12367,33454:12368,33455:12369,33456:12370,33457:12371,33458:12372,33459:12373,33460:12374,33461:12375,33462:12376,33463:12377,33464:12378,33465:12379,33466:12380,33467:12381,33468:12382,33469:12383,33470:12384,33471:12385,33472:12386,33473:12387,33474:12388,33475:12389,33476:12390,33477:12391,33478:12392,33479:12393,33480:12394,33481:12395,33482:12396,33483:12397,33484:12398,33485:12399,33486:12400,33487:12401,33488:12402,33489:12403,33490:12404,33491:12405,33492:12406,33493:12407,33494:12408,33495:12409,33496:12410,33497:12411,33498:12412,33499:12413,33500:12414,33501:12415,33502:12416,33503:12417,33504:12418,33505:12419,33506:12420,33507:12421,33508:12422,33509:12423,33510:12424,33511:12425,33512:12426,33513:12427,33514:12428,33515:12429,33516:12430,33517:12431,33518:12432,33519:12433,33520:12434,33521:12435,33600:12449,33601:12450,33602:12451,33603:12452,33604:12453,33605:12454,33606:12455,33607:12456,33608:12457,33609:12458,33610:12459,33611:12460,33612:12461,33613:12462,33614:12463,33615:12464,33616:12465,33617:12466,33618:12467,33619:12468,33620:12469,33621:12470,33622:12471,33623:12472,33624:12473,33625:12474,33626:12475,33627:12476,33628:12477,33629:12478,33630:12479,33631:12480,33632:12481,33633:12482,33634:12483,33635:12484,33636:12485,33637:12486,33638:12487,33639:12488,33640:12489,33641:12490,33642:12491,33643:12492,33644:12493,33645:12494,33646:12495,33647:12496,33648:12497,33649:12498,33650:12499,33651:12500,33652:12501,33653:12502,33654:12503,33655:12504,33656:12505,33657:12506,33658:12507,33659:12508,33660:12509,33661:12510,33662:12511,33664:12512,33665:12513,33666:12514,33667:12515,33668:12516,33669:12517,33670:12518,33671:12519,33672:12520,33673:12521,33674:12522,33675:12523,33676:12524,33677:12525,33678:12526,33679:12527,33680:12528,33681:12529,33682:12530,33683:12531,33684:12532,33685:12533,33686:12534,33695:913,33696:914,33697:915,33698:916,33699:917,33700:918,33701:919,33702:920,33703:921,33704:922,33705:923,33706:924,33707:925,33708:926,33709:927,33710:928,33711:929,33712:931,33713:932,33714:933,33715:934,33716:935,33717:936,33718:937,33727:945,33728:946,33729:947,33730:948,33731:949,33732:950,33733:951,33734:952,33735:953,33736:954,33737:955,33738:956,33739:957,33740:958,33741:959,33742:960,33743:961,33744:963,33745:964,33746:965,33747:966,33748:967,33749:968,33750:969,33856:1040,33857:1041,33858:1042,33859:1043,33860:1044,33861:1045,33862:1025,33863:1046,33864:1047,33865:1048,33866:1049,33867:1050,33868:1051,33869:1052,33870:1053,33871:1054,33872:1055,33873:1056,33874:1057,33875:1058,33876:1059,33877:1060,33878:1061,33879:1062,33880:1063,33881:1064,33882:1065,33883:1066,33884:1067,33885:1068,33886:1069,33887:1070,33888:1071,33904:1072,33905:1073,33906:1074,33907:1075,33908:1076,33909:1077,33910:1105,33911:1078,33912:1079,33913:1080,33914:1081,33915:1082,33916:1083,33917:1084,33918:1085,33920:1086,33921:1087,33922:1088,33923:1089,33924:1090,33925:1091,33926:1092,33927:1093,33928:1094,33929:1095,33930:1096,33931:1097,33932:1098,33933:1099,33934:1100,33935:1101,33936:1102,33937:1103,33951:9472,33952:9474,33953:9484,33954:9488,33955:9496,33956:9492,33957:9500,33958:9516,33959:9508,33960:9524,33961:9532,33962:9473,33963:9475,33964:9487,33965:9491,33966:9499,33967:9495,33968:9507,33969:9523,33970:9515,33971:9531,33972:9547,33973:9504,33974:9519,33975:9512,33976:9527,33977:9535,33978:9501,33979:9520,33980:9509,33981:9528,33982:9538,34975:20124,34976:21782,34977:23043,34978:38463,34979:21696,34980:24859,34981:25384,34982:23030,34983:36898,34984:33909,34985:33564,34986:31312,34987:24746,34988:25569,34989:28197,34990:26093,34991:33894,34992:33446,34993:39925,34994:26771,34995:22311,34996:26017,34997:25201,34998:23451,34999:22992,35e3:34427,35001:39156,35002:32098,35003:32190,35004:39822,35005:25110,35006:31903,35007:34999,35008:23433,35009:24245,35010:25353,35011:26263,35012:26696,35013:38343,35014:38797,35015:26447,35016:20197,35017:20234,35018:20301,35019:20381,35020:20553,35021:22258,35022:22839,35023:22996,35024:23041,35025:23561,35026:24799,35027:24847,35028:24944,35029:26131,35030:26885,35031:28858,35032:30031,35033:30064,35034:31227,35035:32173,35036:32239,35037:32963,35038:33806,35039:34915,35040:35586,35041:36949,35042:36986,35043:21307,35044:20117,35045:20133,35046:22495,35047:32946,35048:37057,35049:30959,35050:19968,35051:22769,35052:28322,35053:36920,35054:31282,35055:33576,35056:33419,35057:39983,35058:20801,35059:21360,35060:21693,35061:21729,35062:22240,35063:23035,35064:24341,35065:39154,35066:28139,35067:32996,35068:34093,35136:38498,35137:38512,35138:38560,35139:38907,35140:21515,35141:21491,35142:23431,35143:28879,35144:32701,35145:36802,35146:38632,35147:21359,35148:40284,35149:31418,35150:19985,35151:30867,35152:33276,35153:28198,35154:22040,35155:21764,35156:27421,35157:34074,35158:39995,35159:23013,35160:21417,35161:28006,35162:29916,35163:38287,35164:22082,35165:20113,35166:36939,35167:38642,35168:33615,35169:39180,35170:21473,35171:21942,35172:23344,35173:24433,35174:26144,35175:26355,35176:26628,35177:27704,35178:27891,35179:27945,35180:29787,35181:30408,35182:31310,35183:38964,35184:33521,35185:34907,35186:35424,35187:37613,35188:28082,35189:30123,35190:30410,35191:39365,35192:24742,35193:35585,35194:36234,35195:38322,35196:27022,35197:21421,35198:20870,35200:22290,35201:22576,35202:22852,35203:23476,35204:24310,35205:24616,35206:25513,35207:25588,35208:27839,35209:28436,35210:28814,35211:28948,35212:29017,35213:29141,35214:29503,35215:32257,35216:33398,35217:33489,35218:34199,35219:36960,35220:37467,35221:40219,35222:22633,35223:26044,35224:27738,35225:29989,35226:20985,35227:22830,35228:22885,35229:24448,35230:24540,35231:25276,35232:26106,35233:27178,35234:27431,35235:27572,35236:29579,35237:32705,35238:35158,35239:40236,35240:40206,35241:40644,35242:23713,35243:27798,35244:33659,35245:20740,35246:23627,35247:25014,35248:33222,35249:26742,35250:29281,35251:20057,35252:20474,35253:21368,35254:24681,35255:28201,35256:31311,35257:38899,35258:19979,35259:21270,35260:20206,35261:20309,35262:20285,35263:20385,35264:20339,35265:21152,35266:21487,35267:22025,35268:22799,35269:23233,35270:23478,35271:23521,35272:31185,35273:26247,35274:26524,35275:26550,35276:27468,35277:27827,35278:28779,35279:29634,35280:31117,35281:31166,35282:31292,35283:31623,35284:33457,35285:33499,35286:33540,35287:33655,35288:33775,35289:33747,35290:34662,35291:35506,35292:22057,35293:36008,35294:36838,35295:36942,35296:38686,35297:34442,35298:20420,35299:23784,35300:25105,35301:29273,35302:30011,35303:33253,35304:33469,35305:34558,35306:36032,35307:38597,35308:39187,35309:39381,35310:20171,35311:20250,35312:35299,35313:22238,35314:22602,35315:22730,35316:24315,35317:24555,35318:24618,35319:24724,35320:24674,35321:25040,35322:25106,35323:25296,35324:25913,35392:39745,35393:26214,35394:26800,35395:28023,35396:28784,35397:30028,35398:30342,35399:32117,35400:33445,35401:34809,35402:38283,35403:38542,35404:35997,35405:20977,35406:21182,35407:22806,35408:21683,35409:23475,35410:23830,35411:24936,35412:27010,35413:28079,35414:30861,35415:33995,35416:34903,35417:35442,35418:37799,35419:39608,35420:28012,35421:39336,35422:34521,35423:22435,35424:26623,35425:34510,35426:37390,35427:21123,35428:22151,35429:21508,35430:24275,35431:25313,35432:25785,35433:26684,35434:26680,35435:27579,35436:29554,35437:30906,35438:31339,35439:35226,35440:35282,35441:36203,35442:36611,35443:37101,35444:38307,35445:38548,35446:38761,35447:23398,35448:23731,35449:27005,35450:38989,35451:38990,35452:25499,35453:31520,35454:27179,35456:27263,35457:26806,35458:39949,35459:28511,35460:21106,35461:21917,35462:24688,35463:25324,35464:27963,35465:28167,35466:28369,35467:33883,35468:35088,35469:36676,35470:19988,35471:39993,35472:21494,35473:26907,35474:27194,35475:38788,35476:26666,35477:20828,35478:31427,35479:33970,35480:37340,35481:37772,35482:22107,35483:40232,35484:26658,35485:33541,35486:33841,35487:31909,35488:21e3,35489:33477,35490:29926,35491:20094,35492:20355,35493:20896,35494:23506,35495:21002,35496:21208,35497:21223,35498:24059,35499:21914,35500:22570,35501:23014,35502:23436,35503:23448,35504:23515,35505:24178,35506:24185,35507:24739,35508:24863,35509:24931,35510:25022,35511:25563,35512:25954,35513:26577,35514:26707,35515:26874,35516:27454,35517:27475,35518:27735,35519:28450,35520:28567,35521:28485,35522:29872,35523:29976,35524:30435,35525:30475,35526:31487,35527:31649,35528:31777,35529:32233,35530:32566,35531:32752,35532:32925,35533:33382,35534:33694,35535:35251,35536:35532,35537:36011,35538:36996,35539:37969,35540:38291,35541:38289,35542:38306,35543:38501,35544:38867,35545:39208,35546:33304,35547:20024,35548:21547,35549:23736,35550:24012,35551:29609,35552:30284,35553:30524,35554:23721,35555:32747,35556:36107,35557:38593,35558:38929,35559:38996,35560:39e3,35561:20225,35562:20238,35563:21361,35564:21916,35565:22120,35566:22522,35567:22855,35568:23305,35569:23492,35570:23696,35571:24076,35572:24190,35573:24524,35574:25582,35575:26426,35576:26071,35577:26082,35578:26399,35579:26827,35580:26820,35648:27231,35649:24112,35650:27589,35651:27671,35652:27773,35653:30079,35654:31048,35655:23395,35656:31232,35657:32e3,35658:24509,35659:35215,35660:35352,35661:36020,35662:36215,35663:36556,35664:36637,35665:39138,35666:39438,35667:39740,35668:20096,35669:20605,35670:20736,35671:22931,35672:23452,35673:25135,35674:25216,35675:25836,35676:27450,35677:29344,35678:30097,35679:31047,35680:32681,35681:34811,35682:35516,35683:35696,35684:25516,35685:33738,35686:38816,35687:21513,35688:21507,35689:21931,35690:26708,35691:27224,35692:35440,35693:30759,35694:26485,35695:40653,35696:21364,35697:23458,35698:33050,35699:34384,35700:36870,35701:19992,35702:20037,35703:20167,35704:20241,35705:21450,35706:21560,35707:23470,35708:24339,35709:24613,35710:25937,35712:26429,35713:27714,35714:27762,35715:27875,35716:28792,35717:29699,35718:31350,35719:31406,35720:31496,35721:32026,35722:31998,35723:32102,35724:26087,35725:29275,35726:21435,35727:23621,35728:24040,35729:25298,35730:25312,35731:25369,35732:28192,35733:34394,35734:35377,35735:36317,35736:37624,35737:28417,35738:31142,35739:39770,35740:20136,35741:20139,35742:20140,35743:20379,35744:20384,35745:20689,35746:20807,35747:31478,35748:20849,35749:20982,35750:21332,35751:21281,35752:21375,35753:21483,35754:21932,35755:22659,35756:23777,35757:24375,35758:24394,35759:24623,35760:24656,35761:24685,35762:25375,35763:25945,35764:27211,35765:27841,35766:29378,35767:29421,35768:30703,35769:33016,35770:33029,35771:33288,35772:34126,35773:37111,35774:37857,35775:38911,35776:39255,35777:39514,35778:20208,35779:20957,35780:23597,35781:26241,35782:26989,35783:23616,35784:26354,35785:26997,35786:29577,35787:26704,35788:31873,35789:20677,35790:21220,35791:22343,35792:24062,35793:37670,35794:26020,35795:27427,35796:27453,35797:29748,35798:31105,35799:31165,35800:31563,35801:32202,35802:33465,35803:33740,35804:34943,35805:35167,35806:35641,35807:36817,35808:37329,35809:21535,35810:37504,35811:20061,35812:20534,35813:21477,35814:21306,35815:29399,35816:29590,35817:30697,35818:33510,35819:36527,35820:39366,35821:39368,35822:39378,35823:20855,35824:24858,35825:34398,35826:21936,35827:31354,35828:20598,35829:23507,35830:36935,35831:38533,35832:20018,35833:27355,35834:37351,35835:23633,35836:23624,35904:25496,35905:31391,35906:27795,35907:38772,35908:36705,35909:31402,35910:29066,35911:38536,35912:31874,35913:26647,35914:32368,35915:26705,35916:37740,35917:21234,35918:21531,35919:34219,35920:35347,35921:32676,35922:36557,35923:37089,35924:21350,35925:34952,35926:31041,35927:20418,35928:20670,35929:21009,35930:20804,35931:21843,35932:22317,35933:29674,35934:22411,35935:22865,35936:24418,35937:24452,35938:24693,35939:24950,35940:24935,35941:25001,35942:25522,35943:25658,35944:25964,35945:26223,35946:26690,35947:28179,35948:30054,35949:31293,35950:31995,35951:32076,35952:32153,35953:32331,35954:32619,35955:33550,35956:33610,35957:34509,35958:35336,35959:35427,35960:35686,35961:36605,35962:38938,35963:40335,35964:33464,35965:36814,35966:39912,35968:21127,35969:25119,35970:25731,35971:28608,35972:38553,35973:26689,35974:20625,35975:27424,35976:27770,35977:28500,35978:31348,35979:32080,35980:34880,35981:35363,35982:26376,35983:20214,35984:20537,35985:20518,35986:20581,35987:20860,35988:21048,35989:21091,35990:21927,35991:22287,35992:22533,35993:23244,35994:24314,35995:25010,35996:25080,35997:25331,35998:25458,35999:26908,36e3:27177,36001:29309,36002:29356,36003:29486,36004:30740,36005:30831,36006:32121,36007:30476,36008:32937,36009:35211,36010:35609,36011:36066,36012:36562,36013:36963,36014:37749,36015:38522,36016:38997,36017:39443,36018:40568,36019:20803,36020:21407,36021:21427,36022:24187,36023:24358,36024:28187,36025:28304,36026:29572,36027:29694,36028:32067,36029:33335,36030:35328,36031:35578,36032:38480,36033:20046,36034:20491,36035:21476,36036:21628,36037:22266,36038:22993,36039:23396,36040:24049,36041:24235,36042:24359,36043:25144,36044:25925,36045:26543,36046:28246,36047:29392,36048:31946,36049:34996,36050:32929,36051:32993,36052:33776,36053:34382,36054:35463,36055:36328,36056:37431,36057:38599,36058:39015,36059:40723,36060:20116,36061:20114,36062:20237,36063:21320,36064:21577,36065:21566,36066:23087,36067:24460,36068:24481,36069:24735,36070:26791,36071:27278,36072:29786,36073:30849,36074:35486,36075:35492,36076:35703,36077:37264,36078:20062,36079:39881,36080:20132,36081:20348,36082:20399,36083:20505,36084:20502,36085:20809,36086:20844,36087:21151,36088:21177,36089:21246,36090:21402,36091:21475,36092:21521,36160:21518,36161:21897,36162:22353,36163:22434,36164:22909,36165:23380,36166:23389,36167:23439,36168:24037,36169:24039,36170:24055,36171:24184,36172:24195,36173:24218,36174:24247,36175:24344,36176:24658,36177:24908,36178:25239,36179:25304,36180:25511,36181:25915,36182:26114,36183:26179,36184:26356,36185:26477,36186:26657,36187:26775,36188:27083,36189:27743,36190:27946,36191:28009,36192:28207,36193:28317,36194:30002,36195:30343,36196:30828,36197:31295,36198:31968,36199:32005,36200:32024,36201:32094,36202:32177,36203:32789,36204:32771,36205:32943,36206:32945,36207:33108,36208:33167,36209:33322,36210:33618,36211:34892,36212:34913,36213:35611,36214:36002,36215:36092,36216:37066,36217:37237,36218:37489,36219:30783,36220:37628,36221:38308,36222:38477,36224:38917,36225:39321,36226:39640,36227:40251,36228:21083,36229:21163,36230:21495,36231:21512,36232:22741,36233:25335,36234:28640,36235:35946,36236:36703,36237:40633,36238:20811,36239:21051,36240:21578,36241:22269,36242:31296,36243:37239,36244:40288,36245:40658,36246:29508,36247:28425,36248:33136,36249:29969,36250:24573,36251:24794,36252:39592,36253:29403,36254:36796,36255:27492,36256:38915,36257:20170,36258:22256,36259:22372,36260:22718,36261:23130,36262:24680,36263:25031,36264:26127,36265:26118,36266:26681,36267:26801,36268:28151,36269:30165,36270:32058,36271:33390,36272:39746,36273:20123,36274:20304,36275:21449,36276:21766,36277:23919,36278:24038,36279:24046,36280:26619,36281:27801,36282:29811,36283:30722,36284:35408,36285:37782,36286:35039,36287:22352,36288:24231,36289:25387,36290:20661,36291:20652,36292:20877,36293:26368,36294:21705,36295:22622,36296:22971,36297:23472,36298:24425,36299:25165,36300:25505,36301:26685,36302:27507,36303:28168,36304:28797,36305:37319,36306:29312,36307:30741,36308:30758,36309:31085,36310:25998,36311:32048,36312:33756,36313:35009,36314:36617,36315:38555,36316:21092,36317:22312,36318:26448,36319:32618,36320:36001,36321:20916,36322:22338,36323:38442,36324:22586,36325:27018,36326:32948,36327:21682,36328:23822,36329:22524,36330:30869,36331:40442,36332:20316,36333:21066,36334:21643,36335:25662,36336:26152,36337:26388,36338:26613,36339:31364,36340:31574,36341:32034,36342:37679,36343:26716,36344:39853,36345:31545,36346:21273,36347:20874,36348:21047,36416:23519,36417:25334,36418:25774,36419:25830,36420:26413,36421:27578,36422:34217,36423:38609,36424:30352,36425:39894,36426:25420,36427:37638,36428:39851,36429:30399,36430:26194,36431:19977,36432:20632,36433:21442,36434:23665,36435:24808,36436:25746,36437:25955,36438:26719,36439:29158,36440:29642,36441:29987,36442:31639,36443:32386,36444:34453,36445:35715,36446:36059,36447:37240,36448:39184,36449:26028,36450:26283,36451:27531,36452:20181,36453:20180,36454:20282,36455:20351,36456:21050,36457:21496,36458:21490,36459:21987,36460:22235,36461:22763,36462:22987,36463:22985,36464:23039,36465:23376,36466:23629,36467:24066,36468:24107,36469:24535,36470:24605,36471:25351,36472:25903,36473:23388,36474:26031,36475:26045,36476:26088,36477:26525,36478:27490,36480:27515,36481:27663,36482:29509,36483:31049,36484:31169,36485:31992,36486:32025,36487:32043,36488:32930,36489:33026,36490:33267,36491:35222,36492:35422,36493:35433,36494:35430,36495:35468,36496:35566,36497:36039,36498:36060,36499:38604,36500:39164,36501:27503,36502:20107,36503:20284,36504:20365,36505:20816,36506:23383,36507:23546,36508:24904,36509:25345,36510:26178,36511:27425,36512:28363,36513:27835,36514:29246,36515:29885,36516:30164,36517:30913,36518:31034,36519:32780,36520:32819,36521:33258,36522:33940,36523:36766,36524:27728,36525:40575,36526:24335,36527:35672,36528:40235,36529:31482,36530:36600,36531:23437,36532:38635,36533:19971,36534:21489,36535:22519,36536:22833,36537:23241,36538:23460,36539:24713,36540:28287,36541:28422,36542:30142,36543:36074,36544:23455,36545:34048,36546:31712,36547:20594,36548:26612,36549:33437,36550:23649,36551:34122,36552:32286,36553:33294,36554:20889,36555:23556,36556:25448,36557:36198,36558:26012,36559:29038,36560:31038,36561:32023,36562:32773,36563:35613,36564:36554,36565:36974,36566:34503,36567:37034,36568:20511,36569:21242,36570:23610,36571:26451,36572:28796,36573:29237,36574:37196,36575:37320,36576:37675,36577:33509,36578:23490,36579:24369,36580:24825,36581:20027,36582:21462,36583:23432,36584:25163,36585:26417,36586:27530,36587:29417,36588:29664,36589:31278,36590:33131,36591:36259,36592:37202,36593:39318,36594:20754,36595:21463,36596:21610,36597:23551,36598:25480,36599:27193,36600:32172,36601:38656,36602:22234,36603:21454,36604:21608,36672:23447,36673:23601,36674:24030,36675:20462,36676:24833,36677:25342,36678:27954,36679:31168,36680:31179,36681:32066,36682:32333,36683:32722,36684:33261,36685:33311,36686:33936,36687:34886,36688:35186,36689:35728,36690:36468,36691:36655,36692:36913,36693:37195,36694:37228,36695:38598,36696:37276,36697:20160,36698:20303,36699:20805,36700:21313,36701:24467,36702:25102,36703:26580,36704:27713,36705:28171,36706:29539,36707:32294,36708:37325,36709:37507,36710:21460,36711:22809,36712:23487,36713:28113,36714:31069,36715:32302,36716:31899,36717:22654,36718:29087,36719:20986,36720:34899,36721:36848,36722:20426,36723:23803,36724:26149,36725:30636,36726:31459,36727:33308,36728:39423,36729:20934,36730:24490,36731:26092,36732:26991,36733:27529,36734:28147,36736:28310,36737:28516,36738:30462,36739:32020,36740:24033,36741:36981,36742:37255,36743:38918,36744:20966,36745:21021,36746:25152,36747:26257,36748:26329,36749:28186,36750:24246,36751:32210,36752:32626,36753:26360,36754:34223,36755:34295,36756:35576,36757:21161,36758:21465,36759:22899,36760:24207,36761:24464,36762:24661,36763:37604,36764:38500,36765:20663,36766:20767,36767:21213,36768:21280,36769:21319,36770:21484,36771:21736,36772:21830,36773:21809,36774:22039,36775:22888,36776:22974,36777:23100,36778:23477,36779:23558,36780:23567,36781:23569,36782:23578,36783:24196,36784:24202,36785:24288,36786:24432,36787:25215,36788:25220,36789:25307,36790:25484,36791:25463,36792:26119,36793:26124,36794:26157,36795:26230,36796:26494,36797:26786,36798:27167,36799:27189,36800:27836,36801:28040,36802:28169,36803:28248,36804:28988,36805:28966,36806:29031,36807:30151,36808:30465,36809:30813,36810:30977,36811:31077,36812:31216,36813:31456,36814:31505,36815:31911,36816:32057,36817:32918,36818:33750,36819:33931,36820:34121,36821:34909,36822:35059,36823:35359,36824:35388,36825:35412,36826:35443,36827:35937,36828:36062,36829:37284,36830:37478,36831:37758,36832:37912,36833:38556,36834:38808,36835:19978,36836:19976,36837:19998,36838:20055,36839:20887,36840:21104,36841:22478,36842:22580,36843:22732,36844:23330,36845:24120,36846:24773,36847:25854,36848:26465,36849:26454,36850:27972,36851:29366,36852:30067,36853:31331,36854:33976,36855:35698,36856:37304,36857:37664,36858:22065,36859:22516,36860:39166,36928:25325,36929:26893,36930:27542,36931:29165,36932:32340,36933:32887,36934:33394,36935:35302,36936:39135,36937:34645,36938:36785,36939:23611,36940:20280,36941:20449,36942:20405,36943:21767,36944:23072,36945:23517,36946:23529,36947:24515,36948:24910,36949:25391,36950:26032,36951:26187,36952:26862,36953:27035,36954:28024,36955:28145,36956:30003,36957:30137,36958:30495,36959:31070,36960:31206,36961:32051,36962:33251,36963:33455,36964:34218,36965:35242,36966:35386,36967:36523,36968:36763,36969:36914,36970:37341,36971:38663,36972:20154,36973:20161,36974:20995,36975:22645,36976:22764,36977:23563,36978:29978,36979:23613,36980:33102,36981:35338,36982:36805,36983:38499,36984:38765,36985:31525,36986:35535,36987:38920,36988:37218,36989:22259,36990:21416,36992:36887,36993:21561,36994:22402,36995:24101,36996:25512,36997:27700,36998:28810,36999:30561,37e3:31883,37001:32736,37002:34928,37003:36930,37004:37204,37005:37648,37006:37656,37007:38543,37008:29790,37009:39620,37010:23815,37011:23913,37012:25968,37013:26530,37014:36264,37015:38619,37016:25454,37017:26441,37018:26905,37019:33733,37020:38935,37021:38592,37022:35070,37023:28548,37024:25722,37025:23544,37026:19990,37027:28716,37028:30045,37029:26159,37030:20932,37031:21046,37032:21218,37033:22995,37034:24449,37035:24615,37036:25104,37037:25919,37038:25972,37039:26143,37040:26228,37041:26866,37042:26646,37043:27491,37044:28165,37045:29298,37046:29983,37047:30427,37048:31934,37049:32854,37050:22768,37051:35069,37052:35199,37053:35488,37054:35475,37055:35531,37056:36893,37057:37266,37058:38738,37059:38745,37060:25993,37061:31246,37062:33030,37063:38587,37064:24109,37065:24796,37066:25114,37067:26021,37068:26132,37069:26512,37070:30707,37071:31309,37072:31821,37073:32318,37074:33034,37075:36012,37076:36196,37077:36321,37078:36447,37079:30889,37080:20999,37081:25305,37082:25509,37083:25666,37084:25240,37085:35373,37086:31363,37087:31680,37088:35500,37089:38634,37090:32118,37091:33292,37092:34633,37093:20185,37094:20808,37095:21315,37096:21344,37097:23459,37098:23554,37099:23574,37100:24029,37101:25126,37102:25159,37103:25776,37104:26643,37105:26676,37106:27849,37107:27973,37108:27927,37109:26579,37110:28508,37111:29006,37112:29053,37113:26059,37114:31359,37115:31661,37116:32218,37184:32330,37185:32680,37186:33146,37187:33307,37188:33337,37189:34214,37190:35438,37191:36046,37192:36341,37193:36984,37194:36983,37195:37549,37196:37521,37197:38275,37198:39854,37199:21069,37200:21892,37201:28472,37202:28982,37203:20840,37204:31109,37205:32341,37206:33203,37207:31950,37208:22092,37209:22609,37210:23720,37211:25514,37212:26366,37213:26365,37214:26970,37215:29401,37216:30095,37217:30094,37218:30990,37219:31062,37220:31199,37221:31895,37222:32032,37223:32068,37224:34311,37225:35380,37226:38459,37227:36961,37228:40736,37229:20711,37230:21109,37231:21452,37232:21474,37233:20489,37234:21930,37235:22766,37236:22863,37237:29245,37238:23435,37239:23652,37240:21277,37241:24803,37242:24819,37243:25436,37244:25475,37245:25407,37246:25531,37248:25805,37249:26089,37250:26361,37251:24035,37252:27085,37253:27133,37254:28437,37255:29157,37256:20105,37257:30185,37258:30456,37259:31379,37260:31967,37261:32207,37262:32156,37263:32865,37264:33609,37265:33624,37266:33900,37267:33980,37268:34299,37269:35013,37270:36208,37271:36865,37272:36973,37273:37783,37274:38684,37275:39442,37276:20687,37277:22679,37278:24974,37279:33235,37280:34101,37281:36104,37282:36896,37283:20419,37284:20596,37285:21063,37286:21363,37287:24687,37288:25417,37289:26463,37290:28204,37291:36275,37292:36895,37293:20439,37294:23646,37295:36042,37296:26063,37297:32154,37298:21330,37299:34966,37300:20854,37301:25539,37302:23384,37303:23403,37304:23562,37305:25613,37306:26449,37307:36956,37308:20182,37309:22810,37310:22826,37311:27760,37312:35409,37313:21822,37314:22549,37315:22949,37316:24816,37317:25171,37318:26561,37319:33333,37320:26965,37321:38464,37322:39364,37323:39464,37324:20307,37325:22534,37326:23550,37327:32784,37328:23729,37329:24111,37330:24453,37331:24608,37332:24907,37333:25140,37334:26367,37335:27888,37336:28382,37337:32974,37338:33151,37339:33492,37340:34955,37341:36024,37342:36864,37343:36910,37344:38538,37345:40667,37346:39899,37347:20195,37348:21488,37349:22823,37350:31532,37351:37261,37352:38988,37353:40441,37354:28381,37355:28711,37356:21331,37357:21828,37358:23429,37359:25176,37360:25246,37361:25299,37362:27810,37363:28655,37364:29730,37365:35351,37366:37944,37367:28609,37368:35582,37369:33592,37370:20967,37371:34552,37372:21482,37440:21481,37441:20294,37442:36948,37443:36784,37444:22890,37445:33073,37446:24061,37447:31466,37448:36799,37449:26842,37450:35895,37451:29432,37452:40008,37453:27197,37454:35504,37455:20025,37456:21336,37457:22022,37458:22374,37459:25285,37460:25506,37461:26086,37462:27470,37463:28129,37464:28251,37465:28845,37466:30701,37467:31471,37468:31658,37469:32187,37470:32829,37471:32966,37472:34507,37473:35477,37474:37723,37475:22243,37476:22727,37477:24382,37478:26029,37479:26262,37480:27264,37481:27573,37482:30007,37483:35527,37484:20516,37485:30693,37486:22320,37487:24347,37488:24677,37489:26234,37490:27744,37491:30196,37492:31258,37493:32622,37494:33268,37495:34584,37496:36933,37497:39347,37498:31689,37499:30044,37500:31481,37501:31569,37502:33988,37504:36880,37505:31209,37506:31378,37507:33590,37508:23265,37509:30528,37510:20013,37511:20210,37512:23449,37513:24544,37514:25277,37515:26172,37516:26609,37517:27880,37518:34411,37519:34935,37520:35387,37521:37198,37522:37619,37523:39376,37524:27159,37525:28710,37526:29482,37527:33511,37528:33879,37529:36015,37530:19969,37531:20806,37532:20939,37533:21899,37534:23541,37535:24086,37536:24115,37537:24193,37538:24340,37539:24373,37540:24427,37541:24500,37542:25074,37543:25361,37544:26274,37545:26397,37546:28526,37547:29266,37548:30010,37549:30522,37550:32884,37551:33081,37552:33144,37553:34678,37554:35519,37555:35548,37556:36229,37557:36339,37558:37530,37559:38263,37560:38914,37561:40165,37562:21189,37563:25431,37564:30452,37565:26389,37566:27784,37567:29645,37568:36035,37569:37806,37570:38515,37571:27941,37572:22684,37573:26894,37574:27084,37575:36861,37576:37786,37577:30171,37578:36890,37579:22618,37580:26626,37581:25524,37582:27131,37583:20291,37584:28460,37585:26584,37586:36795,37587:34086,37588:32180,37589:37716,37590:26943,37591:28528,37592:22378,37593:22775,37594:23340,37595:32044,37596:29226,37597:21514,37598:37347,37599:40372,37600:20141,37601:20302,37602:20572,37603:20597,37604:21059,37605:35998,37606:21576,37607:22564,37608:23450,37609:24093,37610:24213,37611:24237,37612:24311,37613:24351,37614:24716,37615:25269,37616:25402,37617:25552,37618:26799,37619:27712,37620:30855,37621:31118,37622:31243,37623:32224,37624:33351,37625:35330,37626:35558,37627:36420,37628:36883,37696:37048,37697:37165,37698:37336,37699:40718,37700:27877,37701:25688,37702:25826,37703:25973,37704:28404,37705:30340,37706:31515,37707:36969,37708:37841,37709:28346,37710:21746,37711:24505,37712:25764,37713:36685,37714:36845,37715:37444,37716:20856,37717:22635,37718:22825,37719:23637,37720:24215,37721:28155,37722:32399,37723:29980,37724:36028,37725:36578,37726:39003,37727:28857,37728:20253,37729:27583,37730:28593,37731:3e4,37732:38651,37733:20814,37734:21520,37735:22581,37736:22615,37737:22956,37738:23648,37739:24466,37740:26007,37741:26460,37742:28193,37743:30331,37744:33759,37745:36077,37746:36884,37747:37117,37748:37709,37749:30757,37750:30778,37751:21162,37752:24230,37753:22303,37754:22900,37755:24594,37756:20498,37757:20826,37758:20908,37760:20941,37761:20992,37762:21776,37763:22612,37764:22616,37765:22871,37766:23445,37767:23798,37768:23947,37769:24764,37770:25237,37771:25645,37772:26481,37773:26691,37774:26812,37775:26847,37776:30423,37777:28120,37778:28271,37779:28059,37780:28783,37781:29128,37782:24403,37783:30168,37784:31095,37785:31561,37786:31572,37787:31570,37788:31958,37789:32113,37790:21040,37791:33891,37792:34153,37793:34276,37794:35342,37795:35588,37796:35910,37797:36367,37798:36867,37799:36879,37800:37913,37801:38518,37802:38957,37803:39472,37804:38360,37805:20685,37806:21205,37807:21516,37808:22530,37809:23566,37810:24999,37811:25758,37812:27934,37813:30643,37814:31461,37815:33012,37816:33796,37817:36947,37818:37509,37819:23776,37820:40199,37821:21311,37822:24471,37823:24499,37824:28060,37825:29305,37826:30563,37827:31167,37828:31716,37829:27602,37830:29420,37831:35501,37832:26627,37833:27233,37834:20984,37835:31361,37836:26932,37837:23626,37838:40182,37839:33515,37840:23493,37841:37193,37842:28702,37843:22136,37844:23663,37845:24775,37846:25958,37847:27788,37848:35930,37849:36929,37850:38931,37851:21585,37852:26311,37853:37389,37854:22856,37855:37027,37856:20869,37857:20045,37858:20970,37859:34201,37860:35598,37861:28760,37862:25466,37863:37707,37864:26978,37865:39348,37866:32260,37867:30071,37868:21335,37869:26976,37870:36575,37871:38627,37872:27741,37873:20108,37874:23612,37875:24336,37876:36841,37877:21250,37878:36049,37879:32905,37880:34425,37881:24319,37882:26085,37883:20083,37884:20837,37952:22914,37953:23615,37954:38894,37955:20219,37956:22922,37957:24525,37958:35469,37959:28641,37960:31152,37961:31074,37962:23527,37963:33905,37964:29483,37965:29105,37966:24180,37967:24565,37968:25467,37969:25754,37970:29123,37971:31896,37972:20035,37973:24316,37974:20043,37975:22492,37976:22178,37977:24745,37978:28611,37979:32013,37980:33021,37981:33075,37982:33215,37983:36786,37984:35223,37985:34468,37986:24052,37987:25226,37988:25773,37989:35207,37990:26487,37991:27874,37992:27966,37993:29750,37994:30772,37995:23110,37996:32629,37997:33453,37998:39340,37999:20467,38e3:24259,38001:25309,38002:25490,38003:25943,38004:26479,38005:30403,38006:29260,38007:32972,38008:32954,38009:36649,38010:37197,38011:20493,38012:22521,38013:23186,38014:26757,38016:26995,38017:29028,38018:29437,38019:36023,38020:22770,38021:36064,38022:38506,38023:36889,38024:34687,38025:31204,38026:30695,38027:33833,38028:20271,38029:21093,38030:21338,38031:25293,38032:26575,38033:27850,38034:30333,38035:31636,38036:31893,38037:33334,38038:34180,38039:36843,38040:26333,38041:28448,38042:29190,38043:32283,38044:33707,38045:39361,38046:40614,38047:20989,38048:31665,38049:30834,38050:31672,38051:32903,38052:31560,38053:27368,38054:24161,38055:32908,38056:30033,38057:30048,38058:20843,38059:37474,38060:28300,38061:30330,38062:37271,38063:39658,38064:20240,38065:32624,38066:25244,38067:31567,38068:38309,38069:40169,38070:22138,38071:22617,38072:34532,38073:38588,38074:20276,38075:21028,38076:21322,38077:21453,38078:21467,38079:24070,38080:25644,38081:26001,38082:26495,38083:27710,38084:27726,38085:29256,38086:29359,38087:29677,38088:30036,38089:32321,38090:33324,38091:34281,38092:36009,38093:31684,38094:37318,38095:29033,38096:38930,38097:39151,38098:25405,38099:26217,38100:30058,38101:30436,38102:30928,38103:34115,38104:34542,38105:21290,38106:21329,38107:21542,38108:22915,38109:24199,38110:24444,38111:24754,38112:25161,38113:25209,38114:25259,38115:26e3,38116:27604,38117:27852,38118:30130,38119:30382,38120:30865,38121:31192,38122:32203,38123:32631,38124:32933,38125:34987,38126:35513,38127:36027,38128:36991,38129:38750,38130:39131,38131:27147,38132:31800,38133:20633,38134:23614,38135:24494,38136:26503,38137:27608,38138:29749,38139:30473,38140:32654,38208:40763,38209:26570,38210:31255,38211:21305,38212:30091,38213:39661,38214:24422,38215:33181,38216:33777,38217:32920,38218:24380,38219:24517,38220:30050,38221:31558,38222:36924,38223:26727,38224:23019,38225:23195,38226:32016,38227:30334,38228:35628,38229:20469,38230:24426,38231:27161,38232:27703,38233:28418,38234:29922,38235:31080,38236:34920,38237:35413,38238:35961,38239:24287,38240:25551,38241:30149,38242:31186,38243:33495,38244:37672,38245:37618,38246:33948,38247:34541,38248:39981,38249:21697,38250:24428,38251:25996,38252:27996,38253:28693,38254:36007,38255:36051,38256:38971,38257:25935,38258:29942,38259:19981,38260:20184,38261:22496,38262:22827,38263:23142,38264:23500,38265:20904,38266:24067,38267:24220,38268:24598,38269:25206,38270:25975,38272:26023,38273:26222,38274:28014,38275:29238,38276:31526,38277:33104,38278:33178,38279:33433,38280:35676,38281:36e3,38282:36070,38283:36212,38284:38428,38285:38468,38286:20398,38287:25771,38288:27494,38289:33310,38290:33889,38291:34154,38292:37096,38293:23553,38294:26963,38295:39080,38296:33914,38297:34135,38298:20239,38299:21103,38300:24489,38301:24133,38302:26381,38303:31119,38304:33145,38305:35079,38306:35206,38307:28149,38308:24343,38309:25173,38310:27832,38311:20175,38312:29289,38313:39826,38314:20998,38315:21563,38316:22132,38317:22707,38318:24996,38319:25198,38320:28954,38321:22894,38322:31881,38323:31966,38324:32027,38325:38640,38326:25991,38327:32862,38328:19993,38329:20341,38330:20853,38331:22592,38332:24163,38333:24179,38334:24330,38335:26564,38336:20006,38337:34109,38338:38281,38339:38491,38340:31859,38341:38913,38342:20731,38343:22721,38344:30294,38345:30887,38346:21029,38347:30629,38348:34065,38349:31622,38350:20559,38351:22793,38352:29255,38353:31687,38354:32232,38355:36794,38356:36820,38357:36941,38358:20415,38359:21193,38360:23081,38361:24321,38362:38829,38363:20445,38364:33303,38365:37610,38366:22275,38367:25429,38368:27497,38369:29995,38370:35036,38371:36628,38372:31298,38373:21215,38374:22675,38375:24917,38376:25098,38377:26286,38378:27597,38379:31807,38380:33769,38381:20515,38382:20472,38383:21253,38384:21574,38385:22577,38386:22857,38387:23453,38388:23792,38389:23791,38390:23849,38391:24214,38392:25265,38393:25447,38394:25918,38395:26041,38396:26379,38464:27861,38465:27873,38466:28921,38467:30770,38468:32299,38469:32990,38470:33459,38471:33804,38472:34028,38473:34562,38474:35090,38475:35370,38476:35914,38477:37030,38478:37586,38479:39165,38480:40179,38481:40300,38482:20047,38483:20129,38484:20621,38485:21078,38486:22346,38487:22952,38488:24125,38489:24536,38490:24537,38491:25151,38492:26292,38493:26395,38494:26576,38495:26834,38496:20882,38497:32033,38498:32938,38499:33192,38500:35584,38501:35980,38502:36031,38503:37502,38504:38450,38505:21536,38506:38956,38507:21271,38508:20693,38509:21340,38510:22696,38511:25778,38512:26420,38513:29287,38514:30566,38515:31302,38516:37350,38517:21187,38518:27809,38519:27526,38520:22528,38521:24140,38522:22868,38523:26412,38524:32763,38525:20961,38526:30406,38528:25705,38529:30952,38530:39764,38531:40635,38532:22475,38533:22969,38534:26151,38535:26522,38536:27598,38537:21737,38538:27097,38539:24149,38540:33180,38541:26517,38542:39850,38543:26622,38544:40018,38545:26717,38546:20134,38547:20451,38548:21448,38549:25273,38550:26411,38551:27819,38552:36804,38553:20397,38554:32365,38555:40639,38556:19975,38557:24930,38558:28288,38559:28459,38560:34067,38561:21619,38562:26410,38563:39749,38564:24051,38565:31637,38566:23724,38567:23494,38568:34588,38569:28234,38570:34001,38571:31252,38572:33032,38573:22937,38574:31885,38575:27665,38576:30496,38577:21209,38578:22818,38579:28961,38580:29279,38581:30683,38582:38695,38583:40289,38584:26891,38585:23167,38586:23064,38587:20901,38588:21517,38589:21629,38590:26126,38591:30431,38592:36855,38593:37528,38594:40180,38595:23018,38596:29277,38597:28357,38598:20813,38599:26825,38600:32191,38601:32236,38602:38754,38603:40634,38604:25720,38605:27169,38606:33538,38607:22916,38608:23391,38609:27611,38610:29467,38611:30450,38612:32178,38613:32791,38614:33945,38615:20786,38616:26408,38617:40665,38618:30446,38619:26466,38620:21247,38621:39173,38622:23588,38623:25147,38624:31870,38625:36016,38626:21839,38627:24758,38628:32011,38629:38272,38630:21249,38631:20063,38632:20918,38633:22812,38634:29242,38635:32822,38636:37326,38637:24357,38638:30690,38639:21380,38640:24441,38641:32004,38642:34220,38643:35379,38644:36493,38645:38742,38646:26611,38647:34222,38648:37971,38649:24841,38650:24840,38651:27833,38652:30290,38720:35565,38721:36664,38722:21807,38723:20305,38724:20778,38725:21191,38726:21451,38727:23461,38728:24189,38729:24736,38730:24962,38731:25558,38732:26377,38733:26586,38734:28263,38735:28044,38736:29494,38737:29495,38738:30001,38739:31056,38740:35029,38741:35480,38742:36938,38743:37009,38744:37109,38745:38596,38746:34701,38747:22805,38748:20104,38749:20313,38750:19982,38751:35465,38752:36671,38753:38928,38754:20653,38755:24188,38756:22934,38757:23481,38758:24248,38759:25562,38760:25594,38761:25793,38762:26332,38763:26954,38764:27096,38765:27915,38766:28342,38767:29076,38768:29992,38769:31407,38770:32650,38771:32768,38772:33865,38773:33993,38774:35201,38775:35617,38776:36362,38777:36965,38778:38525,38779:39178,38780:24958,38781:25233,38782:27442,38784:27779,38785:28020,38786:32716,38787:32764,38788:28096,38789:32645,38790:34746,38791:35064,38792:26469,38793:33713,38794:38972,38795:38647,38796:27931,38797:32097,38798:33853,38799:37226,38800:20081,38801:21365,38802:23888,38803:27396,38804:28651,38805:34253,38806:34349,38807:35239,38808:21033,38809:21519,38810:23653,38811:26446,38812:26792,38813:29702,38814:29827,38815:30178,38816:35023,38817:35041,38818:37324,38819:38626,38820:38520,38821:24459,38822:29575,38823:31435,38824:33870,38825:25504,38826:30053,38827:21129,38828:27969,38829:28316,38830:29705,38831:30041,38832:30827,38833:31890,38834:38534,38835:31452,38836:40845,38837:20406,38838:24942,38839:26053,38840:34396,38841:20102,38842:20142,38843:20698,38844:20001,38845:20940,38846:23534,38847:26009,38848:26753,38849:28092,38850:29471,38851:30274,38852:30637,38853:31260,38854:31975,38855:33391,38856:35538,38857:36988,38858:37327,38859:38517,38860:38936,38861:21147,38862:32209,38863:20523,38864:21400,38865:26519,38866:28107,38867:29136,38868:29747,38869:33256,38870:36650,38871:38563,38872:40023,38873:40607,38874:29792,38875:22593,38876:28057,38877:32047,38878:39006,38879:20196,38880:20278,38881:20363,38882:20919,38883:21169,38884:23994,38885:24604,38886:29618,38887:31036,38888:33491,38889:37428,38890:38583,38891:38646,38892:38666,38893:40599,38894:40802,38895:26278,38896:27508,38897:21015,38898:21155,38899:28872,38900:35010,38901:24265,38902:24651,38903:24976,38904:28451,38905:29001,38906:31806,38907:32244,38908:32879,38976:34030,38977:36899,38978:37676,38979:21570,38980:39791,38981:27347,38982:28809,38983:36034,38984:36335,38985:38706,38986:21172,38987:23105,38988:24266,38989:24324,38990:26391,38991:27004,38992:27028,38993:28010,38994:28431,38995:29282,38996:29436,38997:31725,38998:32769,38999:32894,39e3:34635,39001:37070,39002:20845,39003:40595,39004:31108,39005:32907,39006:37682,39007:35542,39008:20525,39009:21644,39010:35441,39011:27498,39012:36036,39013:33031,39014:24785,39015:26528,39016:40434,39017:20121,39018:20120,39019:39952,39020:35435,39021:34241,39022:34152,39023:26880,39024:28286,39025:30871,39026:33109,39071:24332,39072:19984,39073:19989,39074:20010,39075:20017,39076:20022,39077:20028,39078:20031,39079:20034,39080:20054,39081:20056,39082:20098,39083:20101,39084:35947,39085:20106,39086:33298,39087:24333,39088:20110,39089:20126,39090:20127,39091:20128,39092:20130,39093:20144,39094:20147,39095:20150,39096:20174,39097:20173,39098:20164,39099:20166,39100:20162,39101:20183,39102:20190,39103:20205,39104:20191,39105:20215,39106:20233,39107:20314,39108:20272,39109:20315,39110:20317,39111:20311,39112:20295,39113:20342,39114:20360,39115:20367,39116:20376,39117:20347,39118:20329,39119:20336,39120:20369,39121:20335,39122:20358,39123:20374,39124:20760,39125:20436,39126:20447,39127:20430,39128:20440,39129:20443,39130:20433,39131:20442,39132:20432,39133:20452,39134:20453,39135:20506,39136:20520,39137:20500,39138:20522,39139:20517,39140:20485,39141:20252,39142:20470,39143:20513,39144:20521,39145:20524,39146:20478,39147:20463,39148:20497,39149:20486,39150:20547,39151:20551,39152:26371,39153:20565,39154:20560,39155:20552,39156:20570,39157:20566,39158:20588,39159:20600,39160:20608,39161:20634,39162:20613,39163:20660,39164:20658,39232:20681,39233:20682,39234:20659,39235:20674,39236:20694,39237:20702,39238:20709,39239:20717,39240:20707,39241:20718,39242:20729,39243:20725,39244:20745,39245:20737,39246:20738,39247:20758,39248:20757,39249:20756,39250:20762,39251:20769,39252:20794,39253:20791,39254:20796,39255:20795,39256:20799,39257:20800,39258:20818,39259:20812,39260:20820,39261:20834,39262:31480,39263:20841,39264:20842,39265:20846,39266:20864,39267:20866,39268:22232,39269:20876,39270:20873,39271:20879,39272:20881,39273:20883,39274:20885,39275:20886,39276:20900,39277:20902,39278:20898,39279:20905,39280:20906,39281:20907,39282:20915,39283:20913,39284:20914,39285:20912,39286:20917,39287:20925,39288:20933,39289:20937,39290:20955,39291:20960,39292:34389,39293:20969,39294:20973,39296:20976,39297:20981,39298:20990,39299:20996,39300:21003,39301:21012,39302:21006,39303:21031,39304:21034,39305:21038,39306:21043,39307:21049,39308:21071,39309:21060,39310:21067,39311:21068,39312:21086,39313:21076,39314:21098,39315:21108,39316:21097,39317:21107,39318:21119,39319:21117,39320:21133,39321:21140,39322:21138,39323:21105,39324:21128,39325:21137,39326:36776,39327:36775,39328:21164,39329:21165,39330:21180,39331:21173,39332:21185,39333:21197,39334:21207,39335:21214,39336:21219,39337:21222,39338:39149,39339:21216,39340:21235,39341:21237,39342:21240,39343:21241,39344:21254,39345:21256,39346:30008,39347:21261,39348:21264,39349:21263,39350:21269,39351:21274,39352:21283,39353:21295,39354:21297,39355:21299,39356:21304,39357:21312,39358:21318,39359:21317,39360:19991,39361:21321,39362:21325,39363:20950,39364:21342,39365:21353,39366:21358,39367:22808,39368:21371,39369:21367,39370:21378,39371:21398,39372:21408,39373:21414,39374:21413,39375:21422,39376:21424,39377:21430,39378:21443,39379:31762,39380:38617,39381:21471,39382:26364,39383:29166,39384:21486,39385:21480,39386:21485,39387:21498,39388:21505,39389:21565,39390:21568,39391:21548,39392:21549,39393:21564,39394:21550,39395:21558,39396:21545,39397:21533,39398:21582,39399:21647,39400:21621,39401:21646,39402:21599,39403:21617,39404:21623,39405:21616,39406:21650,39407:21627,39408:21632,39409:21622,39410:21636,39411:21648,39412:21638,39413:21703,39414:21666,39415:21688,39416:21669,39417:21676,39418:21700,39419:21704,39420:21672,39488:21675,39489:21698,39490:21668,39491:21694,39492:21692,39493:21720,39494:21733,39495:21734,39496:21775,39497:21780,39498:21757,39499:21742,39500:21741,39501:21754,39502:21730,39503:21817,39504:21824,39505:21859,39506:21836,39507:21806,39508:21852,39509:21829,39510:21846,39511:21847,39512:21816,39513:21811,39514:21853,39515:21913,39516:21888,39517:21679,39518:21898,39519:21919,39520:21883,39521:21886,39522:21912,39523:21918,39524:21934,39525:21884,39526:21891,39527:21929,39528:21895,39529:21928,39530:21978,39531:21957,39532:21983,39533:21956,39534:21980,39535:21988,39536:21972,39537:22036,39538:22007,39539:22038,39540:22014,39541:22013,39542:22043,39543:22009,39544:22094,39545:22096,39546:29151,39547:22068,39548:22070,39549:22066,39550:22072,39552:22123,39553:22116,39554:22063,39555:22124,39556:22122,39557:22150,39558:22144,39559:22154,39560:22176,39561:22164,39562:22159,39563:22181,39564:22190,39565:22198,39566:22196,39567:22210,39568:22204,39569:22209,39570:22211,39571:22208,39572:22216,39573:22222,39574:22225,39575:22227,39576:22231,39577:22254,39578:22265,39579:22272,39580:22271,39581:22276,39582:22281,39583:22280,39584:22283,39585:22285,39586:22291,39587:22296,39588:22294,39589:21959,39590:22300,39591:22310,39592:22327,39593:22328,39594:22350,39595:22331,39596:22336,39597:22351,39598:22377,39599:22464,39600:22408,39601:22369,39602:22399,39603:22409,39604:22419,39605:22432,39606:22451,39607:22436,39608:22442,39609:22448,39610:22467,39611:22470,39612:22484,39613:22482,39614:22483,39615:22538,39616:22486,39617:22499,39618:22539,39619:22553,39620:22557,39621:22642,39622:22561,39623:22626,39624:22603,39625:22640,39626:27584,39627:22610,39628:22589,39629:22649,39630:22661,39631:22713,39632:22687,39633:22699,39634:22714,39635:22750,39636:22715,39637:22712,39638:22702,39639:22725,39640:22739,39641:22737,39642:22743,39643:22745,39644:22744,39645:22757,39646:22748,39647:22756,39648:22751,39649:22767,39650:22778,39651:22777,39652:22779,39653:22780,39654:22781,39655:22786,39656:22794,39657:22800,39658:22811,39659:26790,39660:22821,39661:22828,39662:22829,39663:22834,39664:22840,39665:22846,39666:31442,39667:22869,39668:22864,39669:22862,39670:22874,39671:22872,39672:22882,39673:22880,39674:22887,39675:22892,39676:22889,39744:22904,39745:22913,39746:22941,39747:20318,39748:20395,39749:22947,39750:22962,39751:22982,39752:23016,39753:23004,39754:22925,39755:23001,39756:23002,39757:23077,39758:23071,39759:23057,39760:23068,39761:23049,39762:23066,39763:23104,39764:23148,39765:23113,39766:23093,39767:23094,39768:23138,39769:23146,39770:23194,39771:23228,39772:23230,39773:23243,39774:23234,39775:23229,39776:23267,39777:23255,39778:23270,39779:23273,39780:23254,39781:23290,39782:23291,39783:23308,39784:23307,39785:23318,39786:23346,39787:23248,39788:23338,39789:23350,39790:23358,39791:23363,39792:23365,39793:23360,39794:23377,39795:23381,39796:23386,39797:23387,39798:23397,39799:23401,39800:23408,39801:23411,39802:23413,39803:23416,39804:25992,39805:23418,39806:23424,39808:23427,39809:23462,39810:23480,39811:23491,39812:23495,39813:23497,39814:23508,39815:23504,39816:23524,39817:23526,39818:23522,39819:23518,39820:23525,39821:23531,39822:23536,39823:23542,39824:23539,39825:23557,39826:23559,39827:23560,39828:23565,39829:23571,39830:23584,39831:23586,39832:23592,39833:23608,39834:23609,39835:23617,39836:23622,39837:23630,39838:23635,39839:23632,39840:23631,39841:23409,39842:23660,39843:23662,39844:20066,39845:23670,39846:23673,39847:23692,39848:23697,39849:23700,39850:22939,39851:23723,39852:23739,39853:23734,39854:23740,39855:23735,39856:23749,39857:23742,39858:23751,39859:23769,39860:23785,39861:23805,39862:23802,39863:23789,39864:23948,39865:23786,39866:23819,39867:23829,39868:23831,39869:23900,39870:23839,39871:23835,39872:23825,39873:23828,39874:23842,39875:23834,39876:23833,39877:23832,39878:23884,39879:23890,39880:23886,39881:23883,39882:23916,39883:23923,39884:23926,39885:23943,39886:23940,39887:23938,39888:23970,39889:23965,39890:23980,39891:23982,39892:23997,39893:23952,39894:23991,39895:23996,39896:24009,39897:24013,39898:24019,39899:24018,39900:24022,39901:24027,39902:24043,39903:24050,39904:24053,39905:24075,39906:24090,39907:24089,39908:24081,39909:24091,39910:24118,39911:24119,39912:24132,39913:24131,39914:24128,39915:24142,39916:24151,39917:24148,39918:24159,39919:24162,39920:24164,39921:24135,39922:24181,39923:24182,39924:24186,39925:40636,39926:24191,39927:24224,39928:24257,39929:24258,39930:24264,39931:24272,39932:24271,4e4:24278,40001:24291,40002:24285,40003:24282,40004:24283,40005:24290,40006:24289,40007:24296,40008:24297,40009:24300,40010:24305,40011:24307,40012:24304,40013:24308,40014:24312,40015:24318,40016:24323,40017:24329,40018:24413,40019:24412,40020:24331,40021:24337,40022:24342,40023:24361,40024:24365,40025:24376,40026:24385,40027:24392,40028:24396,40029:24398,40030:24367,40031:24401,40032:24406,40033:24407,40034:24409,40035:24417,40036:24429,40037:24435,40038:24439,40039:24451,40040:24450,40041:24447,40042:24458,40043:24456,40044:24465,40045:24455,40046:24478,40047:24473,40048:24472,40049:24480,40050:24488,40051:24493,40052:24508,40053:24534,40054:24571,40055:24548,40056:24568,40057:24561,40058:24541,40059:24755,40060:24575,40061:24609,40062:24672,40064:24601,40065:24592,40066:24617,40067:24590,40068:24625,40069:24603,40070:24597,40071:24619,40072:24614,40073:24591,40074:24634,40075:24666,40076:24641,40077:24682,40078:24695,40079:24671,40080:24650,40081:24646,40082:24653,40083:24675,40084:24643,40085:24676,40086:24642,40087:24684,40088:24683,40089:24665,40090:24705,40091:24717,40092:24807,40093:24707,40094:24730,40095:24708,40096:24731,40097:24726,40098:24727,40099:24722,40100:24743,40101:24715,40102:24801,40103:24760,40104:24800,40105:24787,40106:24756,40107:24560,40108:24765,40109:24774,40110:24757,40111:24792,40112:24909,40113:24853,40114:24838,40115:24822,40116:24823,40117:24832,40118:24820,40119:24826,40120:24835,40121:24865,40122:24827,40123:24817,40124:24845,40125:24846,40126:24903,40127:24894,40128:24872,40129:24871,40130:24906,40131:24895,40132:24892,40133:24876,40134:24884,40135:24893,40136:24898,40137:24900,40138:24947,40139:24951,40140:24920,40141:24921,40142:24922,40143:24939,40144:24948,40145:24943,40146:24933,40147:24945,40148:24927,40149:24925,40150:24915,40151:24949,40152:24985,40153:24982,40154:24967,40155:25004,40156:24980,40157:24986,40158:24970,40159:24977,40160:25003,40161:25006,40162:25036,40163:25034,40164:25033,40165:25079,40166:25032,40167:25027,40168:25030,40169:25018,40170:25035,40171:32633,40172:25037,40173:25062,40174:25059,40175:25078,40176:25082,40177:25076,40178:25087,40179:25085,40180:25084,40181:25086,40182:25088,40183:25096,40184:25097,40185:25101,40186:25100,40187:25108,40188:25115,40256:25118,40257:25121,40258:25130,40259:25134,40260:25136,40261:25138,40262:25139,40263:25153,40264:25166,40265:25182,40266:25187,40267:25179,40268:25184,40269:25192,40270:25212,40271:25218,40272:25225,40273:25214,40274:25234,40275:25235,40276:25238,40277:25300,40278:25219,40279:25236,40280:25303,40281:25297,40282:25275,40283:25295,40284:25343,40285:25286,40286:25812,40287:25288,40288:25308,40289:25292,40290:25290,40291:25282,40292:25287,40293:25243,40294:25289,40295:25356,40296:25326,40297:25329,40298:25383,40299:25346,40300:25352,40301:25327,40302:25333,40303:25424,40304:25406,40305:25421,40306:25628,40307:25423,40308:25494,40309:25486,40310:25472,40311:25515,40312:25462,40313:25507,40314:25487,40315:25481,40316:25503,40317:25525,40318:25451,40320:25449,40321:25534,40322:25577,40323:25536,40324:25542,40325:25571,40326:25545,40327:25554,40328:25590,40329:25540,40330:25622,40331:25652,40332:25606,40333:25619,40334:25638,40335:25654,40336:25885,40337:25623,40338:25640,40339:25615,40340:25703,40341:25711,40342:25718,40343:25678,40344:25898,40345:25749,40346:25747,40347:25765,40348:25769,40349:25736,40350:25788,40351:25818,40352:25810,40353:25797,40354:25799,40355:25787,40356:25816,40357:25794,40358:25841,40359:25831,40360:33289,40361:25824,40362:25825,40363:25260,40364:25827,40365:25839,40366:25900,40367:25846,40368:25844,40369:25842,40370:25850,40371:25856,40372:25853,40373:25880,40374:25884,40375:25861,40376:25892,40377:25891,40378:25899,40379:25908,40380:25909,40381:25911,40382:25910,40383:25912,40384:30027,40385:25928,40386:25942,40387:25941,40388:25933,40389:25944,40390:25950,40391:25949,40392:25970,40393:25976,40394:25986,40395:25987,40396:35722,40397:26011,40398:26015,40399:26027,40400:26039,40401:26051,40402:26054,40403:26049,40404:26052,40405:26060,40406:26066,40407:26075,40408:26073,40409:26080,40410:26081,40411:26097,40412:26482,40413:26122,40414:26115,40415:26107,40416:26483,40417:26165,40418:26166,40419:26164,40420:26140,40421:26191,40422:26180,40423:26185,40424:26177,40425:26206,40426:26205,40427:26212,40428:26215,40429:26216,40430:26207,40431:26210,40432:26224,40433:26243,40434:26248,40435:26254,40436:26249,40437:26244,40438:26264,40439:26269,40440:26305,40441:26297,40442:26313,40443:26302,40444:26300,40512:26308,40513:26296,40514:26326,40515:26330,40516:26336,40517:26175,40518:26342,40519:26345,40520:26352,40521:26357,40522:26359,40523:26383,40524:26390,40525:26398,40526:26406,40527:26407,40528:38712,40529:26414,40530:26431,40531:26422,40532:26433,40533:26424,40534:26423,40535:26438,40536:26462,40537:26464,40538:26457,40539:26467,40540:26468,40541:26505,40542:26480,40543:26537,40544:26492,40545:26474,40546:26508,40547:26507,40548:26534,40549:26529,40550:26501,40551:26551,40552:26607,40553:26548,40554:26604,40555:26547,40556:26601,40557:26552,40558:26596,40559:26590,40560:26589,40561:26594,40562:26606,40563:26553,40564:26574,40565:26566,40566:26599,40567:27292,40568:26654,40569:26694,40570:26665,40571:26688,40572:26701,40573:26674,40574:26702,40576:26803,40577:26667,40578:26713,40579:26723,40580:26743,40581:26751,40582:26783,40583:26767,40584:26797,40585:26772,40586:26781,40587:26779,40588:26755,40589:27310,40590:26809,40591:26740,40592:26805,40593:26784,40594:26810,40595:26895,40596:26765,40597:26750,40598:26881,40599:26826,40600:26888,40601:26840,40602:26914,40603:26918,40604:26849,40605:26892,40606:26829,40607:26836,40608:26855,40609:26837,40610:26934,40611:26898,40612:26884,40613:26839,40614:26851,40615:26917,40616:26873,40617:26848,40618:26863,40619:26920,40620:26922,40621:26906,40622:26915,40623:26913,40624:26822,40625:27001,40626:26999,40627:26972,40628:27e3,40629:26987,40630:26964,40631:27006,40632:26990,40633:26937,40634:26996,40635:26941,40636:26969,40637:26928,40638:26977,40639:26974,40640:26973,40641:27009,40642:26986,40643:27058,40644:27054,40645:27088,40646:27071,40647:27073,40648:27091,40649:27070,40650:27086,40651:23528,40652:27082,40653:27101,40654:27067,40655:27075,40656:27047,40657:27182,40658:27025,40659:27040,40660:27036,40661:27029,40662:27060,40663:27102,40664:27112,40665:27138,40666:27163,40667:27135,40668:27402,40669:27129,40670:27122,40671:27111,40672:27141,40673:27057,40674:27166,40675:27117,40676:27156,40677:27115,40678:27146,40679:27154,40680:27329,40681:27171,40682:27155,40683:27204,40684:27148,40685:27250,40686:27190,40687:27256,40688:27207,40689:27234,40690:27225,40691:27238,40692:27208,40693:27192,40694:27170,40695:27280,40696:27277,40697:27296,40698:27268,40699:27298,40700:27299,40768:27287,40769:34327,40770:27323,40771:27331,40772:27330,40773:27320,40774:27315,40775:27308,40776:27358,40777:27345,40778:27359,40779:27306,40780:27354,40781:27370,40782:27387,40783:27397,40784:34326,40785:27386,40786:27410,40787:27414,40788:39729,40789:27423,40790:27448,40791:27447,40792:30428,40793:27449,40794:39150,40795:27463,40796:27459,40797:27465,40798:27472,40799:27481,40800:27476,40801:27483,40802:27487,40803:27489,40804:27512,40805:27513,40806:27519,40807:27520,40808:27524,40809:27523,40810:27533,40811:27544,40812:27541,40813:27550,40814:27556,40815:27562,40816:27563,40817:27567,40818:27570,40819:27569,40820:27571,40821:27575,40822:27580,40823:27590,40824:27595,40825:27603,40826:27615,40827:27628,40828:27627,40829:27635,40830:27631,40832:40638,40833:27656,40834:27667,40835:27668,40836:27675,40837:27684,40838:27683,40839:27742,40840:27733,40841:27746,40842:27754,40843:27778,40844:27789,40845:27802,40846:27777,40847:27803,40848:27774,40849:27752,40850:27763,40851:27794,40852:27792,40853:27844,40854:27889,40855:27859,40856:27837,40857:27863,40858:27845,40859:27869,40860:27822,40861:27825,40862:27838,40863:27834,40864:27867,40865:27887,40866:27865,40867:27882,40868:27935,40869:34893,40870:27958,40871:27947,40872:27965,40873:27960,40874:27929,40875:27957,40876:27955,40877:27922,40878:27916,40879:28003,40880:28051,40881:28004,40882:27994,40883:28025,40884:27993,40885:28046,40886:28053,40887:28644,40888:28037,40889:28153,40890:28181,40891:28170,40892:28085,40893:28103,40894:28134,40895:28088,40896:28102,40897:28140,40898:28126,40899:28108,40900:28136,40901:28114,40902:28101,40903:28154,40904:28121,40905:28132,40906:28117,40907:28138,40908:28142,40909:28205,40910:28270,40911:28206,40912:28185,40913:28274,40914:28255,40915:28222,40916:28195,40917:28267,40918:28203,40919:28278,40920:28237,40921:28191,40922:28227,40923:28218,40924:28238,40925:28196,40926:28415,40927:28189,40928:28216,40929:28290,40930:28330,40931:28312,40932:28361,40933:28343,40934:28371,40935:28349,40936:28335,40937:28356,40938:28338,40939:28372,40940:28373,40941:28303,40942:28325,40943:28354,40944:28319,40945:28481,40946:28433,40947:28748,40948:28396,40949:28408,40950:28414,40951:28479,40952:28402,40953:28465,40954:28399,40955:28466,40956:28364,161:65377,162:65378,163:65379,164:65380,165:65381,166:65382,167:65383,168:65384,169:65385,170:65386,171:65387,172:65388,173:65389,174:65390,175:65391,176:65392,177:65393,178:65394,179:65395,180:65396,181:65397,182:65398,183:65399,184:65400,185:65401,186:65402,187:65403,188:65404,189:65405,190:65406,191:65407,192:65408,193:65409,194:65410,195:65411,196:65412,197:65413,198:65414,199:65415,200:65416,201:65417,202:65418,203:65419,204:65420,205:65421,206:65422,207:65423,208:65424,209:65425,210:65426,211:65427,212:65428,213:65429,214:65430,215:65431,216:65432,217:65433,218:65434,219:65435,220:65436,221:65437,222:65438,223:65439,57408:28478,57409:28435,57410:28407,57411:28550,57412:28538,57413:28536,57414:28545,57415:28544,57416:28527,57417:28507,57418:28659,57419:28525,57420:28546,57421:28540,57422:28504,57423:28558,57424:28561,57425:28610,57426:28518,57427:28595,57428:28579,57429:28577,57430:28580,57431:28601,57432:28614,57433:28586,57434:28639,57435:28629,57436:28652,57437:28628,57438:28632,57439:28657,57440:28654,57441:28635,57442:28681,57443:28683,57444:28666,57445:28689,57446:28673,57447:28687,57448:28670,57449:28699,57450:28698,57451:28532,57452:28701,57453:28696,57454:28703,57455:28720,57456:28734,57457:28722,57458:28753,57459:28771,57460:28825,57461:28818,57462:28847,57463:28913,57464:28844,57465:28856,57466:28851,57467:28846,57468:28895,57469:28875,57470:28893,57472:28889,57473:28937,57474:28925,57475:28956,57476:28953,57477:29029,57478:29013,57479:29064,57480:29030,57481:29026,57482:29004,57483:29014,57484:29036,57485:29071,57486:29179,57487:29060,57488:29077,57489:29096,57490:29100,57491:29143,57492:29113,57493:29118,57494:29138,57495:29129,57496:29140,57497:29134,57498:29152,57499:29164,57500:29159,57501:29173,57502:29180,57503:29177,57504:29183,57505:29197,57506:29200,57507:29211,57508:29224,57509:29229,57510:29228,57511:29232,57512:29234,57513:29243,57514:29244,57515:29247,57516:29248,57517:29254,57518:29259,57519:29272,57520:29300,57521:29310,57522:29314,57523:29313,57524:29319,57525:29330,57526:29334,57527:29346,57528:29351,57529:29369,57530:29362,57531:29379,57532:29382,57533:29380,57534:29390,57535:29394,57536:29410,57537:29408,57538:29409,57539:29433,57540:29431,57541:20495,57542:29463,57543:29450,57544:29468,57545:29462,57546:29469,57547:29492,57548:29487,57549:29481,57550:29477,57551:29502,57552:29518,57553:29519,57554:40664,57555:29527,57556:29546,57557:29544,57558:29552,57559:29560,57560:29557,57561:29563,57562:29562,57563:29640,57564:29619,57565:29646,57566:29627,57567:29632,57568:29669,57569:29678,57570:29662,57571:29858,57572:29701,57573:29807,57574:29733,57575:29688,57576:29746,57577:29754,57578:29781,57579:29759,57580:29791,57581:29785,57582:29761,57583:29788,57584:29801,57585:29808,57586:29795,57587:29802,57588:29814,57589:29822,57590:29835,57591:29854,57592:29863,57593:29898,57594:29903,57595:29908,57596:29681,57664:29920,57665:29923,57666:29927,57667:29929,57668:29934,57669:29938,57670:29936,57671:29937,57672:29944,57673:29943,57674:29956,57675:29955,57676:29957,57677:29964,57678:29966,57679:29965,57680:29973,57681:29971,57682:29982,57683:29990,57684:29996,57685:30012,57686:30020,57687:30029,57688:30026,57689:30025,57690:30043,57691:30022,57692:30042,57693:30057,57694:30052,57695:30055,57696:30059,57697:30061,57698:30072,57699:30070,57700:30086,57701:30087,57702:30068,57703:30090,57704:30089,57705:30082,57706:30100,57707:30106,57708:30109,57709:30117,57710:30115,57711:30146,57712:30131,57713:30147,57714:30133,57715:30141,57716:30136,57717:30140,57718:30129,57719:30157,57720:30154,57721:30162,57722:30169,57723:30179,57724:30174,57725:30206,57726:30207,57728:30204,57729:30209,57730:30192,57731:30202,57732:30194,57733:30195,57734:30219,57735:30221,57736:30217,57737:30239,57738:30247,57739:30240,57740:30241,57741:30242,57742:30244,57743:30260,57744:30256,57745:30267,57746:30279,57747:30280,57748:30278,57749:30300,57750:30296,57751:30305,57752:30306,57753:30312,57754:30313,57755:30314,57756:30311,57757:30316,57758:30320,57759:30322,57760:30326,57761:30328,57762:30332,57763:30336,57764:30339,57765:30344,57766:30347,57767:30350,57768:30358,57769:30355,57770:30361,57771:30362,57772:30384,57773:30388,57774:30392,57775:30393,57776:30394,57777:30402,57778:30413,57779:30422,57780:30418,57781:30430,57782:30433,57783:30437,57784:30439,57785:30442,57786:34351,57787:30459,57788:30472,57789:30471,57790:30468,57791:30505,57792:30500,57793:30494,57794:30501,57795:30502,57796:30491,57797:30519,57798:30520,57799:30535,57800:30554,57801:30568,57802:30571,57803:30555,57804:30565,57805:30591,57806:30590,57807:30585,57808:30606,57809:30603,57810:30609,57811:30624,57812:30622,57813:30640,57814:30646,57815:30649,57816:30655,57817:30652,57818:30653,57819:30651,57820:30663,57821:30669,57822:30679,57823:30682,57824:30684,57825:30691,57826:30702,57827:30716,57828:30732,57829:30738,57830:31014,57831:30752,57832:31018,57833:30789,57834:30862,57835:30836,57836:30854,57837:30844,57838:30874,57839:30860,57840:30883,57841:30901,57842:30890,57843:30895,57844:30929,57845:30918,57846:30923,57847:30932,57848:30910,57849:30908,57850:30917,57851:30922,57852:30956,57920:30951,57921:30938,57922:30973,57923:30964,57924:30983,57925:30994,57926:30993,57927:31001,57928:31020,57929:31019,57930:31040,57931:31072,57932:31063,57933:31071,57934:31066,57935:31061,57936:31059,57937:31098,57938:31103,57939:31114,57940:31133,57941:31143,57942:40779,57943:31146,57944:31150,57945:31155,57946:31161,57947:31162,57948:31177,57949:31189,57950:31207,57951:31212,57952:31201,57953:31203,57954:31240,57955:31245,57956:31256,57957:31257,57958:31264,57959:31263,57960:31104,57961:31281,57962:31291,57963:31294,57964:31287,57965:31299,57966:31319,57967:31305,57968:31329,57969:31330,57970:31337,57971:40861,57972:31344,57973:31353,57974:31357,57975:31368,57976:31383,57977:31381,57978:31384,57979:31382,57980:31401,57981:31432,57982:31408,57984:31414,57985:31429,57986:31428,57987:31423,57988:36995,57989:31431,57990:31434,57991:31437,57992:31439,57993:31445,57994:31443,57995:31449,57996:31450,57997:31453,57998:31457,57999:31458,58e3:31462,58001:31469,58002:31472,58003:31490,58004:31503,58005:31498,58006:31494,58007:31539,58008:31512,58009:31513,58010:31518,58011:31541,58012:31528,58013:31542,58014:31568,58015:31610,58016:31492,58017:31565,58018:31499,58019:31564,58020:31557,58021:31605,58022:31589,58023:31604,58024:31591,58025:31600,58026:31601,58027:31596,58028:31598,58029:31645,58030:31640,58031:31647,58032:31629,58033:31644,58034:31642,58035:31627,58036:31634,58037:31631,58038:31581,58039:31641,58040:31691,58041:31681,58042:31692,58043:31695,58044:31668,58045:31686,58046:31709,58047:31721,58048:31761,58049:31764,58050:31718,58051:31717,58052:31840,58053:31744,58054:31751,58055:31763,58056:31731,58057:31735,58058:31767,58059:31757,58060:31734,58061:31779,58062:31783,58063:31786,58064:31775,58065:31799,58066:31787,58067:31805,58068:31820,58069:31811,58070:31828,58071:31823,58072:31808,58073:31824,58074:31832,58075:31839,58076:31844,58077:31830,58078:31845,58079:31852,58080:31861,58081:31875,58082:31888,58083:31908,58084:31917,58085:31906,58086:31915,58087:31905,58088:31912,58089:31923,58090:31922,58091:31921,58092:31918,58093:31929,58094:31933,58095:31936,58096:31941,58097:31938,58098:31960,58099:31954,58100:31964,58101:31970,58102:39739,58103:31983,58104:31986,58105:31988,58106:31990,58107:31994,58108:32006,58176:32002,58177:32028,58178:32021,58179:32010,58180:32069,58181:32075,58182:32046,58183:32050,58184:32063,58185:32053,58186:32070,58187:32115,58188:32086,58189:32078,58190:32114,58191:32104,58192:32110,58193:32079,58194:32099,58195:32147,58196:32137,58197:32091,58198:32143,58199:32125,58200:32155,58201:32186,58202:32174,58203:32163,58204:32181,58205:32199,58206:32189,58207:32171,58208:32317,58209:32162,58210:32175,58211:32220,58212:32184,58213:32159,58214:32176,58215:32216,58216:32221,58217:32228,58218:32222,58219:32251,58220:32242,58221:32225,58222:32261,58223:32266,58224:32291,58225:32289,58226:32274,58227:32305,58228:32287,58229:32265,58230:32267,58231:32290,58232:32326,58233:32358,58234:32315,58235:32309,58236:32313,58237:32323,58238:32311,58240:32306,58241:32314,58242:32359,58243:32349,58244:32342,58245:32350,58246:32345,58247:32346,58248:32377,58249:32362,58250:32361,58251:32380,58252:32379,58253:32387,58254:32213,58255:32381,58256:36782,58257:32383,58258:32392,58259:32393,58260:32396,58261:32402,58262:32400,58263:32403,58264:32404,58265:32406,58266:32398,58267:32411,58268:32412,58269:32568,58270:32570,58271:32581,58272:32588,58273:32589,58274:32590,58275:32592,58276:32593,58277:32597,58278:32596,58279:32600,58280:32607,58281:32608,58282:32616,58283:32617,58284:32615,58285:32632,58286:32642,58287:32646,58288:32643,58289:32648,58290:32647,58291:32652,58292:32660,58293:32670,58294:32669,58295:32666,58296:32675,58297:32687,58298:32690,58299:32697,58300:32686,58301:32694,58302:32696,58303:35697,58304:32709,58305:32710,58306:32714,58307:32725,58308:32724,58309:32737,58310:32742,58311:32745,58312:32755,58313:32761,58314:39132,58315:32774,58316:32772,58317:32779,58318:32786,58319:32792,58320:32793,58321:32796,58322:32801,58323:32808,58324:32831,58325:32827,58326:32842,58327:32838,58328:32850,58329:32856,58330:32858,58331:32863,58332:32866,58333:32872,58334:32883,58335:32882,58336:32880,58337:32886,58338:32889,58339:32893,58340:32895,58341:32900,58342:32902,58343:32901,58344:32923,58345:32915,58346:32922,58347:32941,58348:20880,58349:32940,58350:32987,58351:32997,58352:32985,58353:32989,58354:32964,58355:32986,58356:32982,58357:33033,58358:33007,58359:33009,58360:33051,58361:33065,58362:33059,58363:33071,58364:33099,58432:38539,58433:33094,58434:33086,58435:33107,58436:33105,58437:33020,58438:33137,58439:33134,58440:33125,58441:33126,58442:33140,58443:33155,58444:33160,58445:33162,58446:33152,58447:33154,58448:33184,58449:33173,58450:33188,58451:33187,58452:33119,58453:33171,58454:33193,58455:33200,58456:33205,58457:33214,58458:33208,58459:33213,58460:33216,58461:33218,58462:33210,58463:33225,58464:33229,58465:33233,58466:33241,58467:33240,58468:33224,58469:33242,58470:33247,58471:33248,58472:33255,58473:33274,58474:33275,58475:33278,58476:33281,58477:33282,58478:33285,58479:33287,58480:33290,58481:33293,58482:33296,58483:33302,58484:33321,58485:33323,58486:33336,58487:33331,58488:33344,58489:33369,58490:33368,58491:33373,58492:33370,58493:33375,58494:33380,58496:33378,58497:33384,58498:33386,58499:33387,58500:33326,58501:33393,58502:33399,58503:33400,58504:33406,58505:33421,58506:33426,58507:33451,58508:33439,58509:33467,58510:33452,58511:33505,58512:33507,58513:33503,58514:33490,58515:33524,58516:33523,58517:33530,58518:33683,58519:33539,58520:33531,58521:33529,58522:33502,58523:33542,58524:33500,58525:33545,58526:33497,58527:33589,58528:33588,58529:33558,58530:33586,58531:33585,58532:33600,58533:33593,58534:33616,58535:33605,58536:33583,58537:33579,58538:33559,58539:33560,58540:33669,58541:33690,58542:33706,58543:33695,58544:33698,58545:33686,58546:33571,58547:33678,58548:33671,58549:33674,58550:33660,58551:33717,58552:33651,58553:33653,58554:33696,58555:33673,58556:33704,58557:33780,58558:33811,58559:33771,58560:33742,58561:33789,58562:33795,58563:33752,58564:33803,58565:33729,58566:33783,58567:33799,58568:33760,58569:33778,58570:33805,58571:33826,58572:33824,58573:33725,58574:33848,58575:34054,58576:33787,58577:33901,58578:33834,58579:33852,58580:34138,58581:33924,58582:33911,58583:33899,58584:33965,58585:33902,58586:33922,58587:33897,58588:33862,58589:33836,58590:33903,58591:33913,58592:33845,58593:33994,58594:33890,58595:33977,58596:33983,58597:33951,58598:34009,58599:33997,58600:33979,58601:34010,58602:34e3,58603:33985,58604:33990,58605:34006,58606:33953,58607:34081,58608:34047,58609:34036,58610:34071,58611:34072,58612:34092,58613:34079,58614:34069,58615:34068,58616:34044,58617:34112,58618:34147,58619:34136,58620:34120,58688:34113,58689:34306,58690:34123,58691:34133,58692:34176,58693:34212,58694:34184,58695:34193,58696:34186,58697:34216,58698:34157,58699:34196,58700:34203,58701:34282,58702:34183,58703:34204,58704:34167,58705:34174,58706:34192,58707:34249,58708:34234,58709:34255,58710:34233,58711:34256,58712:34261,58713:34269,58714:34277,58715:34268,58716:34297,58717:34314,58718:34323,58719:34315,58720:34302,58721:34298,58722:34310,58723:34338,58724:34330,58725:34352,58726:34367,58727:34381,58728:20053,58729:34388,58730:34399,58731:34407,58732:34417,58733:34451,58734:34467,58735:34473,58736:34474,58737:34443,58738:34444,58739:34486,58740:34479,58741:34500,58742:34502,58743:34480,58744:34505,58745:34851,58746:34475,58747:34516,58748:34526,58749:34537,58750:34540,58752:34527,58753:34523,58754:34543,58755:34578,58756:34566,58757:34568,58758:34560,58759:34563,58760:34555,58761:34577,58762:34569,58763:34573,58764:34553,58765:34570,58766:34612,58767:34623,58768:34615,58769:34619,58770:34597,58771:34601,58772:34586,58773:34656,58774:34655,58775:34680,58776:34636,58777:34638,58778:34676,58779:34647,58780:34664,58781:34670,58782:34649,58783:34643,58784:34659,58785:34666,58786:34821,58787:34722,58788:34719,58789:34690,58790:34735,58791:34763,58792:34749,58793:34752,58794:34768,58795:38614,58796:34731,58797:34756,58798:34739,58799:34759,58800:34758,58801:34747,58802:34799,58803:34802,58804:34784,58805:34831,58806:34829,58807:34814,58808:34806,58809:34807,58810:34830,58811:34770,58812:34833,58813:34838,58814:34837,58815:34850,58816:34849,58817:34865,58818:34870,58819:34873,58820:34855,58821:34875,58822:34884,58823:34882,58824:34898,58825:34905,58826:34910,58827:34914,58828:34923,58829:34945,58830:34942,58831:34974,58832:34933,58833:34941,58834:34997,58835:34930,58836:34946,58837:34967,58838:34962,58839:34990,58840:34969,58841:34978,58842:34957,58843:34980,58844:34992,58845:35007,58846:34993,58847:35011,58848:35012,58849:35028,58850:35032,58851:35033,58852:35037,58853:35065,58854:35074,58855:35068,58856:35060,58857:35048,58858:35058,58859:35076,58860:35084,58861:35082,58862:35091,58863:35139,58864:35102,58865:35109,58866:35114,58867:35115,58868:35137,58869:35140,58870:35131,58871:35126,58872:35128,58873:35148,58874:35101,58875:35168,58876:35166,58944:35174,58945:35172,58946:35181,58947:35178,58948:35183,58949:35188,58950:35191,58951:35198,58952:35203,58953:35208,58954:35210,58955:35219,58956:35224,58957:35233,58958:35241,58959:35238,58960:35244,58961:35247,58962:35250,58963:35258,58964:35261,58965:35263,58966:35264,58967:35290,58968:35292,58969:35293,58970:35303,58971:35316,58972:35320,58973:35331,58974:35350,58975:35344,58976:35340,58977:35355,58978:35357,58979:35365,58980:35382,58981:35393,58982:35419,58983:35410,58984:35398,58985:35400,58986:35452,58987:35437,58988:35436,58989:35426,58990:35461,58991:35458,58992:35460,58993:35496,58994:35489,58995:35473,58996:35493,58997:35494,58998:35482,58999:35491,59e3:35524,59001:35533,59002:35522,59003:35546,59004:35563,59005:35571,59006:35559,59008:35556,59009:35569,59010:35604,59011:35552,59012:35554,59013:35575,59014:35550,59015:35547,59016:35596,59017:35591,59018:35610,59019:35553,59020:35606,59021:35600,59022:35607,59023:35616,59024:35635,59025:38827,59026:35622,59027:35627,59028:35646,59029:35624,59030:35649,59031:35660,59032:35663,59033:35662,59034:35657,59035:35670,59036:35675,59037:35674,59038:35691,59039:35679,59040:35692,59041:35695,59042:35700,59043:35709,59044:35712,59045:35724,59046:35726,59047:35730,59048:35731,59049:35734,59050:35737,59051:35738,59052:35898,59053:35905,59054:35903,59055:35912,59056:35916,59057:35918,59058:35920,59059:35925,59060:35938,59061:35948,59062:35960,59063:35962,59064:35970,59065:35977,59066:35973,59067:35978,59068:35981,59069:35982,59070:35988,59071:35964,59072:35992,59073:25117,59074:36013,59075:36010,59076:36029,59077:36018,59078:36019,59079:36014,59080:36022,59081:36040,59082:36033,59083:36068,59084:36067,59085:36058,59086:36093,59087:36090,59088:36091,59089:36100,59090:36101,59091:36106,59092:36103,59093:36111,59094:36109,59095:36112,59096:40782,59097:36115,59098:36045,59099:36116,59100:36118,59101:36199,59102:36205,59103:36209,59104:36211,59105:36225,59106:36249,59107:36290,59108:36286,59109:36282,59110:36303,59111:36314,59112:36310,59113:36300,59114:36315,59115:36299,59116:36330,59117:36331,59118:36319,59119:36323,59120:36348,59121:36360,59122:36361,59123:36351,59124:36381,59125:36382,59126:36368,59127:36383,59128:36418,59129:36405,59130:36400,59131:36404,59132:36426,59200:36423,59201:36425,59202:36428,59203:36432,59204:36424,59205:36441,59206:36452,59207:36448,59208:36394,59209:36451,59210:36437,59211:36470,59212:36466,59213:36476,59214:36481,59215:36487,59216:36485,59217:36484,59218:36491,59219:36490,59220:36499,59221:36497,59222:36500,59223:36505,59224:36522,59225:36513,59226:36524,59227:36528,59228:36550,59229:36529,59230:36542,59231:36549,59232:36552,59233:36555,59234:36571,59235:36579,59236:36604,59237:36603,59238:36587,59239:36606,59240:36618,59241:36613,59242:36629,59243:36626,59244:36633,59245:36627,59246:36636,59247:36639,59248:36635,59249:36620,59250:36646,59251:36659,59252:36667,59253:36665,59254:36677,59255:36674,59256:36670,59257:36684,59258:36681,59259:36678,59260:36686,59261:36695,59262:36700,59264:36706,59265:36707,59266:36708,59267:36764,59268:36767,59269:36771,59270:36781,59271:36783,59272:36791,59273:36826,59274:36837,59275:36834,59276:36842,59277:36847,59278:36999,59279:36852,59280:36869,59281:36857,59282:36858,59283:36881,59284:36885,59285:36897,59286:36877,59287:36894,59288:36886,59289:36875,59290:36903,59291:36918,59292:36917,59293:36921,59294:36856,59295:36943,59296:36944,59297:36945,59298:36946,59299:36878,59300:36937,59301:36926,59302:36950,59303:36952,59304:36958,59305:36968,59306:36975,59307:36982,59308:38568,59309:36978,59310:36994,59311:36989,59312:36993,59313:36992,59314:37002,59315:37001,59316:37007,59317:37032,59318:37039,59319:37041,59320:37045,59321:37090,59322:37092,59323:25160,59324:37083,59325:37122,59326:37138,59327:37145,59328:37170,59329:37168,59330:37194,59331:37206,59332:37208,59333:37219,59334:37221,59335:37225,59336:37235,59337:37234,59338:37259,59339:37257,59340:37250,59341:37282,59342:37291,59343:37295,59344:37290,59345:37301,59346:37300,59347:37306,59348:37312,59349:37313,59350:37321,59351:37323,59352:37328,59353:37334,59354:37343,59355:37345,59356:37339,59357:37372,59358:37365,59359:37366,59360:37406,59361:37375,59362:37396,59363:37420,59364:37397,59365:37393,59366:37470,59367:37463,59368:37445,59369:37449,59370:37476,59371:37448,59372:37525,59373:37439,59374:37451,59375:37456,59376:37532,59377:37526,59378:37523,59379:37531,59380:37466,59381:37583,59382:37561,59383:37559,59384:37609,59385:37647,59386:37626,59387:37700,59388:37678,59456:37657,59457:37666,59458:37658,59459:37667,59460:37690,59461:37685,59462:37691,59463:37724,59464:37728,59465:37756,59466:37742,59467:37718,59468:37808,59469:37804,59470:37805,59471:37780,59472:37817,59473:37846,59474:37847,59475:37864,59476:37861,59477:37848,59478:37827,59479:37853,59480:37840,59481:37832,59482:37860,59483:37914,59484:37908,59485:37907,59486:37891,59487:37895,59488:37904,59489:37942,59490:37931,59491:37941,59492:37921,59493:37946,59494:37953,59495:37970,59496:37956,59497:37979,59498:37984,59499:37986,59500:37982,59501:37994,59502:37417,59503:38e3,59504:38005,59505:38007,59506:38013,59507:37978,59508:38012,59509:38014,59510:38017,59511:38015,59512:38274,59513:38279,59514:38282,59515:38292,59516:38294,59517:38296,59518:38297,59520:38304,59521:38312,59522:38311,59523:38317,59524:38332,59525:38331,59526:38329,59527:38334,59528:38346,59529:28662,59530:38339,59531:38349,59532:38348,59533:38357,59534:38356,59535:38358,59536:38364,59537:38369,59538:38373,59539:38370,59540:38433,59541:38440,59542:38446,59543:38447,59544:38466,59545:38476,59546:38479,59547:38475,59548:38519,59549:38492,59550:38494,59551:38493,59552:38495,59553:38502,59554:38514,59555:38508,59556:38541,59557:38552,59558:38549,59559:38551,59560:38570,59561:38567,59562:38577,59563:38578,59564:38576,59565:38580,59566:38582,59567:38584,59568:38585,59569:38606,59570:38603,59571:38601,59572:38605,59573:35149,59574:38620,59575:38669,59576:38613,59577:38649,59578:38660,59579:38662,59580:38664,59581:38675,59582:38670,59583:38673,59584:38671,59585:38678,59586:38681,59587:38692,59588:38698,59589:38704,59590:38713,59591:38717,59592:38718,59593:38724,59594:38726,59595:38728,59596:38722,59597:38729,59598:38748,59599:38752,59600:38756,59601:38758,59602:38760,59603:21202,59604:38763,59605:38769,59606:38777,59607:38789,59608:38780,59609:38785,59610:38778,59611:38790,59612:38795,59613:38799,59614:38800,59615:38812,59616:38824,59617:38822,59618:38819,59619:38835,59620:38836,59621:38851,59622:38854,59623:38856,59624:38859,59625:38876,59626:38893,59627:40783,59628:38898,59629:31455,59630:38902,59631:38901,59632:38927,59633:38924,59634:38968,59635:38948,59636:38945,59637:38967,59638:38973,59639:38982,59640:38991,59641:38987,59642:39019,59643:39023,59644:39024,59712:39025,59713:39028,59714:39027,59715:39082,59716:39087,59717:39089,59718:39094,59719:39108,59720:39107,59721:39110,59722:39145,59723:39147,59724:39171,59725:39177,59726:39186,59727:39188,59728:39192,59729:39201,59730:39197,59731:39198,59732:39204,59733:39200,59734:39212,59735:39214,59736:39229,59737:39230,59738:39234,59739:39241,59740:39237,59741:39248,59742:39243,59743:39249,59744:39250,59745:39244,59746:39253,59747:39319,59748:39320,59749:39333,59750:39341,59751:39342,59752:39356,59753:39391,59754:39387,59755:39389,59756:39384,59757:39377,59758:39405,59759:39406,59760:39409,59761:39410,59762:39419,59763:39416,59764:39425,59765:39439,59766:39429,59767:39394,59768:39449,59769:39467,59770:39479,59771:39493,59772:39490,59773:39488,59774:39491,59776:39486,59777:39509,59778:39501,59779:39515,59780:39511,59781:39519,59782:39522,59783:39525,59784:39524,59785:39529,59786:39531,59787:39530,59788:39597,59789:39600,59790:39612,59791:39616,59792:39631,59793:39633,59794:39635,59795:39636,59796:39646,59797:39647,59798:39650,59799:39651,59800:39654,59801:39663,59802:39659,59803:39662,59804:39668,59805:39665,59806:39671,59807:39675,59808:39686,59809:39704,59810:39706,59811:39711,59812:39714,59813:39715,59814:39717,59815:39719,59816:39720,59817:39721,59818:39722,59819:39726,59820:39727,59821:39730,59822:39748,59823:39747,59824:39759,59825:39757,59826:39758,59827:39761,59828:39768,59829:39796,59830:39827,59831:39811,59832:39825,59833:39830,59834:39831,59835:39839,59836:39840,59837:39848,59838:39860,59839:39872,59840:39882,59841:39865,59842:39878,59843:39887,59844:39889,59845:39890,59846:39907,59847:39906,59848:39908,59849:39892,59850:39905,59851:39994,59852:39922,59853:39921,59854:39920,59855:39957,59856:39956,59857:39945,59858:39955,59859:39948,59860:39942,59861:39944,59862:39954,59863:39946,59864:39940,59865:39982,59866:39963,59867:39973,59868:39972,59869:39969,59870:39984,59871:40007,59872:39986,59873:40006,59874:39998,59875:40026,59876:40032,59877:40039,59878:40054,59879:40056,59880:40167,59881:40172,59882:40176,59883:40201,59884:40200,59885:40171,59886:40195,59887:40198,59888:40234,59889:40230,59890:40367,59891:40227,59892:40223,59893:40260,59894:40213,59895:40210,59896:40257,59897:40255,59898:40254,59899:40262,59900:40264,59968:40285,59969:40286,59970:40292,59971:40273,59972:40272,59973:40281,59974:40306,59975:40329,59976:40327,59977:40363,59978:40303,59979:40314,59980:40346,59981:40356,59982:40361,59983:40370,59984:40388,59985:40385,59986:40379,59987:40376,59988:40378,59989:40390,59990:40399,59991:40386,59992:40409,59993:40403,59994:40440,59995:40422,59996:40429,59997:40431,59998:40445,59999:40474,6e4:40475,60001:40478,60002:40565,60003:40569,60004:40573,60005:40577,60006:40584,60007:40587,60008:40588,60009:40594,60010:40597,60011:40593,60012:40605,60013:40613,60014:40617,60015:40632,60016:40618,60017:40621,60018:38753,60019:40652,60020:40654,60021:40655,60022:40656,60023:40660,60024:40668,60025:40670,60026:40669,60027:40672,60028:40677,60029:40680,60030:40687,60032:40692,60033:40694,60034:40695,60035:40697,60036:40699,60037:40700,60038:40701,60039:40711,60040:40712,60041:30391,60042:40725,60043:40737,60044:40748,60045:40766,60046:40778,60047:40786,60048:40788,60049:40803,60050:40799,60051:40800,60052:40801,60053:40806,60054:40807,60055:40812,60056:40810,60057:40823,60058:40818,60059:40822,60060:40853,60061:40860,60062:40864,60063:22575,60064:27079,60065:36953,60066:29796,60067:20956,60068:29081}},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t=r(1),c=r(2);e.decode=function(o,e){var r=new Uint8ClampedArray(o.length);r.set(o);for(var s=new t.default(285,256,0),a=new c.default(s,r),n=new Uint8ClampedArray(e),d=!1,l=0;l<e;l++){var i=a.evaluateAt(s.exp(l+s.generatorBase));n[n.length-1-l]=i,0!==i&&(d=!0)}if(!d)return r;var B=new c.default(s,n),k=function(o,e,r,t){var c;e.degree()<r.degree()&&(e=(c=[r,e])[0],r=c[1]);for(var s=e,a=r,n=o.zero,d=o.one;a.degree()>=t/2;){var l=s,i=n;if(n=d,(s=a).isZero())return null;a=l;for(var B=o.zero,k=s.getCoefficient(s.degree()),u=o.inverse(k);a.degree()>=s.degree()&&!a.isZero();){var C=a.degree()-s.degree(),f=o.multiply(a.getCoefficient(a.degree()),u);B=B.addOrSubtract(o.buildMonomial(C,f)),a=a.addOrSubtract(s.multiplyByMonomial(C,f))}if(d=B.multiplyPoly(n).addOrSubtract(i),a.degree()>=s.degree())return null}var m=d.getCoefficient(0);if(0===m)return null;var w=o.inverse(m);return[d.multiply(w),a.multiply(w)]}(s,s.buildMonomial(e,1),B,e);if(null===k)return null;var u=function(o,e){var r=e.degree();if(1===r)return[e.getCoefficient(1)];for(var t=new Array(r),c=0,s=1;s<o.size&&c<r;s++)0===e.evaluateAt(s)&&(t[c]=o.inverse(s),c++);return c!==r?null:t}(s,k[0]);if(null==u)return null;for(var C=function(o,e,r){for(var c=r.length,s=new Array(c),a=0;a<c;a++){for(var n=o.inverse(r[a]),d=1,l=0;l<c;l++)a!==l&&(d=o.multiply(d,t.addOrSubtractGF(1,o.multiply(r[l],n))));s[a]=o.multiply(e.evaluateAt(n),o.inverse(d)),0!==o.generatorBase&&(s[a]=o.multiply(s[a],n))}return s}(s,k[1],u),f=0;f<u.length;f++){var m=r.length-1-s.log(u[f]);if(m<0)return null;r[m]=t.addOrSubtractGF(r[m],C[f])}return r}},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0}),e.VERSIONS=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,versionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,dataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,versionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},{numBlocks:61,dataCodewordsPerBlock:16}]}]}]},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t=r(0);function c(o,e,r,t){var c=o.x-e.x+r.x-t.x,s=o.y-e.y+r.y-t.y;if(0===c&&0===s)return{a11:e.x-o.x,a12:e.y-o.y,a13:0,a21:r.x-e.x,a22:r.y-e.y,a23:0,a31:o.x,a32:o.y,a33:1};var a=e.x-r.x,n=t.x-r.x,d=e.y-r.y,l=t.y-r.y,i=a*l-n*d,B=(c*l-n*s)/i,k=(a*s-c*d)/i;return{a11:e.x-o.x+B*e.x,a12:e.y-o.y+B*e.y,a13:B,a21:t.x-o.x+k*t.x,a22:t.y-o.y+k*t.y,a23:k,a31:o.x,a32:o.y,a33:1}}e.extract=function(o,e){for(var r,s,a={a11:(u=c({x:3.5,y:3.5},{x:e.dimension-3.5,y:3.5},{x:e.dimension-6.5,y:e.dimension-6.5},{x:3.5,y:e.dimension-3.5})).a22*u.a33-u.a23*u.a32,a12:u.a13*u.a32-u.a12*u.a33,a13:u.a12*u.a23-u.a13*u.a22,a21:u.a23*u.a31-u.a21*u.a33,a22:u.a11*u.a33-u.a13*u.a31,a23:u.a13*u.a21-u.a11*u.a23,a31:u.a21*u.a32-u.a22*u.a31,a32:u.a12*u.a31-u.a11*u.a32,a33:u.a11*u.a22-u.a12*u.a21},n={a11:(r=c(e.topLeft,e.topRight,e.alignmentPattern,e.bottomLeft)).a11*(s=a).a11+r.a21*s.a12+r.a31*s.a13,a12:r.a12*s.a11+r.a22*s.a12+r.a32*s.a13,a13:r.a13*s.a11+r.a23*s.a12+r.a33*s.a13,a21:r.a11*s.a21+r.a21*s.a22+r.a31*s.a23,a22:r.a12*s.a21+r.a22*s.a22+r.a32*s.a23,a23:r.a13*s.a21+r.a23*s.a22+r.a33*s.a23,a31:r.a11*s.a31+r.a21*s.a32+r.a31*s.a33,a32:r.a12*s.a31+r.a22*s.a32+r.a32*s.a33,a33:r.a13*s.a31+r.a23*s.a32+r.a33*s.a33},d=t.BitMatrix.createEmpty(e.dimension,e.dimension),l=function(o,e){var r=n.a13*o+n.a23*e+n.a33;return{x:(n.a11*o+n.a21*e+n.a31)/r,y:(n.a12*o+n.a22*e+n.a32)/r}},i=0;i<e.dimension;i++)for(var B=0;B<e.dimension;B++){var k=l(B+.5,i+.5);d.set(B,i,o.get(Math.floor(k.x),Math.floor(k.y)))}var u;return{matrix:d,mappingFunction:l}}},function(o,e,r){Object.defineProperty(e,"__esModule",{value:!0});var t=function(o,e){return Math.sqrt(Math.pow(e.x-o.x,2)+Math.pow(e.y-o.y,2))};function c(o){return o.reduce(function(o,e){return o+e})}function s(o,e,r,c){var s,a,n,d,l=[{x:Math.floor(o.x),y:Math.floor(o.y)}],i=Math.abs(e.y-o.y)>Math.abs(e.x-o.x);i?(s=Math.floor(o.y),a=Math.floor(o.x),n=Math.floor(e.y),d=Math.floor(e.x)):(s=Math.floor(o.x),a=Math.floor(o.y),n=Math.floor(e.x),d=Math.floor(e.y));for(var B=Math.abs(n-s),k=Math.abs(d-a),u=Math.floor(-B/2),C=s<n?1:-1,f=a<d?1:-1,m=!0,w=s,P=a;w!==n+C;w+=C){var v=i?P:w,h=i?w:P;if(r.get(v,h)!==m&&(m=!m,l.push({x:v,y:h}),l.length===c+1))break;if((u+=k)>0){if(P===d)break;P+=f,u-=B}}for(var y=[],p=0;p<c;p++)y.push(l[p]&&l[p+1]?t(l[p],l[p+1]):0);return y}function a(o,e,r,t){var c,a=e.y-o.y,n=e.x-o.x,d=s(o,e,r,Math.ceil(t/2)),l=s(o,{x:o.x-n,y:o.y-a},r,Math.ceil(t/2)),i=d.shift()+l.shift()-1;return(c=l.concat(i)).concat.apply(c,d)}function n(o,e){var r=c(o)/c(e),t=0;return e.forEach(function(e,c){t+=Math.pow(o[c]-e*r,2)}),{averageSize:r,error:t}}function d(o,e,r){try{var t=a(o,{x:-1,y:o.y},r,e.length),c=a(o,{x:o.x,y:-1},r,e.length),s=a(o,{x:Math.max(0,o.x-o.y)-1,y:Math.max(0,o.y-o.x)-1},r,e.length),d=a(o,{x:Math.min(r.width,o.x+o.y)+1,y:Math.min(r.height,o.y+o.x)+1},r,e.length),l=n(t,e),i=n(c,e),B=n(s,e),k=n(d,e),u=Math.sqrt(l.error*l.error+i.error*i.error+B.error*B.error+k.error*k.error),C=(l.averageSize+i.averageSize+B.averageSize+k.averageSize)/4;return u+(Math.pow(l.averageSize-C,2)+Math.pow(i.averageSize-C,2)+Math.pow(B.averageSize-C,2)+Math.pow(k.averageSize-C,2))/C}catch(o){return Infinity}}function l(o,e){for(var r=Math.round(e.x);o.get(r,Math.round(e.y));)r--;for(var t=Math.round(e.x);o.get(t,Math.round(e.y));)t++;for(var c=(r+t)/2,s=Math.round(e.y);o.get(Math.round(c),s);)s--;for(var a=Math.round(e.y);o.get(Math.round(c),a);)a++;return{x:c,y:(s+a)/2}}function i(o,e,r,s,n){var l,i,B;try{l=function(o,e,r,s){var n=(c(a(o,r,s,5))/7+c(a(o,e,s,5))/7+c(a(r,o,s,5))/7+c(a(e,o,s,5))/7)/4;if(n<1)throw new Error("Invalid module size");var d=Math.round(t(o,e)/n),l=Math.round(t(o,r)/n),i=Math.floor((d+l)/2)+7;switch(i%4){case 0:i++;break;case 2:i--}return{dimension:i,moduleSize:n}}(s,r,n,o),i=l.dimension,B=l.moduleSize}catch(o){return null}var k=r.x-s.x+n.x,u=r.y-s.y+n.y,C=(t(s,n)+t(s,r))/2/B,f=1-3/C,m={x:s.x+f*(k-s.x),y:s.y+f*(u-s.y)},w=e.map(function(e){var r=(e.top.startX+e.top.endX+e.bottom.startX+e.bottom.endX)/4,s=(e.top.y+e.bottom.y+1)/2;if(o.get(Math.floor(r),Math.floor(s)))return c([e.top.endX-e.top.startX,e.bottom.endX-e.bottom.startX,e.bottom.y-e.top.y+1]),{x:r,y:s,score:d({x:Math.floor(r),y:Math.floor(s)},[1,1,1],o)+t({x:r,y:s},m)}}).filter(function(o){return!!o}).sort(function(o,e){return o.score-e.score});return{alignmentPattern:C>=15&&w.length?w[0]:m,dimension:i}}e.locate=function(o){for(var e=[],r=[],s=[],a=[],n=function(t){for(var n=0,d=!1,l=[0,0,0,0,0],i=function(e){var s=o.get(e,t);if(s===d)n++;else{l=[l[1],l[2],l[3],l[4],n],n=1,d=s;var i=c(l)/7,B=Math.abs(l[0]-i)<i&&Math.abs(l[1]-i)<i&&Math.abs(l[2]-3*i)<3*i&&Math.abs(l[3]-i)<i&&Math.abs(l[4]-i)<i&&!s,k=c(l.slice(-3))/3,u=Math.abs(l[2]-k)<k&&Math.abs(l[3]-k)<k&&Math.abs(l[4]-k)<k&&s;if(B){var C=e-l[3]-l[4],f=C-l[2],m={startX:f,endX:C,y:t};(w=r.filter(function(o){return f>=o.bottom.startX&&f<=o.bottom.endX||C>=o.bottom.startX&&f<=o.bottom.endX||f<=o.bottom.startX&&C>=o.bottom.endX&&l[2]/(o.bottom.endX-o.bottom.startX)<1.5&&l[2]/(o.bottom.endX-o.bottom.startX)>.5})).length>0?w[0].bottom=m:r.push({top:m,bottom:m})}if(u){var w,P=e-l[4],v=P-l[3];m={startX:v,y:t,endX:P},(w=a.filter(function(o){return v>=o.bottom.startX&&v<=o.bottom.endX||P>=o.bottom.startX&&v<=o.bottom.endX||v<=o.bottom.startX&&P>=o.bottom.endX&&l[2]/(o.bottom.endX-o.bottom.startX)<1.5&&l[2]/(o.bottom.endX-o.bottom.startX)>.5})).length>0?w[0].bottom=m:a.push({top:m,bottom:m})}}},B=-1;B<=o.width;B++)i(B);e.push.apply(e,r.filter(function(o){return o.bottom.y!==t&&o.bottom.y-o.top.y>=2})),r=r.filter(function(o){return o.bottom.y===t}),s.push.apply(s,a.filter(function(o){return o.bottom.y!==t})),a=a.filter(function(o){return o.bottom.y===t})},B=0;B<=o.height;B++)n(B);e.push.apply(e,r.filter(function(o){return o.bottom.y-o.top.y>=2})),s.push.apply(s,a);var k=e.filter(function(o){return o.bottom.y-o.top.y>=2}).map(function(e){var r=(e.top.startX+e.top.endX+e.bottom.startX+e.bottom.endX)/4,t=(e.top.y+e.bottom.y+1)/2;if(o.get(Math.round(r),Math.round(t))){var s=[e.top.endX-e.top.startX,e.bottom.endX-e.bottom.startX,e.bottom.y-e.top.y+1],a=c(s)/s.length;return{score:d({x:Math.round(r),y:Math.round(t)},[1,1,3,1,1],o),x:r,y:t,size:a}}}).filter(function(o){return!!o}).sort(function(o,e){return o.score-e.score}).map(function(o,e,r){if(e>4)return null;var t=r.filter(function(o,r){return e!==r}).map(function(e){return{x:e.x,y:e.y,score:e.score+Math.pow(e.size-o.size,2)/o.size,size:e.size}}).sort(function(o,e){return o.score-e.score});if(t.length<2)return null;var c=o.score+t[0].score+t[1].score;return{points:[o].concat(t.slice(0,2)),score:c}}).filter(function(o){return!!o}).sort(function(o,e){return o.score-e.score});if(0===k.length)return null;var u=function(o,e,r){var c,s,a,n,d,l,i,B=t(o,e),k=t(e,r),u=t(o,r);return k>=B&&k>=u?(d=(c=[e,o,r])[0],l=c[1],i=c[2]):u>=k&&u>=B?(d=(s=[o,e,r])[0],l=s[1],i=s[2]):(d=(a=[o,r,e])[0],l=a[1],i=a[2]),(i.x-l.x)*(d.y-l.y)-(i.y-l.y)*(d.x-l.x)<0&&(d=(n=[i,d])[0],i=n[1]),{bottomLeft:d,topLeft:l,topRight:i}}(k[0].points[0],k[0].points[1],k[0].points[2]),C=u.topRight,f=u.topLeft,m=u.bottomLeft,w=i(o,s,C,f,m),P=[];w&&P.push({alignmentPattern:{x:w.alignmentPattern.x,y:w.alignmentPattern.y},bottomLeft:{x:m.x,y:m.y},dimension:w.dimension,topLeft:{x:f.x,y:f.y},topRight:{x:C.x,y:C.y}});var v=l(o,C),h=l(o,f),y=l(o,m),p=i(o,s,v,h,y);return p&&P.push({alignmentPattern:{x:p.alignmentPattern.x,y:p.alignmentPattern.y},bottomLeft:{x:y.x,y:y.y},topLeft:{x:h.x,y:h.y},topRight:{x:v.x,y:v.y},dimension:p.dimension}),0===P.length?null:P}}]).default},o.exports=r()}(e={exports:{}}),e.exports));self.addEventListener("message",function(o){var e=o.data,t=r(e.data,e.width,e.height),c=null,s=null;null!==t&&(c=t.data,s=t.location),self.postMessage({content:c,location:s,imageData:e},[e.data.buffer])})});
`], {
            type: "text/javascript"
          }));
          var jsqr = function() {
            return new Worker(built_worker);
          };
          function useCommonApi(emit) {
            function onDetect(_x) {
              return _onDetect.apply(this, arguments);
            }
            function _onDetect() {
              _onDetect = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resultPromise) {
                var _yield$resultPromise, content;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        emit("detect", resultPromise);
                        _context.prev = 1;
                        _context.next = 4;
                        return resultPromise;
                      case 4:
                        _yield$resultPromise = _context.sent;
                        content = _yield$resultPromise.content;
                        if (content !== null) {
                          emit("decode", content);
                        }
                        _context.next = 11;
                        break;
                      case 9:
                        _context.prev = 9;
                        _context.t0 = _context["catch"](1);
                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[1, 9]]);
              }));
              return _onDetect.apply(this, arguments);
            }
            return {
              onDetect
            };
          }
          var CameraType;
          (function(CameraType2) {
            CameraType2["auto"] = "auto";
            CameraType2["rear"] = "rear";
            CameraType2["off"] = "off";
            CameraType2["front"] = "front";
          })(CameraType || (CameraType = {}));
          var QrStreamvue_type_script_lang_ts = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
            name: "QrStream",
            props: {
              camera: {
                type: String,
                default: "auto"
              },
              torch: {
                type: Boolean,
                default: false
              },
              track: {
                type: [Function, Boolean],
                default: true
              },
              worker: {
                type: Function,
                default: jsqr
              }
            },
            setup: function setup(props, _ref) {
              var emit = _ref.emit;
              var CommonApi = useCommonApi(emit);
              var state = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["reactive"])({
                cameraInstance: null,
                destroyed: false,
                stopScanning: function stopScanning() {
                },
                video: null,
                trackingLayer: null,
                pauseFrame: null,
                shouldStream: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function() {
                  return state.destroyed === false && props.camera !== CameraType.off;
                }),
                shouldScan: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function() {
                  return state.shouldStream === true && state.cameraInstance !== null;
                }),
                /**
                 * Minimum delay in milliseconds between frames to be scanned. Don't scan
                 * so often when visual tracking is disabled to improve performance.
                 */
                scanInterval: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function() {
                  if (props.track === false) {
                    return 500;
                  } else {
                    return 40;
                  }
                }),
                trackRepaintFunction: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["computed"])(function() {
                  if (props.track === true) {
                    return thinSquare({
                      color: "#ff0000"
                    });
                  } else if (props.track === false) {
                    return void 0;
                  } else {
                    return props.track;
                  }
                })
              });
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(function() {
                return state.shouldStream;
              }, function(shouldStream) {
                if (!shouldStream) {
                  var frame = state.cameraInstance.captureFrame();
                  paintPauseFrame(frame);
                }
              });
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(function() {
                return state.shouldScan;
              }, function(shouldScan) {
                if (shouldScan) {
                  clearPauseFrame();
                  clearTrackingLayer();
                  startScanning();
                } else {
                  state.stopScanning();
                }
              });
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(function() {
                return props.torch;
              }, function() {
                init();
              });
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(function() {
                return props.camera;
              }, function() {
                init();
              });
              function init() {
                var promise = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                  var capabilities;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          beforeResetCamera();
                          if (!(props.camera === "off")) {
                            _context.next = 6;
                            break;
                          }
                          state.cameraInstance = null;
                          return _context.abrupt("return", {
                            capabilities: {}
                          });
                        case 6:
                          _context.next = 8;
                          return misc_camera(state.video, {
                            camera: props.camera,
                            torch: props.torch
                          });
                        case 8:
                          state.cameraInstance = _context.sent;
                          capabilities = state.cameraInstance.getCapabilities();
                          if (state.destroyed) {
                            state.cameraInstance.stop();
                          }
                          return _context.abrupt("return", {
                            capabilities
                          });
                        case 12:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }))();
                emit("init", promise);
              }
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(function() {
                init();
              });
              Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onUnmounted"])(function() {
                beforeResetCamera();
                state.stopScanning();
                state.destroyed = true;
              });
              function startScanning() {
                var detectHandler = function detectHandler2(result) {
                  CommonApi.onDetect(Promise.resolve(result));
                };
                state.stopScanning = keepScanning(props.worker, state.cameraInstance, {
                  detectHandler,
                  locateHandler: onLocate,
                  minDelay: state.scanInterval
                });
              }
              function beforeResetCamera() {
                if (state.cameraInstance !== null) {
                  state.cameraInstance.stop();
                  state.cameraInstance = null;
                }
              }
              function onLocate(location2) {
                if (state.trackRepaintFunction === void 0 || location2 === null) {
                  clearTrackingLayer();
                } else {
                  repaintTrackingLayer(location2);
                }
              }
              function repaintTrackingLayer(location2) {
                var video = state.video;
                var canvas2 = state.trackingLayer;
                var ctx = canvas2.getContext("2d");
                var displayWidth = video.offsetWidth;
                var displayHeight = video.offsetHeight;
                var resolutionWidth = video.videoWidth;
                var resolutionHeight = video.videoHeight;
                var largerRatio = Math.max(displayWidth / resolutionWidth, displayHeight / resolutionHeight);
                var uncutWidth = resolutionWidth * largerRatio;
                var uncutHeight = resolutionHeight * largerRatio;
                var xScalar = uncutWidth / resolutionWidth;
                var yScalar = uncutHeight / resolutionHeight;
                var xOffset = (displayWidth - uncutWidth) / 2;
                var yOffset = (displayHeight - uncutHeight) / 2;
                var coordinatesAdjusted = {};
                for (var key in location2) {
                  coordinatesAdjusted[key] = {
                    x: Math.floor(location2[key].x * xScalar + xOffset),
                    y: Math.floor(location2[key].y * yScalar + yOffset)
                  };
                }
                window.requestAnimationFrame(function() {
                  canvas2.width = displayWidth;
                  canvas2.height = displayHeight;
                  state.trackRepaintFunction(coordinatesAdjusted, ctx);
                });
              }
              function clearTrackingLayer() {
                var canvas2 = state.trackingLayer;
                var ctx = canvas2.getContext("2d");
                window.requestAnimationFrame(function() {
                  ctx.clearRect(0, 0, canvas2.width, canvas2.height);
                });
              }
              function paintPauseFrame(imageData) {
                var canvas2 = state.pauseFrame;
                var ctx = canvas2.getContext("2d");
                window.requestAnimationFrame(function() {
                  canvas2.width = imageData.width;
                  canvas2.height = imageData.height;
                  ctx.putImageData(imageData, 0, 0);
                });
              }
              function clearPauseFrame() {
                var canvas2 = state.pauseFrame;
                var ctx = canvas2.getContext("2d");
                window.requestAnimationFrame(function() {
                  ctx.clearRect(0, 0, canvas2.width, canvas2.height);
                });
              }
              return _objectSpread2(_objectSpread2({}, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toRefs"])(state)), {}, {
                init
              });
            }
          });
          var QrStreamvue_type_style_index_0_id_f73a6250_lang_css_scoped_true = __webpack_require__("5951");
          QrStreamvue_type_script_lang_ts.render = QrStreamvue_type_template_id_f73a6250_scoped_true_bindings_render;
          QrStreamvue_type_script_lang_ts.__scopeId = "data-v-f73a6250";
          var QrStream = QrStreamvue_type_script_lang_ts;
          function QrDropzonevue_type_template_id_6daecc35_bindings_worker_props_onDrop_setup_onDragOver_setup_render(_ctx, _cache, $props, $setup, $data, $options) {
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])("div", {
              onDrop: _cache[1] || (_cache[1] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function() {
                return $setup.onDrop.apply($setup, arguments);
              }, ["prevent", "stop"])),
              onDragenter: _cache[2] || (_cache[2] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function($event) {
                return $setup.onDragOver(true);
              }, ["prevent", "stop"])),
              onDragleave: _cache[3] || (_cache[3] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function($event) {
                return $setup.onDragOver(false);
              }, ["prevent", "stop"])),
              onDragover: _cache[4] || (_cache[4] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function() {
              }, ["prevent", "stop"]))
            }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "default")], 32);
          }
          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr))
              return _arrayLikeToArray(arr);
          }
          function _iterableToArray(iter) {
            if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
              return Array.from(iter);
          }
          function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function _toConsumableArray(arr) {
            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
          }
          var QrDropzonevue_type_script_lang_ts = {
            name: "QrDropzone",
            props: {
              worker: {
                type: Function,
                default: jsqr
              }
            },
            setup: function setup(props, _ref) {
              var emit = _ref.emit;
              var CommonApi = useCommonApi(emit);
              function onDragOver(isDraggingOver) {
                emit("dragover", isDraggingOver);
              }
              function onDrop(_ref2) {
                var dataTransfer = _ref2.dataTransfer;
                onDragOver(false);
                var droppedFiles = _toConsumableArray(dataTransfer.files);
                var droppedUrl = dataTransfer.getData("text/uri-list");
                droppedFiles.forEach(function(file) {
                  CommonApi.onDetect(processFile(file));
                });
                if (droppedUrl !== "") {
                  CommonApi.onDetect(processUrl(droppedUrl));
                }
              }
              function processFile(_x) {
                return _processFile.apply(this, arguments);
              }
              function _processFile() {
                _processFile = _asyncToGenerator(regeneratorRuntime.mark(function _callee(file) {
                  var imageData, scanResult;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return imageDataFromFile(file);
                        case 2:
                          imageData = _context.sent;
                          _context.next = 5;
                          return scan(props.worker, imageData);
                        case 5:
                          scanResult = _context.sent;
                          return _context.abrupt("return", scanResult);
                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                return _processFile.apply(this, arguments);
              }
              function processUrl(_x2) {
                return _processUrl.apply(this, arguments);
              }
              function _processUrl() {
                _processUrl = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(url) {
                  var imageData, scanResult;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return imageDataFromUrl(url);
                        case 2:
                          imageData = _context2.sent;
                          _context2.next = 5;
                          return scan(props.worker, imageData);
                        case 5:
                          scanResult = _context2.sent;
                          return _context2.abrupt("return", scanResult);
                        case 7:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));
                return _processUrl.apply(this, arguments);
              }
              return {
                onDrop,
                onDragOver
              };
            }
          };
          QrDropzonevue_type_script_lang_ts.render = QrDropzonevue_type_template_id_6daecc35_bindings_worker_props_onDrop_setup_onDragOver_setup_render;
          var QrDropzone = QrDropzonevue_type_script_lang_ts;
          function QrCapturevue_type_template_id_1a289218_bindings_worker_props_onChangeInput_setup_render(_ctx, _cache, $props, $setup, $data, $options) {
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])("input", {
              onChange: _cache[1] || (_cache[1] = function() {
                return $setup.onChangeInput.apply($setup, arguments);
              }),
              type: "file",
              name: "image",
              accept: "image/*",
              capture: "environment",
              multiple: ""
            }, null, 32);
          }
          var es_array_map = __webpack_require__("d81d");
          var QrCapturevue_type_script_lang_ts = {
            name: "QrCapture",
            props: {
              worker: {
                type: Function,
                default: jsqr
              }
            },
            setup: function setup(props, _ref) {
              var emit = _ref.emit;
              var CommonApi = useCommonApi(emit);
              function onChangeInput(event) {
                var files = _toConsumableArray(event.target.files);
                var resultPromises = files.map(processFile);
                resultPromises.forEach(CommonApi.onDetect);
              }
              function processFile(_x) {
                return _processFile.apply(this, arguments);
              }
              function _processFile() {
                _processFile = _asyncToGenerator(regeneratorRuntime.mark(function _callee(file) {
                  var imageData, scanResult;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return imageDataFromFile(file);
                        case 2:
                          imageData = _context.sent;
                          _context.next = 5;
                          return scan(props.worker, imageData);
                        case 5:
                          scanResult = _context.sent;
                          return _context.abrupt("return", scanResult);
                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                return _processFile.apply(this, arguments);
              }
              return {
                onChangeInput
              };
            }
          };
          QrCapturevue_type_script_lang_ts.render = QrCapturevue_type_template_id_1a289218_bindings_worker_props_onChangeInput_setup_render;
          var QrCapture = QrCapturevue_type_script_lang_ts;
          var main_install = function install(app) {
            app.component("qr-stream", QrStream);
            app.component("qr-dropzone", QrDropzone);
            app.component("qr-capture", QrCapture);
          };
          var main_plugin = {
            install: main_install
          };
          var main = main_plugin;
          var entry_lib = __webpack_exports__["default"] = main;
        }
      ),
      /***/
      "fb6a": (
        /***/
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var $ = __webpack_require__("23e7");
          var isObject2 = __webpack_require__("861d");
          var isArray2 = __webpack_require__("e8b5");
          var toAbsoluteIndex = __webpack_require__("23cb");
          var toLength = __webpack_require__("50c4");
          var toIndexedObject = __webpack_require__("fc6a");
          var createProperty = __webpack_require__("8418");
          var wellKnownSymbol = __webpack_require__("b622");
          var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
          var USES_TO_LENGTH = arrayMethodUsesToLength("slice", { ACCESSORS: true, 0: 0, 1: 2 });
          var SPECIES = wellKnownSymbol("species");
          var nativeSlice = [].slice;
          var max = Math.max;
          $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
            slice: function slice(start, end) {
              var O = toIndexedObject(this);
              var length = toLength(O.length);
              var k = toAbsoluteIndex(start, length);
              var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
              var Constructor, result, n;
              if (isArray2(O)) {
                Constructor = O.constructor;
                if (typeof Constructor == "function" && (Constructor === Array || isArray2(Constructor.prototype))) {
                  Constructor = void 0;
                } else if (isObject2(Constructor)) {
                  Constructor = Constructor[SPECIES];
                  if (Constructor === null)
                    Constructor = void 0;
                }
                if (Constructor === Array || Constructor === void 0) {
                  return nativeSlice.call(O, k, fin);
                }
              }
              result = new (Constructor === void 0 ? Array : Constructor)(max(fin - k, 0));
              for (n = 0; k < fin; k++, n++)
                if (k in O)
                  createProperty(result, n, O[k]);
              result.length = n;
              return result;
            }
          });
        }
      ),
      /***/
      "fc6a": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var IndexedObject = __webpack_require__("44ad");
          var requireObjectCoercible = __webpack_require__("1d80");
          module2.exports = function(it) {
            return IndexedObject(requireObjectCoercible(it));
          };
        }
      ),
      /***/
      "fdbc": (
        /***/
        function(module2, exports2) {
          module2.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
          };
        }
      ),
      /***/
      "fdbf": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var NATIVE_SYMBOL = __webpack_require__("4930");
          module2.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
        }
      ),
      /***/
      "fea9": (
        /***/
        function(module2, exports2, __webpack_require__) {
          var global = __webpack_require__("da84");
          module2.exports = global.Promise;
        }
      )
      /******/
    });
  }
});
export default require_vue3_qr_reader_common();
//# sourceMappingURL=vue3-qr-reader.js.map
