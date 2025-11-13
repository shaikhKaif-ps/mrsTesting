var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b;
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import React, { Component, useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { Routes, Route, useParams } from "react-router-dom";
import $$1 from "jquery";
import emailjs from "emailjs-com";
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton, XIcon } from "react-share";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const MRS_Logo = "/assets/MRS-Logo-8bef6X_s.svg";
const Sub_menu = "data:image/svg+xml,%3csvg%20width='20'%20height='11'%20viewBox='0%200%2020%2011'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18.5127%201L9.75633%209.94324L0.999955%201'%20stroke='%23FC7B12'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const Close_icon = "data:image/svg+xml,%3csvg%20width='22'%20height='22'%20viewBox='0%200%2022%2022'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1.57687%201.57782C1.64072%201.5139%201.71655%201.46319%201.80001%201.42859C1.88347%201.39399%201.97293%201.37618%202.06328%201.37618C2.15363%201.37618%202.24309%201.39399%202.32655%201.42859C2.41001%201.46319%202.48584%201.5139%202.54969%201.57782L10.9991%2010.0272L19.4519%201.57782C19.5809%201.44881%2019.7558%201.37634%2019.9383%201.37634C20.1207%201.37634%2020.2957%201.44881%2020.4247%201.57782C20.5537%201.70682%2020.6262%201.88179%2020.6262%202.06422C20.6262%202.24666%2020.5537%202.42163%2020.4247%202.55063L11.9719%2011L20.4212%2019.4528C20.5502%2019.5818%2020.6227%2019.7568%2020.6227%2019.9392C20.6227%2020.1217%2020.5502%2020.2966%2020.4212%2020.4256C20.2922%2020.5546%2020.1173%2020.6271%2019.9348%2020.6271C19.7524%2020.6271%2019.5774%2020.5546%2019.4484%2020.4256L10.9991%2011.9728L2.54625%2020.4222C2.41473%2020.5348%202.24555%2020.5937%202.07252%2020.587C1.8995%2020.5803%201.73536%2020.5086%201.61292%2020.3861C1.49048%2020.2637%201.41875%2020.0996%201.41207%2019.9265C1.40539%2019.7535%201.46424%2019.5843%201.57687%2019.4528L10.0262%2011L1.57687%202.54719C1.44883%202.41838%201.37695%202.24413%201.37695%202.06251C1.37695%201.88088%201.44883%201.70663%201.57687%201.57782Z'%20fill='%23313D47'/%3e%3c/svg%3e";
const Home_about1 = "/assets/Home_about1-EUWLkQz0.webp";
const blue_Arrow = "data:image/svg+xml,%3csvg%20width='22'%20height='20'%20viewBox='0%200%2022%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1%209.75781L21.2943%209.75781'%20stroke='%23304D75'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12.3511%201L21.2943%209.75637L12.3511%2018.5127'%20stroke='%23304D75'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const Clients_icon = "data:image/svg+xml,%3csvg%20width='52'%20height='45'%20viewBox='0%200%2052%2045'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Vector'%3e%3cpath%20d='M25.75%2017.6191C30.5285%2017.6191%2034.416%2013.7316%2034.416%208.95312C34.416%204.17466%2030.5285%200.287109%2025.75%200.287109C20.9715%200.287109%2017.084%204.17466%2017.084%208.95312C17.084%2013.7316%2020.9715%2017.6191%2025.75%2017.6191ZM25.75%203.27539C28.8807%203.27539%2031.4277%205.8224%2031.4277%208.95312C31.4277%2012.0838%2028.8807%2014.6309%2025.75%2014.6309C22.6193%2014.6309%2020.0723%2012.0838%2020.0723%208.95312C20.0723%205.8224%2022.6193%203.27539%2025.75%203.27539Z'%20fill='%23FC7B12'/%3e%3cpath%20d='M43.2812%2017.6191C46.3021%2017.6191%2048.7598%2015.1615%2048.7598%2012.1406C48.7598%209.11977%2046.3021%206.66211%2043.2812%206.66211C40.2604%206.66211%2037.8027%209.11977%2037.8027%2012.1406C37.8027%2015.1615%2040.2604%2017.6191%2043.2812%2017.6191ZM43.2812%209.65039C44.6544%209.65039%2045.7715%2010.7675%2045.7715%2012.1406C45.7715%2013.5137%2044.6544%2014.6309%2043.2812%2014.6309C41.9081%2014.6309%2040.791%2013.5137%2040.791%2012.1406C40.791%2010.7675%2041.9081%209.65039%2043.2812%209.65039Z'%20fill='%23FC7B12'/%3e%3cpath%20d='M44.4865%2021.0059H42.1756C39.4524%2021.0059%2037.1016%2022.6147%2036.0304%2024.9257C33.8249%2022.5181%2030.6571%2021.0059%2027.1424%2021.0059H24.3577C20.843%2021.0059%2017.6752%2022.5181%2015.4697%2024.9257C14.3984%2022.6147%2012.0476%2021.0059%209.32441%2021.0059H7.01348C3.2841%2021.0059%200.25%2024.0216%200.25%2027.7285V38.6068C0.25%2040.2161%201.56425%2041.5254%203.17971%2041.5254H12.3166C12.4698%2043.3084%2013.9691%2044.7129%2015.7913%2044.7129H35.7088C37.5309%2044.7129%2039.0302%2043.3084%2039.1835%2041.5254H48.216C49.889%2041.5254%2051.2501%2040.1697%2051.2501%2038.5032V27.7285C51.25%2024.0216%2048.2159%2021.0059%2044.4865%2021.0059ZM3.23828%2027.7285C3.23828%2025.6694%204.93184%2023.9941%207.01348%2023.9941H9.32441C11.4061%2023.9941%2013.0996%2025.6694%2013.0996%2027.7285V28.7516C12.0948%2031.3677%2012.3027%2032.9356%2012.3027%2038.5371H3.23828V27.7285ZM36.209%2041.2245C36.209%2041.5003%2035.9847%2041.7246%2035.7088%2041.7246H15.7912C15.5153%2041.7246%2015.291%2041.5002%2015.291%2041.2245V33.0608C15.291%2028.0614%2019.3583%2023.9941%2024.3576%2023.9941H27.1423C32.1417%2023.9941%2036.209%2028.0614%2036.209%2033.0607V41.2245ZM48.2617%2038.5032C48.2617%2038.5547%2048.8187%2038.5371%2039.1973%2038.5371C39.1973%2032.8941%2039.4036%2031.3634%2038.4004%2028.7516V27.7285C38.4004%2025.6694%2040.0939%2023.9941%2042.1756%2023.9941H44.4865C46.5682%2023.9941%2048.2617%2025.6694%2048.2617%2027.7285V38.5032Z'%20fill='%23FC7B12'/%3e%3cpath%20d='M8.21875%2017.6191C11.2396%2017.6191%2013.6973%2015.1615%2013.6973%2012.1406C13.6973%209.11977%2011.2396%206.66211%208.21875%206.66211C5.1979%206.66211%202.74023%209.11977%202.74023%2012.1406C2.74023%2015.1615%205.1979%2017.6191%208.21875%2017.6191ZM8.21875%209.65039C9.59187%209.65039%2010.709%2010.7675%2010.709%2012.1406C10.709%2013.5137%209.59187%2014.6309%208.21875%2014.6309C6.84563%2014.6309%205.72852%2013.5137%205.72852%2012.1406C5.72852%2010.7675%206.84563%209.65039%208.21875%209.65039Z'%20fill='%23FC7B12'/%3e%3c/g%3e%3c/svg%3e";
const MT_Cargo_icon = "data:image/svg+xml,%3csvg%20width='53'%20height='56'%20viewBox='0%200%2053%2056'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Vector'%3e%3cpath%20d='M18.0469%200C17.1408%200%2016.4062%200.734562%2016.4062%201.64062V27.8906C16.4062%2028.7967%2017.1408%2029.5312%2018.0469%2029.5312H44.2969C45.2029%2029.5312%2045.9375%2028.7967%2045.9375%2027.8906V1.64062C45.9375%200.734562%2045.2029%200%2044.2969%200H18.0469ZM29.5312%203.28125H32.8125V9.84375H29.5312V3.28125ZM42.6562%2026.25H19.6875V3.28125H26.25V11.4844C26.25%2012.3904%2026.9846%2013.125%2027.8906%2013.125H34.4531C35.3592%2013.125%2036.0938%2012.3904%2036.0938%2011.4844V3.28125H42.6562V26.25Z'%20fill='%23FC7B12'/%3e%3cpath%20d='M1.64062%2036.6406C0.734562%2036.6406%200%2037.3752%200%2038.2812V51.4062C0%2052.3123%200.734562%2053.0469%201.64062%2053.0469H8.20312C9.10919%2053.0469%209.84375%2052.3123%209.84375%2051.4062V50.314C12.8244%2050.9569%2015.1786%2052.0692%2017.4673%2053.151C20.5667%2054.6162%2023.4942%2056%2027.4347%2056C36.0819%2056%2038.9409%2053.2747%2046.582%2045.9912C47.8559%2044.7768%2049.3%2043.4004%2050.9284%2041.8869C51.9272%2040.9585%2052.5%2039.6443%2052.5%2038.2812C52.5%2035.5673%2050.292%2033.3594%2047.5781%2033.3594C46.3964%2033.3594%2045.2538%2033.7845%2044.3606%2034.5566C44.345%2034.57%2044.3298%2034.5837%2044.3147%2034.5977L38.9607%2039.5889C38.1986%2037.8551%2036.4654%2036.6406%2034.4531%2036.6406H26.9091C24.5075%2034.4341%2021.8445%2033.3594%2018.7887%2033.3594C16.0268%2033.3594%2014.299%2034.2171%2012.6282%2035.0465C10.9768%2035.8662%209.41708%2036.6406%206.57934%2036.6406H1.64062ZM6.5625%2049.7656H3.28125C3.28125%2048.2492%203.28125%2041.1196%203.28125%2039.9219H6.5625V49.7656ZM14.0873%2037.9855C15.6009%2037.2341%2016.7966%2036.6406%2018.7887%2036.6406C21.1769%2036.6406%2023.1792%2037.5306%2025.0899%2039.4413C25.3975%2039.749%2025.8148%2039.9219%2026.25%2039.9219H34.4531C35.3578%2039.9219%2036.0938%2040.6579%2036.0938%2041.5625C36.0938%2042.4722%2035.3447%2043.2031%2034.4531%2043.2031H24.6094C23.7033%2043.2031%2022.9688%2043.9377%2022.9688%2044.8438C22.9688%2045.7498%2023.7033%2046.4844%2024.6094%2046.4844H34.4531C35.8139%2046.4844%2037.0765%2045.9262%2037.992%2044.9781L46.5258%2037.0225C47.5802%2036.1393%2049.2188%2036.8829%2049.2188%2038.2812C49.2188%2038.7423%2049.0326%2039.1693%2048.6945%2039.4835C47.0509%2041.0111%2045.599%2042.3952%2044.318%2043.6161C36.9824%2050.6085%2034.7686%2052.7188%2027.4347%2052.7188C24.2306%2052.7188%2021.7463%2051.5444%2018.8696%2050.1845C16.3513%2048.9942%2013.5336%2047.6632%209.84375%2046.9672V39.5959C11.6%2039.2199%2012.8956%2038.5771%2014.0873%2037.9855Z'%20fill='%23FC7B12'/%3e%3c/g%3e%3c/svg%3e";
const TEUs_icon = "/assets/TEUs_icon-hfU-sfxi.svg";
const Grey_Line = "data:image/svg+xml,%3csvg%20width='313'%20height='1'%20viewBox='0%200%20313%201'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cline%20opacity='0.1'%20y1='0.5'%20x2='313'%20y2='0.5'%20stroke='black'%20stroke-dasharray='4%204'/%3e%3c/svg%3e";
function HomeAbout() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "section section-padd-LR hm-abt-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1100 flex", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", children: [
    /* @__PURE__ */ jsxs("div", { className: "clm-2", children: [
      /* @__PURE__ */ jsx("p", { className: "grey uppercase normalidad-wide", "data-aos": "fade-up", "data-aos-duration": "500", "data-aos-once": "true", children: "about US" }),
      /* @__PURE__ */ jsxs("h2", { className: "js-split-text ttl-60px txt black", children: [
        "All Supply ",
        /* @__PURE__ */ jsx("br", {}),
        "Chains are Not ",
        /* @__PURE__ */ jsx("br", {}),
        "Created Equal "
      ] }),
      /* @__PURE__ */ jsx("img", { src: Home_about1, alt: "Home about", "data-aos": "zoom-in", "data-aos-duration": "1000", "data-aos-once": "true", className: "hm-abt-img" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "clm-2", children: [
      /* @__PURE__ */ jsx("p", { className: "black abt-para", "data-aos": "fade-in", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "400", children: "Welcome to MRS Group, your gateway to advanced logistics solutions since 2016. Based in Bangalore and rooted in Kutch, Gujarat, we specialise in a wide array of services including freight forwarding, warehousing, and comprehensive supply chain management. With a robust presence across 7 Indian locations, our dedicated team leverages state-of-the-art infrastructure to transform logistical challenges into successes, propelling your business into a future of endless possibilities." }),
      /* @__PURE__ */ jsxs("a", { href: "/about", className: "blue hm-abt-btn btn", id: "btn-styl", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "0", children: [
        /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn more about MRS Supply Chain " }),
        /* @__PURE__ */ jsx("img", { src: blue_Arrow, alt: "Arrow" }),
        " "
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "numbers-sec", children: [
        /* @__PURE__ */ jsxs("div", { className: "numbers-dv", "data-aos": "fade-in", "data-aos-delay": "900", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: " 1.5K+" }),
          /* @__PURE__ */ jsxs("p", { className: "grey numbers-desc", children: [
            "Total no. of ",
            /* @__PURE__ */ jsx("br", {}),
            "Clients Served"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "img-bx", children: /* @__PURE__ */ jsx("img", { src: Clients_icon, alt: "Clients_icon" }) })
        ] }),
        /* @__PURE__ */ jsx("img", { src: Grey_Line, alt: "Grey_Line", className: "numbr-line", "data-aos": "fade-in", "data-aos-duration": "950", "data-aos-once": "true", "data-aos-delay": "400" }),
        /* @__PURE__ */ jsxs("div", { className: "numbers-dv", "data-aos": "fade-in", "data-aos-delay": "1000", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: "18K+" }),
          /* @__PURE__ */ jsxs("p", { className: "grey numbers-desc", children: [
            "Total no. of ",
            /* @__PURE__ */ jsx("br", {}),
            "MT Cargo Handled"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "img-bx", children: /* @__PURE__ */ jsx("img", { src: MT_Cargo_icon, alt: "MT_Cargo_icon" }) })
        ] }),
        /* @__PURE__ */ jsx("img", { src: Grey_Line, alt: "Grey_Line", className: "numbr-line", "data-aos": "fade-in", "data-aos-duration": "1050", "data-aos-once": "true", "data-aos-delay": "400" }),
        /* @__PURE__ */ jsxs("div", { className: "numbers-dv", "data-aos": "fade-in", "data-aos-delay": "1100", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: "2K+" }),
          /* @__PURE__ */ jsxs("p", { className: "grey numbers-desc num-third-para", children: [
            "Total no. of ",
            /* @__PURE__ */ jsx("br", {}),
            "TEUs Handled of Import Cargo Handled Every Year"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "img-bx", children: /* @__PURE__ */ jsx("img", { src: TEUs_icon, alt: "TEUs_icon" }) })
        ] }),
        /* @__PURE__ */ jsx("img", { src: Grey_Line, alt: "Grey_Line", className: "numbr-line", "data-aos": "fade-in", "data-aos-duration": "1150", "data-aos-once": "true", "data-aos-delay": "400" })
      ] })
    ] })
  ] }) }) });
}
const supplyChainImage = "/assets/Supply_Chain-0lTlc8dw.png";
const Slider2 = "/assets/WarehouseManagement-uFQnTvqd.jpg";
const Slider3_mob = "/assets/CustomsCompliance-TAzOgnDI.png";
const Slider4 = "/assets/MultimodalLogistics-zHS_8rOI.jpg";
const Slider5 = "/assets/ForeignTrade-hrhkJ4N6.jpg";
const Slider6 = "/assets/custom_brkg-K8pCgpoN.webp";
const ImportManagement = "/assets/Import Management Spotlight-HjM1ppVI.png";
function formSection() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const nameinput = React.useRef(null);
  const emailinput = React.useRef(null);
  const orginput = React.useRef(null);
  const phoneinput = React.useRef(null);
  const departinput = React.useRef(null);
  const msginput = React.useRef(null);
  React.useRef(null);
  React.useRef(null);
  const handleFocus = (e) => {
    e.target.classList.remove("error_line");
    let er1 = document.getElementById("nm_err");
    er1.classList.remove("show_error");
    let er1v = document.getElementById("nm_err1");
    er1v.classList.remove("show_error");
    let er2 = document.getElementById("eml_err");
    er2.classList.remove("show_error");
    let er2v = document.getElementById("eml_err1");
    er2v.classList.remove("show_error");
    let er3 = document.getElementById("cmp_err");
    er3.classList.remove("show_error");
    let er5 = document.getElementById("depart_err");
    er5.classList.remove("show_error");
    let er6 = document.getElementById("msg_err");
    er6.classList.remove("show_error");
    let er6v = document.getElementById("msg_err1");
    er6v.classList.remove("show_error");
    let er7 = document.getElementById("prk_err_lsng");
    er7.classList.remove("show_error");
    let er8 = document.getElementById("spc_err_lsng");
    er8.classList.remove("show_error");
  };
  const handleFocus1 = (e) => {
    e.target.classList.remove("error_line");
    let er4 = document.getElementById("phn_err");
    er4.classList.remove("show_error");
    let er4v = document.getElementById("phn_err1");
    er4v.classList.remove("show_error");
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    let name_fld = nameinput.current.value;
    let email_fld = emailinput.current.value;
    let org_fld = orginput.current.value;
    let phone_fld = phoneinput.current.value;
    let dprt_fld = departinput.current.value;
    let msg_fld = msginput.current.value;
    let phone_fltr = document.getElementById("phone_fld");
    var mob_regx = /^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var alpha_allwd = /^[A-Za-z ]+$/;
    if (name_fld == "") {
      let v1 = document.getElementById("name_fld");
      v1.className += " error_line";
      let er1 = document.getElementById("nm_err");
      er1.className += " show_error";
    } else if (!name_fld.match(alpha_allwd)) {
      let v1 = document.getElementById("name_fld");
      v1.className += " error_line";
      let er1v = document.getElementById("nm_err1");
      er1v.className += " show_error";
    } else if (phone_fld == "") {
      let v4 = document.getElementById("phone_fld");
      v4.className += " error_line";
      let er4 = document.getElementById("phn_err");
      er4.className += " show_error";
    } else if (!mob_regx.test(phone_fltr.value)) {
      let v4 = document.getElementById("phone_fld");
      v4.className += " error_line";
      let er4 = document.getElementById("phn_err1");
      er4.className += " show_error";
    } else if (email_fld == "") {
      let v2 = document.getElementById("email_fld");
      v2.className += " error_line";
      let er2 = document.getElementById("eml_err");
      er2.className += " show_error";
    } else if (!email_fld.match(mailformat)) {
      let v2 = document.getElementById("email_fld");
      v2.className += " error_line";
      let er2v = document.getElementById("eml_err1");
      er2v.className += " show_error";
    } else if (org_fld == "") {
      let v3 = document.getElementById("org_fld");
      v3.className += " error_line";
      let er3 = document.getElementById("cmp_err");
      er3.className += " show_error";
    } else if (dprt_fld == "") {
      let v5 = document.getElementById("dprt_fld");
      v5.className += " error_line";
      let er5 = document.getElementById("depart_err");
      er5.className += " show_error";
    } else if (msg_fld == "") {
      let v6 = document.getElementById("msg_fld");
      v6.className += " error_line";
      let er6 = document.getElementById("msg_err");
      er6.className += " show_error";
    } else if (!msg_fld.match(alpha_allwd)) {
      let v6 = document.getElementById("msg_fld");
      v6.className += " error_line";
      let er6v = document.getElementById("msg_err1");
      er6v.className += " show_error";
    } else {
      fetch(
        "https://script.google.com/macros/s/AKfycbwOP9_uQMoUzUQMbgzEzHir-fhe5FLJACsEfhFfWGxhXnpmfZTvZF-5lcFLuFRMeUni/exec",
        {
          method: "POST",
          body: new FormData(form.current)
        }
      ).then((res) => {
        console.log("SUCCESSFULLY SUBMITTED");
        setLoading(false);
      }).catch((err) => console.log(err));
      emailjs.sendForm(
        "service_7xurfxj",
        "template_u6s227l",
        e.target,
        "SsPYHKCapw4h-xBn_"
      ).then(
        (result) => {
          console.log(result.text);
          setStatusMessage("Your Message has been sent successfully");
          let bx = document.getElementById("thnk_box");
          bx.className += " thnk_show";
          let frm_bx = document.getElementById("enq_form_bx");
          frm_bx.className += " form_hide";
        },
        (error) => {
          console.log(error.text);
          setStatusMessage(`${error.text} happened`);
        }
      );
      e.target.reset();
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "form-sec section-padd-LR", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 white", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
    /* @__PURE__ */ jsxs("div", { className: "clm-2 contnt-clm", children: [
      /* @__PURE__ */ jsx("h2", { className: "js-split-text", children: "Get in touch" }),
      /* @__PURE__ */ jsxs(
        "p",
        {
          "data-aos": "fade-in",
          "data-aos-duration": "500",
          "data-aos-delay": "400",
          "data-aos-once": "true",
          children: [
            " ",
            "We’re always happy to hear from potential customers, partners, and collaborators."
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsxs("div", { className: "contact_form", children: [
      /* @__PURE__ */ jsxs(
        "form",
        {
          className: "conversion_form",
          ref: form,
          onSubmit: sendEmail,
          id: "enq_form_bx",
          "data-aos": "fade-in",
          "data-aos-duration": "500",
          "data-aos-delay": "400",
          "data-aos-once": "true",
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "page_name",
                type: "hidden",
                name: "Page_name",
                value: "Contact Page"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label conv_frm_label", children: "Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "name",
                  className: "form-control",
                  placeholder: "Name",
                  id: "name_fld",
                  ref: nameinput,
                  onFocus: handleFocus
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "nm_err", children: "Please Enter Name" }),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "nm_err1", children: "Letters and space only." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Phone No" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "phone",
                  className: "form-control",
                  placeholder: "Phone",
                  id: "phone_fld",
                  ref: phoneinput,
                  onFocus: handleFocus1
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "phn_err", children: "Please Enter Phone No" }),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "phn_err1", children: "Please Enter Valid Phone No" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Email Address" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  name: "email",
                  className: "form-control",
                  placeholder: "Email",
                  id: "email_fld",
                  ref: emailinput,
                  onFocus: handleFocus
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "eml_err", children: "Please Enter Email Address" }),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "eml_err1", children: "Please Enter Valid Email Address" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Organisation" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "organisation",
                  className: "form-control",
                  placeholder: "Organisation",
                  id: "org_fld",
                  ref: orginput,
                  onFocus: handleFocus
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "cmp_err", children: "Please Enter Organisation" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc selectin-fld", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Type of Enquiry" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "form-control enq_type cont_enq",
                  name: "enquiry",
                  id: "dprt_fld",
                  ref: departinput,
                  onFocus: handleFocus,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", disabled: true, selected: true, children: "You are interrested in" }),
                    /* @__PURE__ */ jsx("option", { value: "Warehousing Solution", children: "Warehousing Solution" }),
                    /* @__PURE__ */ jsx("option", { value: "Free Trade Zone", children: "Free Trade Zone" }),
                    /* @__PURE__ */ jsx("option", { value: "Surface & Rail Transport", children: "Surface & Rail Transport" }),
                    /* @__PURE__ */ jsx("option", { value: "Custom Brokerage", children: "Custom Brokerage" }),
                    /* @__PURE__ */ jsx("option", { value: "Custom & Foreign Trade Compliance", children: "Custom & Foreign Trade Compliance" }),
                    /* @__PURE__ */ jsx("option", { value: "Import Management", children: "Import Management" }),
                    /* @__PURE__ */ jsx("option", { value: "Tech-Driven Last-Mile Delivery", children: "Tech-Driven Last-Mile Delivery" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "depart_err", children: "Please Select Type of Enquiry" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-6 conv_frm_spc tell_sec", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Message" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  className: "form-control",
                  name: "message",
                  id: "msg_fld",
                  placeholder: "",
                  ref: msginput,
                  onFocus: handleFocus,
                  rows: "4",
                  cols: "50"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "msg_err", children: "Please Enter Message" }),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "msg_err1", children: "Letters and space only." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "col-6 btn_col", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "submit",
                className: "btn btn-primary conv_btn cont_form_btn",
                value: "Submit"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "thnk txt_wht white", id: "thnk_box", children: "Your form has been sent successfully" })
    ] }) })
  ] }) }) }) });
}
const QuoteForm = ({ isOpen, togglePopup }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    organisation: "",
    enquiry: "",
    message: "",
    honeypot: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);
  const mob_regx = /^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/;
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const alpha_allwd = /^[A-Za-z ]+$/;
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    const newErrors = {};
    if (formData.honeypot) {
      newErrors.honeypot = "Spam detected";
      return false;
    }
    if (!formData.name)
      newErrors.name = "Name is required";
    else if (!alpha_allwd.test(formData.name))
      newErrors.name = "Name should contain only alphabets";
    if (!formData.phone)
      newErrors.phone = "Phone number is required";
    else if (!mob_regx.test(formData.phone))
      newErrors.phone = "Invalid phone number format";
    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!mailformat.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.organisation)
      newErrors.organisation = "Organisation is required";
    else if (!alpha_allwd.test(formData.organisation))
      newErrors.organisation = "Organisation should contain only alphabets";
    if (!formData.enquiry)
      newErrors.enquiry = "Type of enquiry is required";
    if (!formData.message)
      newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(
        "https://script.google.com/macros/s/AKfycbwOP9_uQMoUzUQMbgzEzHir-fhe5FLJACsEfhFfWGxhXnpmfZTvZF-5lcFLuFRMeUni/exec",
        {
          method: "POST",
          body: new FormData(formRef.current)
        }
      ).then((res) => {
        console.log("SUCCESSFULLY SUBMITTED TO GOOGLE SHEETS");
      }).catch((err) => console.log("Error submitting to Google Sheets:", err));
      emailjs.sendForm(
        "service_7xurfxj",
        "template_u6s227l",
        formRef.current,
        "SsPYHKCapw4h-xBn_"
      ).then((result) => {
        console.log("Email sent:", result.text);
        setSuccessMessage("Your Message has been sent successfully");
        setIsSubmitted(true);
        setFormData({
          // Reset the form data
          name: "",
          phone: "",
          email: "",
          organisation: "",
          enquiry: "",
          message: "",
          honeypot: ""
          // Reset honeypot field
        });
        setErrors({});
      }).catch((error) => {
        console.log("Error sending email:", error.text);
        setSuccessMessage(`Error: ${error.text}`);
      });
    } else {
      console.log("Form has errors.");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "popupParent", children: isOpen && /* @__PURE__ */ jsx("div", { className: "popup-overlay", onClick: togglePopup, children: /* @__PURE__ */ jsxs("div", { className: "popup-form", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsx("h2", { children: "Let's Connect" }),
    !isSubmitted ? /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, ref: formRef, children: [
      /* @__PURE__ */ jsxs("div", { className: "inputDiv", children: [
        /* @__PURE__ */ jsx("label", { children: "Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "name",
            value: formData.name,
            onChange: handleInputChange,
            required: true
          }
        ),
        errors.name && /* @__PURE__ */ jsx("p", { className: "error-message", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inputDiv", children: [
        /* @__PURE__ */ jsx("label", { children: "Phone" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "phone",
            value: formData.phone,
            onChange: handleInputChange,
            required: true
          }
        ),
        errors.phone && /* @__PURE__ */ jsx("p", { className: "error-message", children: errors.phone })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inputDiv", children: [
        /* @__PURE__ */ jsx("label", { children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            name: "email",
            value: formData.email,
            onChange: handleInputChange,
            required: true
          }
        ),
        errors.email && /* @__PURE__ */ jsx("p", { className: "error-message", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inputDiv", children: [
        /* @__PURE__ */ jsx("label", { children: "Organisation" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "organisation",
            value: formData.organisation,
            onChange: handleInputChange,
            required: true
          }
        ),
        errors.organisation && /* @__PURE__ */ jsx("p", { className: "error-message", children: errors.organisation })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inputDiv", children: [
        /* @__PURE__ */ jsx("label", { children: "Type of Enquiry" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "enquiry",
            value: formData.enquiry,
            onChange: handleInputChange,
            required: true,
            className: "form-select",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "You are interested in" }),
              /* @__PURE__ */ jsx("option", { value: "Warehousing Solution", children: "Warehousing Solution" }),
              /* @__PURE__ */ jsx("option", { value: "Free Trade Zone", children: "Free Trade Zone" }),
              /* @__PURE__ */ jsx("option", { value: "Surface & Rail Transport", children: "Surface & Rail Transport" }),
              /* @__PURE__ */ jsx("option", { value: "Custom Brokerage", children: "Custom Brokerage" }),
              /* @__PURE__ */ jsx("option", { value: "Custom & Foreign Trade Compliance", children: "Custom & Foreign Trade Compliance" }),
              /* @__PURE__ */ jsx("option", { value: "Import Management", children: "Import Management" }),
              /* @__PURE__ */ jsx("option", { value: "Tech-Driven Last-Mile Delivery", children: "Tech-Driven Last-Mile Delivery" })
            ]
          }
        ),
        errors.enquiry && /* @__PURE__ */ jsx("p", { className: "error-message", children: errors.enquiry })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inputDiv", children: [
        /* @__PURE__ */ jsx("label", { children: "Message" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "message",
            value: formData.message,
            onChange: handleInputChange,
            required: true
          }
        ),
        errors.message && /* @__PURE__ */ jsx("p", { className: "error-message", children: errors.message })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { display: "none" }, children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "honeypot",
          value: formData.honeypot,
          onChange: handleInputChange
        }
      ) }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "submit-button", children: "Submit" })
    ] }) : /* @__PURE__ */ jsx("h1", { className: "messageofSuccess", children: successMessage }),
    /* @__PURE__ */ jsx("button", { className: "close-button", onClick: togglePopup, children: "x" })
  ] }) }) });
};
function HomeSpotlight() {
  useEffect(() => {
    var swiper = new Swiper(".thumbSlider", {
      spaceBetween: 10,
      slidesPerView: 1,
      freeMode: true,
      watchSlidesProgress: true,
      allowTouchMove: false,
      speed: 900
    });
    new Swiper(".mainSlider", {
      speed: 1100,
      spaceBetween: 10,
      allowTouchMove: false,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      thumbs: {
        swiper
      },
      effect: "fade"
    });
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };
  const closePopup = () => setIsPopupOpen(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "section slider-sec section-padd-LR ", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 flex", children: [
      /* @__PURE__ */ jsx("div", { className: "swiper thumbSlider", children: /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
        /* @__PURE__ */ jsxs("div", { className: "swiper-slide", children: [
          /* @__PURE__ */ jsxs("h1", { className: "js-split-text white width-100", children: [
            "Import ",
            /* @__PURE__ */ jsx("br", {}),
            " Management"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl hm-sldr-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "400", children: "Efficient, Reliable, and Compliant Import Management Services Across Industries" }),
          /* @__PURE__ */ jsx("p", { className: "white sldr-para", "data-aos": "fade-up", "data-aos-duration": "900", "data-aos-once": "true", "data-aos-delay": "500", children: "Streamline Your Imports with India’s Leading Import Management Partner." }),
          /* @__PURE__ */ jsx("div", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", onClick: openPopup, children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Let Connect" }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "swiper-slide", children: [
          /* @__PURE__ */ jsxs("h1", { className: "js-split-text white width-100", children: [
            "Make Your Supply Chain ",
            /* @__PURE__ */ jsx("br", {}),
            "Competitive Advantage"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl hm-sldr-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "400", children: "Optimize Advantage" }),
          /* @__PURE__ */ jsx("p", { className: "white sldr-para", "data-aos": "fade-up", "data-aos-duration": "900", "data-aos-once": "true", "data-aos-delay": "500", children: "Port to Factory logistics and integrated software, built together to drive business results." }),
          /* @__PURE__ */ jsx("div", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", onClick: openPopup, children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Let Connect" }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "swiper-slide", children: [
          /* @__PURE__ */ jsx("div", { className: "ovrflw-hdn", children: /* @__PURE__ */ jsx("h1", { className: "white", children: "Simplify Your Warehouse Management" }) }),
          /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl hm-sldr-sub-ttl", children: "Streamlined Storage" }),
          /* @__PURE__ */ jsx("p", { className: "white sldr-para", children: "Elevate efficiency and precision in inventory management with our cutting-edge warehousing solutions." }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", onClick: openPopup, children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Let Connect" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "swiper-slide", children: [
          /* @__PURE__ */ jsx("h1", { className: "white", children: "Enhance Efficiency with Duty-Free Warehousing " }),
          /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl hm-sldr-sub-ttl", children: "Strategic Storage" }),
          /* @__PURE__ */ jsx("p", { className: "white sldr-para", children: "Optimize international logistics with secure, cost-effective duty-free warehousing for greater operational flexibility." }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", onClick: openPopup, children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Let Connect" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "swiper-slide", children: [
          /* @__PURE__ */ jsx("h1", { className: "white", children: "Optimize with Multimodal Logistics Solutions " }),
          /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl hm-sldr-sub-ttl", children: "Flexible Freight" }),
          /* @__PURE__ */ jsx("p", { className: "white sldr-para", children: "Boost supply chain efficiency with our tailored multimodal logistics, ensuring seamless transportation." }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", onClick: openPopup, children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Let Connect" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "swiper-slide", children: [
          /* @__PURE__ */ jsx("h1", { className: "white", children: "Advance with Tech-Driven Last-Mile Delivery " }),
          /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl hm-sldr-sub-ttl", children: "Smart Delivery" }),
          /* @__PURE__ */ jsx("p", { className: "white sldr-para", children: "Elevate your last-mile logistics with our tech-driven solutions for timely, accurate, and visible deliveries." }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", onClick: openPopup, children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Let Connect" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "swiper-slide", children: [
          /* @__PURE__ */ jsx("h1", { className: "white", children: "Navigating Global Trade with Expert Customs Brokerage" }),
          /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl hm-sldr-sub-ttl", children: "Seamless and Stress-free" }),
          /* @__PURE__ */ jsx("p", { className: "white sldr-para", children: "We streamline complex processes, making international trade efficient and hassle-free." }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", onClick: openPopup, children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Let Connect" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper mainSlider", children: /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: ImportManagement, alt: "supplyChainImage" }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: supplyChainImage, alt: "supplyChainImage" }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: Slider2, alt: "supplyChainImage" }) }),
        /* @__PURE__ */ jsxs("div", { className: "swiper-slide", children: [
          /* @__PURE__ */ jsx("img", { src: Slider3_mob, alt: "supplyChainImage", className: "desk" }),
          /* @__PURE__ */ jsx("img", { src: Slider3_mob, alt: "supplyChainImage", className: "mob slider3-img" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: Slider4, alt: "supplyChainImage" }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: Slider5, alt: "supplyChainImage" }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: Slider6, alt: "supplyChainImage" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "pegination-arrow", children: [
        /* @__PURE__ */ jsx("div", { className: "swiper-button-next cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M12 20H28", stroke: "white", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M21 12L29 20L21 28", stroke: "white", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", transform: "matrix(-1 0 0 1 41 0)", stroke: "white" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-button-prev cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M29 20H13", stroke: "white", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M20 12L12 20L20 28", stroke: "white", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", stroke: "white" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-pagination" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(QuoteForm, { isOpen: isPopupOpen, togglePopup: closePopup })
  ] });
}
const Science_and_Health_Care = "/assets/Science_and_Health_Care-rwy_ATaJ.jpg";
const RenewableEnergy = "/assets/RenewableEnergy-jnjhKcn3.jpg";
const Industrial = "/assets/Industrial-Iw7V99Jc.jpg";
const Chemicals = "/assets/Chemicals-No5vYGtT.jpg";
const Ecommerce$1 = "/assets/E-commerce-VqUD02_2.jpg";
const Arts = "/assets/Arts-IJxRE3aO.jpg";
function HomeSector() {
  useEffect(() => {
    new Swiper(".sector-sldr", {
      navigation: {
        nextEl: ".sector-swiper-button-next",
        prevEl: ".sector-swiper-button-prev"
      },
      slidesPerView: 3.1,
      spaceBetween: 40,
      breakpoints: {
        320: {
          slidesPerView: 1.1
        },
        768: {
          slidesPerView: 2.1
        },
        1024: {
          slidesPerView: 3.1
        }
      }
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "sector-sec section-padd-LR", id: "sector", children: /* @__PURE__ */ jsxs("div", { className: "main-container", children: [
    /* @__PURE__ */ jsx("div", { className: "ovrflw-hdn", children: /* @__PURE__ */ jsx("h2", { className: "sectr-ttl black js-split-text", children: "Key Sectors we work with" }) }),
    /* @__PURE__ */ jsxs("div", { className: "swiper sector-sldr", "data-aos": "fade-in", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "700", children: [
      /* @__PURE__ */ jsxs("div", { className: "pegination-arrow2", children: [
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-next cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.9", children: [
          /* @__PURE__ */ jsx("path", { d: "M12 20H28", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M21 12L29 20L21 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", transform: "matrix(-1 0 0 1 41 0)", stroke: "#929292" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-prev cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.9", children: [
          /* @__PURE__ */ jsx("path", { d: "M29 20H13", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M20 12L12 20L20 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", stroke: "#929292" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Science_and_Health_Care, alt: "Science_and_Health_Care" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Renewable Energy and Infrastructure Projects:  " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Powering the future with specialised logistics for the renewable energy and infrastructure sectors, where precision meets scale." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/renewable-energy-and-infrastructure-projects", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: RenewableEnergy, alt: "RenewableEnergy" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Manufacturing, Automotive, Technology, and Consumer Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Driving innovation through integrated logistics, keeping the wheels of industry turning smoothly." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/manufacturing-automotive-technology-and-consumer-goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Industrial, alt: "Industrial" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Industrial Equipment:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Heavy-duty logistics for heavy-duty equipment, ensuring the backbone of industry remains strong and operational." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/industrial-sector", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Chemicals, alt: "Chemicals" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Agriculture, Chemicals, Construction, and Energy: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Cultivating success with tailored logistics for the essential sectors that fuel our world and build our futures." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/chemicals-construction-energy-and-agriculture", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Ecommerce$1, alt: "Ecommerce" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "E-commerce and Retail:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Revolutionising retail with cutting-edge logistics, delivering the future of commerce today." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/e-commerce-and-retail", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Arts, alt: "Arts" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Arts, Exhibitions, and Luxury Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Elevating the art of logistics for the world's treasures, ensuring every masterpiece arrives in perfect form." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/arts-exhibitions-and-luxury-Goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] }) }) });
}
const adani_Solar = "/assets/adani_Solar-3ZdhwlES.svg";
const amneal = "/assets/amneal-gZUw-yyy.svg";
const borosil = "/assets/borosil-maElfqgM.svg";
const Caterpillar = "data:image/svg+xml,%3csvg%20version='1.2'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20200%2036'%20width='200'%20height='36'%3e%3ctitle%3eCaterpillar_logo%3c/title%3e%3cdefs%3e%3cimage%20width='194'%20height='32'%20id='img1'%20href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAAAgCAYAAABAbae4AAAAAXNSR0IB2cksfwAACapJREFUeJztXAuwVlMU3qUSoZeUVy8kcVN6kMiY8ixGU2PyjozeKkPeiUSTFFEYr7wiGQ1NecSI6nr0pIfMLUmlp1QeN4lrffec466722v9+///c9O5tz3zzdy5/9rfOXuf/Z2919prH2OKl0aEYYTlhO2Evwh/E3YSNhFmE64mVDV+pSPhphQ4yapzCaF/Fjg75DmfMChDnMzupzahnyd6EboQcggHKv3ShjDAE30IXQlNCBUFvnOV+kczuxqEWwRcptxvVE5XrpPjUd8u6OeHU+DaFBwdjN8zHUjoSbiYUJdQzkVWnvAQ4TdCgQdWENp5NPR7D67nrTpTPe9BwuiQ54UsOK5n99Mqg/q7TfAy6Sb0ywMZcs4zRULnZZxS7xxm11ixmyrcKy9DlPo9PerbZaDCF2Eh4VCF4xkPDhu/E94j1LPJMAv8kybZNsIZyg3W9ORcYdUrDUKIsItwq6NvMhECf4jtLb6kCuFZhS8CXs4NFI5MhMDHXouIqHUWRJ8SDhZu8II0eGqyeqVJCABeBvayIRshABtM8eVpUoWwROHjsIXPSzZCAOYQKoDoiSyJLhRuMB3ejqxeaRMC8LTVN9kKAejN+JIoBCx3fFch/RWebIUAHxi+j5mlGA03gTPysmJzp3CD3wgXdXHcz+olSQg/m8APWmWCJYtkhzcfd3Q1IawJOdco/QW8yfiSKISWAo9LHE8qPJIQwPODCZY/q43el4VjeKnw408mcKJRjiD8Itg94ri5gwh/Omwhjp2O/09jdQcTJjF8oDQgGhDcPooyaEKYSHhUQSt2P5oQ7iFUIlQ2wczoajOw2RRf52pCaBpyVjPBC0KyW2yKIh9JFMIVAs9ax/8+VHgkIfxhgujQASaYfbSZ420QLRN+XMYuVsUEwnDZPeq4uTaC7eOERY7/4+13uNDQZkoDCsKGuoomBM3Jt4smBHs2nC7Y4aG0ZnaaEHg4GQLbJditM0X+WRKF4OoD9NMUx//XKDyaEHjo+DjCr4LtfBiUhBD6CbaIVb/i+D/2Ky4SGpokIQwT7DALtmV2vkJA+VGww7KsRmiTRCFMcnDkmSCMb/8fyxophOorBAQXFgu2WLqWiBCeE2wbEu4QfrtHaGiShDBYsIP/0JLZpSOE7wQ7hK9rhTZJEwKWdAscHIhCXifwNxe4fIWA2fMrwfZLGMQtBPgVXzvstocdcLHAM824S5KEIA3wjYRjPOzKihDwdt7o4HjVBBuGLv4eApevEA4z8owAnzF2ISBmvt1hNyv8HU6ja62GdaBrTyJJQvhIsMs1xbf0y/rS6AQTLIdtDqRU1Bf4JwhcvkJAiooU2bsRBnEL4RrB7mnGNdfxO5zCRo6GloQQkBPUTkB1i0cTwtDQHm/mS43s2NrLPl8hSNE3AM5yldAuaUKQNluxX4AAgSvUOV/gkoSQb4IIHJ4NokcvCXbYucaS3UsIGGzYT+jogP0Ge0zg68tsXhRsXLk5JSEEDedZPJoQ0IkIjWKZIsWpsQSwI2KaECBGJPrhbXavYoewd1LDp4MEjs7h75scv2EVUX4PJn0fASsThP3zFZunIiIfIaRT5gh8GOQNQgwXbF528O3LQkiFzwknOu5NEwKm7x1G36ADkryh9pbAEe3fzBd+r+fgynRnGZE87NP8txyPUwhwSDYIfFDm5hBSPHeVCaZGXpIqBDzMtsZd4kix4DNskoSAHfY8R30sK+uHNlJ2gf1sUDIRAq6FPqvGieIUAtZkWv4IwlSuaEEEOFAnWJxJFQKA1OkBjnvLVghbTfGHmCQh1DHBjGfX32KK/LPxwjVudvBlk2uEVJZmEVGcQuiuXBQ3jCw/OCa5ip3tJyRZCABeDPYZgmyEAF+kg8WXJCG0EOpjUFYIbe4WbMY5+LJNukOov3AV4iMETGfdTTAd2ziL2U108MChRCdVKJhtTiPAEUTYD/kdLgdztCleSkIIiICtEnCWxaMJAbujV5kgxq0lC75mcWYiBMyWiLZ1NHuWJAnhSqF+LrPpJth87OCThID+6hty4QTeasEOL6rCNO9sw6djQpvKjoshxNdp/TumHAmgMyGfsICASBPUP8rsuZSabTW0JISAwV5RgH2Ez3cfQVr7AitN8T0STQgQzViGkSY4rplj5KOaSRKClEg4mdmcKtisMnv2gSQEOMN1mR2O7u4WbLF/EZsQkNTE4+jfEhrSoMdMMIKwk1AQYgOhbfVDC8Nhva162AipxK79f2+oSenCthBQRgl2WNM3Znapsk/TLUkSwhtC/XdNUUi+q2CDIEsdi89XCFiFSC8qJEvGJoTO7H8Ij1WnwV6LMIHwNxNBhB2EaNscDV/P6vMEvCQJQRooWB62YHZlWQgLFQ4f2P6WrxAQ0XSdkQEKl2VxCeFBE0w96KyKNMiPJix0CMDGXQTMDKeYonQCfsahNAghnaS70iwEPOdU+yOpcLvFGYcQvoBBXCkWmPI64Q8a2B0I2zxEEOF1AtJsMX3NMMX9hP1CSF2SIoTmSn1fTLI496oQDjGyEAaFNg1Cf+A2wq9piCBCLqFeeC1EjqJQ2n4hpC5JEUJvpb4vsLTiAY3YhCAd1cTGV+S0IoXYlVGKDMjCLzTgjU4YRdidgQgiLEWI1QSDuySFgAS5YxXUYDxlRQjvh+12AZt35ZT2AYNCOxeibIGxSn1fIHPhMNam2IQwW7kozghgZ3Se4zdEdwq/jkaDF47xrCwEwLGV0IU1oCSEgIzOfAX8o2NlRQjoky0CkMdfWWkfgIjOZgHRun6GUBcfQ0Pg5AYGaYDDDz2etSk2IYxRGidhZdTBNGhbEvJiEkEEhFr7hk70kUb/Yl7cO8vAS4ynrAhBAw7UH6S0LxWir5RIZyvsdT9Ke4WPf0IoNiHgULn2qQsbyBdqUpBbKILLCWtjFkGE/HCphQ0UDA7Xqbf9QghKEoSAgIs0zuxsAhQcpJHy1vh3jmITAoqU22EDXxioFDrFQ7L0B3wxnVA1fBCfOO5pXxKCdH4gna9YlFYhaBGjKODCCzbOpCzl8czOVwiISkov07mRERyhocadFRg9SNws9gdqE6bsBQFwLCLAKUeaArbD+TG/fUkIPQQ7vAkvZXZlUQhSjhHQ1dEmPOt1gv1MUxTI8RUCVhafCLar7YufaYIPs8I5yguxOGwE8oWqEiaHPsHexkxC9MEmfC1ieXh/rlNLKCNYG9LFSMaTo9j1sq7ZVLHl5wcGKnaugzypyn0KH5+JGqbRBxw4bw5nuV+G9ZE+3Uf5nS8bo4KX8zTB/jNT9L3cYYINoqFHWZyS7ZJ/AV3Xp8gPq0MRAAAAAElFTkSuQmCC'/%3e%3c/defs%3e%3cstyle%3e%3c/style%3e%3cuse%20id='Background'%20href='%23img1'%20x='3'%20y='2'/%3e%3c/svg%3e";
const MondelezLogo = "/assets/Mondelez-Logo-hH76SB2u.svg";
const shahi = "data:image/svg+xml,%3csvg%20version='1.2'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20194%2062'%20width='194'%20height='62'%3e%3ctitle%3eshahi-logo-hd%3c/title%3e%3cdefs%3e%3cimage%20width='164'%20height='35'%20id='img1'%20href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAAAjCAMAAAAt3lETAAAAAXNSR0IB2cksfwAAAn9QTFRFAAAAKTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9KTl9IO+UMgAAANV0Uk5TAAEXPVlue4B6bVo8EFxzaktfBltkCUhQAxZosdjq+P/506VgD8zsptIN8UYT36CzxnX38FV5lwTIkuImCL6DL301nLAk/ei4tNSp73yBBQAruyxBysRpoZ6UEvv+MPznCx22wKibj3ZJZ7fJ4fWrIc5yDNunQx8C5jRiy07WUoq/1cEKzYQn6ZEVhkA2MusZEdzRJbyvINqQnwdMa/RHie0oLtnyb/qNsqwiSlZlRBTQI93k9nTXOLmumsXl7n4pwz7gXYsxQnGYGy3jmbpUpKOOvYVsjWd0fgAABBJJREFUeJyt2PlbTFEYB/AztpIUlUTLGTWlGS2yDYqyDDF2ocwSlRKylCSUJWKsSYXsW5E1ZS872fc/yDTd855779ymucv70z3f99z3+czTzF1CiJSqV+8+fft5eHj29xrgjTg10IeULysdBOlgP+5+5A8tnwDerCEB0Aqkqd9gSId2JUE06UN2DRseHBIahh2lDh0RHqFhDY7EpKJY6UhIo7VciLcOWjhsFLcXEwutOJpqoyGNZ9g0Gc0kCWMwr8aOU0lGjmcPmqBXBqmdyCd21iSYLhYZzR4zOVERZNIUISPGUyUik7ljAhRBpggbMZ4mDTmdO2WGEsiZBljOmp06h67wXElIvZGLDItRADkPps1fgNDCRYuhO3mJFORSzCtPBZBp0A7qGrOMBIblUpAr+MhoBZBhZJHOnBEBSYYE5Eo1k5pMzIHZIh9pJYtMr1WO/uqsyOzUnDW5U/PWSkDmk3TdenIULh+5AVYFG/sP2JSEVEMQt8Qg9ZuZ0LoFrulRhbKR4ZhV1qKtecXbSrpDFtCbss9mSNlICwm3lyYXkOMdgsiddJZnZg/IXZhX1rKM8m0qQaRwsZG7SbjHT7uXHO8TRAqXMLJiv8DWsgOVQvfuHpGFB5nMfAChQ2SD2iYXiRIPCm0ee1grAVlOsqgjCB0lP3ScLxuJjh0X3L7shGjkwnSSrbf/+qpOklV1iWwkOlVjEtpfqxWLrDtNsjOd5LOwxSIfierPjXZ6orRfjueJRZ4nH/ZCeefyIjwIXFIAaWeW5q27zD/h5BVxyPoaElWv7Fzb4Bps1CiBtL/kaK5GnMnWsU+w9uUhrddoXXdGHoEv93THuiQL9oxzRurorCK4E/eAdEBjLDf2NFBlHA9prKMV7IxsNDOJIc7LUTdhT40z8hadtSikB2SSrcnS+/adu/eYMfd96Y99MQ/p+rZoewCRSe0oKw2anZDu3xabgx+UPWwJ1Y0xZ5Ez9Iehny0K6d+Ku69HMpC2x+Q4Ft6YnkD/qRik6pkLI87US0eip+TYkEJOCYT+czHI5BZXSLxUBtKDftbirn59DklM+WKQ8B4iXI0ykKV0jPFulf2PVrkRLsFFdSKQ+heukdVV0pHoJmuQoe10u5muXiIRyFcXXCMbdshANqtxN/W6SgySXhPaEmm9eQtxrQwketeNsZU8FbiF9C6C9XvWLlQLccsHGUjkKWhsP0pGuIX8SC/cxWxkB3x9zClykMh/v9OjWvunzzDCHaSefrV1q9jIL1+hkaaRg0Qxvqmx9HZhNo74Vsx6yXEH2UTvpSPZRhT0HRrXy2Uh7VX5Iy/3Z3B8/IxfvztGcf59g35FkvrDSv9CmlOB0G1YRZ7jnIz+0U4CQpp4WHnQPRU5kOZ2JQtokv4fhPlrqKCLrwIAAAAASUVORK5CYII='/%3e%3c/defs%3e%3cstyle%3e%3c/style%3e%3cuse%20id='Background'%20href='%23img1'%20x='14'%20y='14'/%3e%3c/svg%3e";
const Sterling_biotech = "/assets/Sterling_biotech-beymfwDK.svg";
const SwissMilitary = "/assets/Swiss-Military-6UxaUGsI.svg";
const Tatva_chintan = "/assets/Tatva_chintan-0Kq6_hL0.svg";
const zydus = "/assets/zydus-rDIrA5jX.svg";
const first_Company_in_Kutch = "/assets/first_Company_in_Kutch-jpK2m0j5.png";
const CTA_ARROW = "data:image/svg+xml,%3csvg%20width='61'%20height='60'%20viewBox='0%200%2061%2060'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1%2030.1898L60%2030.1898'%20stroke='white'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M34%201.11755L60%2030.1898L34%2059.262'%20stroke='white'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
function HomeClients() {
  useEffect(() => {
    new Swiper(".client-sldr", {
      slidesPerView: 4.5,
      spaceBetween: 0,
      loop: true,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      speed: 3500,
      breakpoints: {
        320: {
          slidesPerView: 2.1
        },
        768: {
          slidesPerView: 3.1
        },
        1024: {
          slidesPerView: 4.5
        }
      }
    });
    new Swiper(".client-sldr2", {
      slidesPerView: 4.1,
      spaceBetween: 0,
      allowTouchMove: false,
      loop: true,
      autoplay: {
        delay: 0,
        reverseDirection: true,
        disableOnInteraction: false
      },
      speed: 3500,
      breakpoints: {
        320: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3.1
        },
        1024: {
          slidesPerView: 4.5
        }
      }
    });
    new Swiper(".cta-sldr", {
      fadeEffect: { crossFade: true },
      virtualTranslate: true,
      autoplay: {
        delay: 4e3,
        disableOnInteraction: false
      },
      speed: 800,
      slidersPerView: 1,
      effect: "fade",
      pagination: {
        el: ".testml-pegination",
        clickable: true
      }
      // navigation: {   
      //     nextEl: ".cta-swiper-button-next",
      //     prevEl: ".cta-swiper-button-prev",
      // },          
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "client-sec section-padd-LR", children: [
    /* @__PURE__ */ jsxs("div", { className: "main-container", children: [
      /* @__PURE__ */ jsx("div", { className: "ovrflw-hdn", children: /* @__PURE__ */ jsx("h2", { className: "black js-split-text", children: "Our Clients" }) }),
      /* @__PURE__ */ jsx("p", { className: "client-para black", "data-aos": "fade-up", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "", children: "Trusted by industry leaders for customized supply chain excellence worldwide." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "swiper client-sldr", "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "", children: /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: adani_Solar, alt: "adani_Solar" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: amneal, alt: "amneal" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: borosil, alt: "borosil" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: Caterpillar, alt: "Caterpillar" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: MondelezLogo, alt: "MondelezLogo" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: shahi, alt: "shahi" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: Sterling_biotech, alt: "Sterling_biotech" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: SwissMilitary, alt: "SwissMilitary" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: Tatva_chintan, alt: "Tatva_chintan" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: zydus, alt: "zydus" }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "swiper client-sldr2", "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "", children: /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: MondelezLogo, alt: "MondelezLogo" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: Tatva_chintan, alt: "Tatva_chintan" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: Sterling_biotech, alt: "Sterling_biotech" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: zydus, alt: "zydus" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: Caterpillar, alt: "Caterpillar" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: borosil, alt: "borosil" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: amneal, alt: "amneal" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: adani_Solar, alt: "adani_Solar" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: shahi, alt: "shahi" }) }),
      /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("img", { src: SwissMilitary, alt: "SwissMilitary" }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "main-container client-main-container2 width-1250", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", children: /* @__PURE__ */ jsxs("div", { className: "client-img-bx", children: [
      /* @__PURE__ */ jsx("img", { className: "first_Company-img", src: first_Company_in_Kutch, alt: "1st_Company_in_Kutch" }),
      /* @__PURE__ */ jsxs("div", { className: "client-contnt-bx", children: [
        /* @__PURE__ */ jsxs("div", { className: "swiper3 cta-sldr", children: [
          /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
            /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("h2", { className: "white ttl-60px", children: "MRS is the 1st Logistics Company in Kutch to use RFID & block Chain technology for Real time visibilty for last Mile Delivery" }) }),
            /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("h2", { className: "white ttl-60px", children: "MRS is the 1st Company to provide Grade A Warehousing services in Kutch" }) }),
            /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("h2", { className: "white ttl-60px", children: "MRS is 1st company to build single location based Grade A Compliant Warehouse of 1 lacs Sq Ft." }) }),
            /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("h2", { className: "white ttl-60px", children: "MRS is the 1st company to provide 3 PL Solution to One of the Largest Medical Device company in the world." }) })
          ] }),
          /* @__PURE__ */ jsx("div", { class: "testml-pegination" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "client-btn enquire_btn", id: "btn-styl", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsxs("a", { children: [
          /* @__PURE__ */ jsxs("span", { className: "btn_name", children: [
            "Elevate Your",
            /* @__PURE__ */ jsx("br", {}),
            "Supply Chain Today"
          ] }),
          " ",
          /* @__PURE__ */ jsx("img", { src: CTA_ARROW, alt: "Arrow", className: "hm-cta" })
        ] }) })
      ] })
    ] }) })
  ] }) });
}
const postsData = [
  {
    id: 18,
    slug: "rail-logistics-for-renewable-energy-projects-moving-solar-and-wind-cargo-efficiently",
    title: "Rail Logistics for Renewable Energy Projects: Moving Solar and Wind Cargo Efficiently",
    short_description: "Explore how rail freight enables safe, cost-effective movement of solar panels, wind turbines, and renewable energy cargo.",
    content: `
            <p>
            India’s renewable energy sector is on a remarkable growth path. With ambitious government targets and massive private investment, projects in solar and wind power are scaling faster than ever before. But while the energy generated is green, the logistics behind it can often be complex, costly, and resource-intensive.
            </p>
            
            <p>Transporting solar panels, wind turbine blades, nacelles, and heavy machinery for renewable projects is not just about moving cargo from point A to B. It’s about
            <span class='blodHead'>designing a logistics strategy that balances efficiency, safety, and sustainability.</span>This is where <span class="blodHead"><a href="https://www.mrssupplychain.com/blog/rail-transport-sustainable-freight-logistics-india" target="_blank" class="blodHead">Rail logistics</a>
</span> is emerging as a powerful enabler.
            </p>

            <p>At <span class="blodHead">MRS Supply Chain</span> we have seen firsthand how rail, integrated with <span class="blodHead"><a href="https://www.mrssupplychain.com/blog/the-strategic-advantage-of-rail-connected-warehousing-in-india" target="_blank" class="blodHead">rail-connected warehousing</a></span> and multimodal solutions, transforms renewable energy project execution.</p>
           
            <h4>Why Rail Works Best for Renewable Energy Cargo</h4>
            <p>Unlike conventional cargo, renewable energy equipment often involves <span class="blodHead">oversized and heavy loads :</span></p>

            <ul>
              <li><span class='blodHead'>Solar panels : </span>Require careful stacking and safe handling due to their fragile structure.</li>
              <li><span class='blodHead'>Wind turbine blades : </span>Often over 50 meters long, requiring specialized handling and longer routes.</li>
              <li><span class='blodHead'>Transformers & nacelles : </span>Ultra-heavy machinery that demands reinforced loading platforms.</li>
              
              
            </ul>
            <p></p>

            <p class='blodHead'>Road transport alone struggles to handle these challenges efficiently. Rail, however, provides three distinct advantages
            </p>

            <p><span class='blodHead'>1. Capacity for Oversized Loads - </span>Indian Railways’ infrastructure supports flat wagons, heavy-haul cargo, and specialized rakes, making it suitable for project cargo.</p>
            <p><span class='blodHead'>2. Cost Savings Over Distance - </span>For long hauls across India, rail can reduce transportation costs by 25–40% compared to road.</p>
            <p><span class='blodHead'>3. Sustainability - </span> Using rail lowers the carbon footprint of logistics, aligning with the green objectives of renewable projects themselves.</p>


            
            <h4>Case in Point: Solar Energy Parks in Gujarat and Rajasthan</h4>
            
            <p>Consider the <span class="blodHead"><a href="https://www.mrssupplychain.com/blog/navigating-the-complexities-of-import-management-for-solar-panels-with-mrs-supply-chain" target="_blank" class="blodHead">solar power parks</a></span> coming up in <span class="blodHead"><a href="https://www.mrssupplychain.com/blog/warehousing-in-gujarat-and-its-importance-for-key-industries" target="_blank" class="blodHead">Gujarat</a> and Rajasthan.</span> These projects demand delivery of thousands of panels, mounting structures, and inverters within tight timelines.
            </p>

            <p>By leveraging <span class="blodHead">Free Trade Warehousing Zones (FTWZs)</span> in Mundra and Kandla—both well-connected to rail corridors—companies can:</p>

            <ul>
              <li>Import solar panels in bulk, store them duty-free, and release them in sync with project timelines.</li>

              <li>Move cargo directly from port to inland rail-connected warehouses, cutting down on multiple road trips.</li>

              <li>Enable faster last-mile delivery with multimodal integration (rail-to-road).</li>
            </ul>

            <p>The result? Reduced logistics costs and a smoother project rollout.</p>


            <h4>Wind Projects: The Rail Advantage in Action</h4>
            <p>Wind power logistics presents even bigger challenges. Blades and towers cannot be dismantled easily, and their transport requires precise coordination. Here, <span class="blodHead">rail-connected project cargo handling</span> is proving invaluable.
            </p>

            <p>Take, for instance, <span class="blodHead">wind turbine cargo moving from southern India to northern states.</span> Instead of congested highways, rail corridors provide a <span class="blodHead">dedicated path for oversized loads,</span> ensuring:</p>

            <ul>
              <li><span class='blodHead'>Safe transit</span> with fewer handling touchpoints.</li>
              <li><span class='blodHead'>On-time delivery</span> that matches project execution schedules.</li>
              <li><span class='blodHead'>Custom solutions</span> like reinforced loading bays at warehouses for blade storage.</li>
              
            </ul>
            <p>Warehouses near rail corridors become staging grounds—cargo is stored, inspected, and dispatched in alignment with project timelines.
            </p>



            <h4>Integrating Rail with Modern Warehousing</h4>
            <p>The real strength lies not just in rail but in its integration with modern warehousing. Facilities designed for renewable cargo feature:</p>

            <ul>
              <li><span class='blodHead'>Heavy-duty flooring</span for ultra-heavy equipment.</li>
              <li><span class='blodHead'>Open yard storage</span>for blades and towers.</li>
              <li><span class='blodHead'>Specialized cranes and loading bays</span>for oversized cargo.</li>
              <li><span class='blodHead'>Value-added services</span>like packaging, labeling, and sequencing to support project rollout.</li>
              
            </ul>
            <p>
           For companies managing imports, an <span class="blodHead">FTWZ near a port with rail connectivity</span> offers unmatched efficiency—customs duty deferment, safe storage, and direct inland movement via rail.
            </p>

            <p><a href="https://www.mrssupplychain.com/blog/designing-warehouses-for-bulk-and-project-cargo-challenges-and-solutions" target="_blank" class="blodHead">Explore more about Project Cargo Solutions at MRS</a></p>


            <h4>The Strategic Advantage Going Forward</h4>
            <p>As India accelerates toward its renewable targets — <span class="blodHead">500 GW of non-fossil fuel capacity by 2030</span> — the demand for efficient logistics will only intensify. Rail will be at the heart of this growth, not only because of its capacity and cost-effectiveness but also because it complements the sustainability mission of renewable projects.<p>

            <p>By combining rail logistics with <span class="blodHead">specialized warehousing and FTWZ solutions,</span> project developers and EPC contractors can:</p>


            
            <ul>
              <li>Ensure <span class='blodHead'>timely delivery</span> of critical equipment.</li>
              <li><span class='blodHead'>Lower overall logistics costs.</span></li>
              <li>Reduce environmental impact while building clean energy projects.</li>
              
            </ul>

            <

            

            <h4>Final Word</h4>
            <p>Renewable energy is shaping India’s future. To support it, logistics must be as innovative and sustainable as the projects themselves. Rail logistics, integrated with <span class="blodHead"><a href="https://www.mrssupplychain.com/services/multiuser-warehousing" target="_blank" class="blodHead">warehousing solutions</a></span> at strategic locations like Mundra, Kandla, and Nhava Sheva, offers the perfect synergy.</p>

            <p>At <span class="blodHead"><a href="https://www.mrssupplychain.com/" target="_blank" class="blodHead">MRS Supply Chain</a></span> we specialize in building these connections—linking ports, rail, and warehouses to move solar panels, wind turbines, and heavy equipment with precision and efficiency.</p>

            <p>If your renewable project demands <span class="blodHead">end-to-end rail-connected warehousing and project cargo logistics</span> our team is ready to deliver solutions that keep your projects on track—literally.</p>

           


           `,
    category: "Blog",
    featureImage: "Blog_img/rail-logistics-for-renewable-energy-projects-moving-solar-and-wind-cargo-efficiently.webp",
    metaTitle: "Rail Logistics for Renewable Energy | MRS Supply Chain",
    metaDescription: "Explore how rail freight enables safe, cost-effective movement of solar panels, wind turbines, and renewable energy cargo.",
    imgAltTag: "Rail Logistics for Renewable Energy | MRS Supply Chain",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Rail Logistics for Renewable Energy | MRS Supply Chain",
      description: "Explore how rail freight enables safe, cost-effective movement of solar panels, wind turbines, and renewable energy cargo.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2025-09-08"
  },
  {
    id: 17,
    slug: "the-future-of-value-added-services-in-warehousing-from-kitting-to-packaging",
    title: "The Future of Value-Added Services in Warehousing: From Kitting to Packaging",
    short_description: "From kitting to light assembly, discover how value-added services in warehousing improve efficiency and customer satisfaction.",
    content: `
            <p>
            Warehousing has always been about safe storage and timely distribution. But in today’s competitive landscape, that’s no longer enough. Customers want faster fulfillment, customised packaging, and products ready for the shelf—or even the end consumer—without delays.

            
      
            </p>
            
            <p>This is where <span class="blodHead">Value-Added Services (VAS)</span> in warehousing step in. From kitting and labeling to light assembly and packaging, modern warehouses are becoming hubs of efficiency that cut costs, reduce handling time, and enhance customer satisfaction.
            </p>
           
            <h4>What Are Value-Added Services in Warehousing?</h4>
            <p>Value-Added Services go beyond the traditional role of storing goods. They include a wide range of activities such as:</p>

            <ul>
              <li><span class='blodHead'>Kitting :</span> Combining multiple items into a single package (e.g., promotional bundles).</li>
              <li><span class='blodHead'>Labeling :</span> Printing and applying SKU-specific or compliance labels.</li>
              <li><span class='blodHead'>Sorting and Sequencing :</span> Preparing products for retail display or production lines.</li>
              <li><span class='blodHead'>Light Assembly :</span> Simple product assembly or customisation tasks before shipping.</li>
              <li><span class='blodHead'>Packaging and Repackaging :</span> Custom packs, protective wraps, or promotional designs.</li>
              
            </ul>

            <p>These services eliminate the need for businesses to carry out these functions separately, saving time and ensuring products move smoothly from the warehouse to the customer
             </br> 
             <a href='https://www.mrssupplychain.com/services/multiuser-warehousing'>Explore our Warehousing Services</a>
            </p>

            
            <h4>Why VAS Is Becoming Essential</h4>
            <h6 class='blodHead'>1. Rising Consumer Expectations</h6> 
            <p>E-commerce and retail industries have reshaped buyer behavior. Customers now expect products to arrive <span class="blodHead">faster, neatly packaged, and sometimes customised</span>
            . Warehouses that offer kitting, packaging, and labelling shorten the journey from inventory to doorstep.
            </br>
             <a href='https://www.mrssupplychain.com/sector/e-commerce-and-retail'>See how we support E-commerce & Retail Logistics</a>
            </p>


            <h6 class='blodHead'>2. Cost and Time Savings</h6> 
            <p>By shifting light assembly and packaging closer to the warehouse, companies reduce transportation costs and handling steps. For instance, instead of sending products to a separate packaging facility, everything is done under one roof—lowering lead times and minimising error.
            </p>

            <h6 class='blodHead'>3. Flexible Operations</h6> 
            <p>Value-added services give businesses flexibility to adapt. A warehouse can quickly shift from handling retail-ready packs during festive seasons to creating industrial kits for bulk buyers—all without major disruptions.
            </p>
            


            <h4>The Evolution of Warehousing: Beyond Storage</h4>
            <p>Traditional warehouses were designed for static storage. Today’s <span class="blodHead">Grade-A facilities</span>
 integrate technology and skilled labor to provide services that once belonged to manufacturing or distribution centers.
            </p>

            <p>For example, an electronics brand might store bulk shipments at a warehouse. Instead of shipping cartons to another facility, the warehouse team handles:</p>

            <ul>
              <li>Repackaging each unit with accessories,</li>
              <li>Adding compliance labels,</li>
              <li>And preparing “ready-to-ship” parcels for last-mile delivery.</li>
              
            </ul>
            <p>The result? Faster movement, fewer intermediaries, and better visibility across the supply chain.
             </br>
             <a href='https://www.mrssupplychain.com/services/multiuser-warehousing'>Read: How Multi-User Warehousing Creates Flexibility for Businesses</a>
            </p>



            <h4>The Role of Technology in VAS</h4>
            <p>Technology is a key enabler of value-added services. Modern <span class="blodHead">Warehouse Management Systems (WMS)</span>
 integrate VAS workflows, allowing real-time tracking of kitting, assembly, and packaging tasks. Barcode scanning, RFID tagging, and automated sorting systems ensure accuracy and speed.</p>


            <ul>
              <li><span class='blodHead'>Barcode and RFID integration - </span>Faster, error-free labeling and sorting.</li>
              <li><span class='blodHead'>Automated packaging systems - </span>Higher throughput with reduced labor dependency.</li>
              <li><span class='blodHead'>Inventory visibility - </span> Businesses can monitor every stage, from kitting to dispatch.</li>
              
            </ul>
            <p>
            With digital workflows, warehouses can also adapt to seasonal spikes or sudden demand surges without compromising service quality.
            </p>


            <h4>Industry Use Cases</h4>
            <h6 class='blodHead'>1. Retail & E-commerce</h6>
            <p>VAS makes it easier to prepare ready-to-ship packages, create promotional bundles, and ensure products are shelf-ready. For online marketplaces, it also means quicker returns processing and resale preparation.<p>

            <h6 class='blodHead'>2. Pharma & Healthcare</h6>
            <p>In regulated industries, labeling and repackaging aren’t just optional—they’re compliance requirements. Warehouses offering specialised VAS reduce risks while speeding up distribution.
            <br>
              <a href='https://www.mrssupplychain.com/blog/your-strategic-partner-in-importing-medical-devices-to-india-mrs-supply-chain'>Explore our Healthcare & Medical Device Import Solutions</a> 
            
            <p>

            <h6 class='blodHead'>3. Industrial and Project Cargo</h6>
            <p>For bulk or heavy equipment, kitting smaller parts together and preparing protective packaging ensures safer handling during multimodal transport.
            <br>
              <a href='https://www.mrssupplychain.com/sector/industrial-sector'>Check out our Industrial Sector Logistics Solutions</a>  
            </p>


            <h4>The Competitive Edge of VAS Warehousing</h4>
            <p>1 .Faster Market Entry – Products can be customized or packaged in real-time, helping companies respond quickly to changing demand</p>

            <p>2. Lower Inventory Costs – Instead of storing multiple packaging variations, businesses keep bulk stock and adapt packaging inside the warehouse.</p>

            <p>3. Better Customer Experience – From neatly labeled e-commerce parcels to promotional kits, the final touch happens closer to the consumer.</p>

            <p>At MRS Supply Chain, our <span class="blodHead">our warehousing solutions</span> are already built with value-added services in mind. By combining storage, kitting, labeling, and packaging with multimodal distribution, we help businesses streamline operations without adding complexity.
            </br>
              <a href='https://www.mrssupplychain.com/blog/warehousing-in-gujarat-and-its-importance-for-key-industries'>Learn how MRS Supply Chain delivers end-to-end Warehousing Efficiency</a>  
            
            </p>


            <h4>Looking Ahead: The Future of VAS in Warehousing</h4>
            <p>The future points toward greater integration of value-added services into everyday warehouse operations. Expect to see:</p>
            <ul>
              <li> <span class='blodHead'>Automation in kitting and packaging </span>to handle high-volume orders with accuracy.</li>
              <li> <span class='blodHead'>Customisation on demand </span>where warehouses adapt packaging for individual customer orders. </li>
              <li> <span class='blodHead'>Sustainability in packaging </span>with eco-friendly materials and reduced waste as a standard practice.</li>
            </ul>

            <p>Businesses that embrace these changes will not only cut costs but also build stronger customer loyalty.
            </p>

            <h4>Final Thought</h4>
            <p>Warehousing is no longer just about storing pallets. It’s about <span class="blodHead">adding value at every stage</span>
 — whether that’s through kitting, labeling, light assembly, or packaging. The warehouses that adopt this approach become more than storage facilities; they become <span class='blodHead'><a href='https://www.mrssupplychain.com/blog/your-strategic-partner-in-importing-medical-devices-to-india-mrs-supply-chain'>strategic partners
            </a></span> in driving efficiency and customer satisfaction.
            <p>

            <p>MRS Supply Chain continues to invest in this future, ensuring clients across <span class="blodHead">e-commerce</span>, <span class='blodHead'><a href='https://www.mrssupplychain.com/blog/strategic-warehousing-for-pharma-at-gujarat-key-ports'>pharma
            </a></span>, <span class="blodHead">industrial, and renewable sectors</span> benefit from smarter, faster, and more flexible warehousing solutions.

            </br>
              <a href='https://www.mrssupplychain.com/'> Discover the Future of Value-Added Warehousing with MRS Supply Chain</a>
            </p>


           `,
    category: "Blog",
    featureImage: "Blog_img/the-future-of-value-added-services-in-warehousing-from-kitting-to-packaging.webp",
    metaTitle: "Value-Added Warehousing Services | MRS Supply Chain",
    metaDescription: "From kitting to light assembly, discover how value-added services in warehousing improve efficiency and customer satisfaction.",
    imgAltTag: "Value-Added Warehousing Services | MRS Supply Chain",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Value-Added Warehousing Services | MRS Supply Chain",
      description: "From kitting to light assembly, discover how value-added services in warehousing improve efficiency and customer satisfaction.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2025-09-01"
  },
  {
    id: 16,
    slug: "designing-warehouses-for-bulk-and-project-cargo-challenges-and-solutions",
    title: "Designing Warehouses for Bulk and Project Cargo: Challenges and Solutions",
    short_description: "Learn how warehouses handle oversized cargo like turbines and heavy machinery with smart design, safety, and rail access.",
    content: `
            <p>
            Not all cargo fits neatly into a pallet or carton. In industries like <span class='blodHead'>renewable energy, infrastructure, and heavy machinery</span>
            , logistics teams often deal with equipment that is massive in size, weight, or both. Moving a wind turbine blade, an oversized transformer, or a large piece of industrial machinery is very different from moving e-commerce parcels.
      
            </p>
            
            <p>This is where <span class='blodHead'>specialized warehouses for bulk and project cargo</span>
              play a critical role. Unlike standard storage facilities, these warehouses must be designed with unique layouts, safety standards, and multimodal access—especially rail connectivity—to handle oversized freight effectively.
            </p>
           
            <h4>What Makes Bulk and Project Cargo Different?</h4>
            <p>Project cargo refers to large, heavy, or high-value shipments that often require multiple modes of transport and custom handling. Common examples include:</p>

            <ul>
              <li><span class='blodHead'>Wind turbine parts</span> (blades, nacelles, towers)</li>
              <li><span class='blodHead'>Solar equipment</span> (large panels, structures)</li>
              <li><span class='blodHead'>Heavy industrial machinery</span> (presses, turbines, engines)</li>
              <li><span class='blodHead'>Infrastructure equipment</span> (steel girders, pipes, construction gear)</li>
            </ul>

            <p>These items can span tens of meters in length or weigh several tons. That immediately rules out standard storage racks or forklifts—you need a warehouse built with <span class='blodHead'>space, structural strength, and safety in mind.</span>
             </br> 
             <a href='https://www.mrssupplychain.com/sector/renewable-energy-and-infrastructure-projects'>See how we support Renewable Energy & Infrastructure Logistics</a>
            </p>

            
            <h4>Key Challenges in Storing Oversized Cargo</h4>
            <h6 class='blodHead'>1. Space and Layout Design</h6> 
            <p>Unlike conventional warehouses, where efficiency comes from stacking pallets vertically, bulk cargo requires horizontal space. Long blades or machinery must be laid out with clear pathways for movement. Designing wide entry points, reinforced flooring, and open storage bays is essential.</p>

            <h6 class='blodHead'>2. Heavy Load Management</h6> 
            <p>Standard warehouse floors aren’t designed to hold multi-ton machinery. Floors must be<span class='blodHead'>reinforced with higher load-bearing capacity</span>
             Similarly, specialized cranes and gantries often replace forklifts as the primary handling equipment.</br> 
             <a href='https://www.mrssupplychain.com/sector/renewable-energy-and-infrastructure-projects'>See how we  Explore our Warehousing Solutions</a>
            </p>

            <h6 class='blodHead'>3. Safety Standards</h6> 
            <p>Oversized cargo comes with safety risks—tipping, shifting during handling, or even structural damage to the facility. Warehouses must have:
            </p>
            <ul>
              <li>Clearly marked zones for oversized storage</li>
              <li>Trained personnel for crane and rigging operations</li>
              <li>Fire and hazard safety tailored for bulky industrial goods</li>
            </ul>

            <h6 class='blodHead'>4. Seamless Multimodal Connectivity</h6> 
            <p>The biggest challenge isn’t just storing the cargo—it’s moving it. Heavy or oversized shipments often travel best by <span class='blodHead'>rail,</span>
            since it allows for bulk movement without road restrictions. That makes rail-connected warehouses especially valuable for project cargo.</br> 
             <a href='https://www.mrssupplychain.com/services/road-and-rail-transport'>Read more about our Road and Rail Transport Services</a>
            </p>


            <h4>Smart Solutions for Bulk and Project Cargo Warehousing</h4>
            <h6 class='blodHead'>1. Purpose-Built Infrastructure</h6> 
            <p>Warehouses designed for project cargo include:
            </p>
            <ul>
              <li><span class='blodHead'>Extra-wide gates</span> for entry of oversized trucks and trailers</li>
              <li><span class='blodHead'>High-clearance ceilings</span> to accommodate cranes and bulky equipment</li>
              <li><span class='blodHead'>Dedicated open yards</span> for temporary staging and easy maneuvering</li>
            </ul>
            <p>In the case of renewable energy projects, this allows turbine blades or solar structures to be stored safely without damage.
            </p>

            <h6 class='blodHead'>2. Integrated Handling Equipment</h6> 
            <p>Cranes, gantries, and heavy-duty forklifts are essential. More advanced facilities also include <span class='blodHead'>automated lifting systems</span>
            to reduce manual risk and improve efficiency. These must be built into the warehouse design itself rather than added as an afterthought.
            </p>

            <h6 class='blodHead'>3. Multimodal Rail Integration</h6> 
            <p>Rail is a natural partner for oversized cargo. A warehouse designed with an <span class='blodHead'>in-house rail siding or nearby terminal access</span>
             access cuts down the need for risky long-haul road movement. Rail-connected project cargo warehouses allow goods to move directly from port to warehouse to project site.
            </br> 
             <a href='https://www.mrssupplychain.com/blog/exploring-the-future-of-rail-transportation-solutions-in-india'>Discover the Strategic Advantage of Rail-Connected Warehousing</a>
            </p>

            
            <h6 class='blodHead'>4. Digital Visibility and Planning</h6> 
            <p>Handling oversized cargo isn’t just a physical challenge—it’s also about precision planning. Warehouse Management Systems (WMS) integrated with project logistics workflows help track each shipment’s status, ensuring every crane movement or rail loading is planned and executed with safety in mind.
            </p>




            <h4>Case in Point: Renewables in Gujarat</h4>
            <p>The rise of <span class='blodHead'>renewable energy projects in Gujarat and Kutch</span>
 has created a surge in demand for specialized bulk cargo handling. With over <span class='blodHead'>400,000 sq. ft. of Grade-A warehousing</span>
 in the region, facilities near Mundra Port are now serving as staging hubs for wind turbines and solar equipment.
            </p>

            <p>Rail connectivity from Mundra to northern India ensures equipment can move safely and quickly to project sites, reducing both costs and risks.</br> 
             <a href='https://www.mrssupplychain.com/services/pioneering-duty-free-warehousing-solutions'>Learn about our Kutch Warehousing Strength</a>
            </p>


            <h6 class='blodHead'>Industries Driving This Demand</h6> 
            <ul>
              <li><span class='blodHead'>Renewable Energy - </span>Wind turbine and solar parts require long storage bays and careful movement.</li>
              <li><span class='blodHead'>Industrial Machinery - </span>Factories rely on safe handling of multi-ton presses, engines, and equipment.</li>
              <li><span class='blodHead'>Infrastructure Projects - </span>Pipes, girders, and construction materials need strong, accessible facilities.</li>
              <li><span class='blodHead'>Oil & Gas - </span>Large drilling and refinery equipment often depends on bulk cargo solutions.</li>
            </ul>
            <p><a href='https://www.mrssupplychain.com/sector/industrial-sector'>Explore our Industrial Sector Logistics Solutions</a>
            </p>

            <h6 class='blodHead'>The Bottom Line</h6> 
            <p>Designing warehouses for bulk and project cargo isn’t about tweaking a standard facility—it’s about building for scale, strength, and multimodal efficiency.<span class='blodHead'>building for scale, strength, and multimodal efficiency</span>
            access, these warehouses must handle the size and weight of modern industry while keeping safety and speed at the forefront.
            </p>

            <p>At MRS Supply Chain, we specialize in creating and managing <span class='blodHead'>project cargo-ready warehousing solutions</span>
            With our expertise in <span class='blodHead'>renewables, heavy machinery, and multimodal logistics,</span>
            , we help businesses store, handle, and move oversized cargo with confidence.
            </br> 
             <a href='https://www.mrssupplychain.com/'>See how MRS Supply Chain can handle your Project Cargo Needs</a>
            </p>


            <h6 class='blodHead'>Final Thought</h6> 
            <p>As India pushes forward with renewable energy and industrial growth, project cargo is becoming more common than ever. Businesses that invest in the right warehousing solutions today will be better positioned to deliver safely, on time, and at scale tomorrow.
            </p>
















            
           `,
    category: "Blog",
    featureImage: "Blog_img/designingWarehousesForBulkAndProjectCargoChallengesAndSolutions.jpg",
    metaTitle: "Warehousing for Bulk & Project Cargo | MRS Supply Chain",
    metaDescription: "Learn how warehouses handle oversized cargo like turbines and heavy machinery with smart design, safety, and rail access.",
    imgAltTag: "Warehousing for Bulk & Project Cargo | MRS Supply Chain",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Warehousing for Bulk & Project Cargo | MRS Supply Chain",
      description: "Learn how warehouses handle oversized cargo like turbines and heavy machinery with smart design, safety, and rail access.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2025-08-29"
  },
  {
    id: 15,
    slug: "the-strategic-advantage-of-rail-connected-warehousing-in-india",
    title: "The Strategic Advantage of Rail-Connected Warehousing in India",
    short_description: "Explore how rail-linked warehousing cuts costs, reduces lead times, and boosts multimodal efficiency with MRS Supply Chain solutions.",
    content: `
            <p>
               Every business today is under pressure to deliver faster, reduce costs, and still keep supply chains reliable. That’s easier said than done in a country as vast and complex as India. This is where <span class='blodHead'> rail-connected warehousing</span> is quietly reshaping the logistics game.
            </p>
            
            <p>When warehouses are located near major rail corridors and ports like Mundra or Nhava Sheva, the entire supply chain benefits. It’s not just about storing goods—it’s about building an ecosystem where rail, road, and port logistics work together seamlessly.</p>
           
            <h4>Why It Matters More Than Ever</h4>
            <p>For years, road transport was the go-to option for domestic distribution. But rising fuel prices, traffic congestion, and stricter sustainability demands have made businesses rethink the model. Rail offers a smarter alternative, and when paired with strategically placed warehouses, it changes the equation in three big ways:</p>

            <h6 class='blodHead'>1. Cost Advantage That Scales</h6> 
            <p>Rail can move bulk cargo at a fraction of road freight costs. By cutting out unnecessary handling at transit points, warehouses near railheads save both time and money. For businesses working on tight margins, these savings aren’t small—they directly impact profitability. </br> 
             <a href='https://www.mrssupplychain.com/services/road-and-rail-transport'>See how our Road and Rail Transport Services reduce costs</a></p>




            <h6 class='blodHead'>2. Faster Lead Times to Key Markets</h6> 
            <p>Rail-linked warehouses turn long-distance hauls into reliable, time-bound connections. For example, goods moving from Mundra Port to Delhi-NCR by rail can arrive in nearly half the time compared to road. With a warehouse positioned along that corridor, distribution becomes faster and far more predictable. </br> 
             <a href='https://mrssupplychain.com/blog/rail-transport-sustainable-freight-logistics-india'>Read: Why Rail Freight Is a Smart Choice for Indian Businesses</a></p>


            <h6 class='blodHead'>3. True Multimodal Flexibility</h6> 
            <p>A warehouse tied into both rail and road networks gives businesses the best of both worlds. Rail handles the heavy lifting over long distances, while trucks take care of last-mile deliveries. The result? Lower costs without sacrificing reach. </p>
            
            <h4>The Big Push: Dedicated Freight Corridors</h4> 
            <p>India’s investment in <span class='blodHead'>Dedicated Freight Corridors (DFCs)</span>  is a turning point. The Western DFC, for instance, connects Dadri with JNPT and Mundra Ports—creating a direct, high-speed rail link for cargo. Warehouses along these routes act like power stations for supply chains, giving companies faster access to both domestic and export markets.</p>

            <p>Sectors moving bulky goods—like <span class='blodHead'>renewable energy, infrastructure, or industrial equipment</span> —stand to gain the most. </br>
             <a href='https://www.mrssupplychain.com/sector/renewable-energy-and-infrastructure-projects'>Explore how we support Renewable Energy & Infrastructure Logistics</a>
            
            </p>

            <h4>What Businesses Gain</h4>
            <h6 class='blodHead'>1. Cost Advantage That Scales</h6> 
            <p>Rail-connected hubs make it easier for businesses to scale distribution without buying fleets or building standalone warehouses. Shared or <span class='blodHead'>multi-user warehousing</span> keeps costs flexible while still giving access to top-grade infrastructure. </br> 
             <a href='https://www.mrssupplychain.com/blog?utm_source=chatgpt.com'> Discover our Multi-User Warehousing Approach</a></p>

            <h6 class='blodHead'>2. A More Sustainable Supply Chain</h6>
            <p>Rail moves goods with far lower emissions than trucks. For companies working toward ESG goals, shifting part of the supply chain to rail-linked warehouses is a clear step toward greener operations.</p>

            <h6 class='blodHead'>3. Built-in Resilience</h6>
            <p>When roads are disrupted—be it by weather, strikes, or fuel shortages—rail becomes the backbone that keeps goods moving. Warehouses connected to this network add a safety layer, helping companies avoid costly delays.</p>

           

            <h4>On the Ground: Kutch as a Case Study</h4>
            <p>The Kutch region shows how this works in practice. With over <span class='blodHead'>400,000 sq. ft. of Grade-A warehousing</span>  close to Mundra Port and key rail links, businesses can move containers straight from port to warehouse and then on to northern India. It’s faster, cheaper, and cuts down unnecessary handling.
             </br> 
             <a href='https://www.mrssupplychain.com/services/multiuser-warehousing'> Learn more about our Warehousing Solutions</a>
            </p>



            <h4>Who Benefits Most</h4>

            <ul>
            <li><span class='blodHead'>E-commerce & Retail</span> : Quicker fulfillment through multimodal hubs close to consumption centers.</li>

            <li><span class='blodHead'>Pharma & Healthcare</span> : Regulatory-compliant storage with faster access to distribution.</li>

            <li><span class='blodHead'>Industrial Equipment </span> : Safe storage and transport of oversized machinery.</li>

            <li><span class='blodHead'>Renewables </span> : Efficient movement of bulky wind and solar equipment across long distances</li>
            
            </ul>

            <p> <a href='https://www.mrssupplychain.com/sector/e-commerce-and-retail'>Check out our E-commerce & Retail Logistics Services  </a></p>

            <h4>The Road Ahead</h4>
            <p>India’s supply chain future is being built on the backbone of rail. As rail corridors expand and more Grade-A warehouses come online, the opportunities for businesses to cut costs, save time, and reduce emissions will only grow.</p>

            <p>At MRS Supply Chain, we’re already building for this future. With our network of <span class='blodHead'>rail-connected warehouses, multimodal transport solutions, and deep sector expertise,</span>  we help businesses stay one step ahead in a competitive market.
            </br> 
             <a href='https://www.mrssupplychain.com/contact-us'>See how MRS Supply Chain can optimize your logistics with Rail-Connected Warehousing</a>
            </p>

            <h4>Conclusion</h4>
            <p>Rail-connected warehousing is no longer just a “nice to have.” It’s becoming the foundation of efficient, resilient, and sustainable supply chains in India. For companies serious about growth, this is where the real competitive advantage lies.</p>


            
           `,
    category: "Blog",
    featureImage: "Blog_img/the-strategic-advantage-of-rail-connected-warehousing-in-india.png",
    metaTitle: "Rail-Connected Warehousing in India | MRS Supply Chain",
    metaDescription: "Explore how rail-linked warehousing cuts costs, reduces lead times, and boosts multimodal efficiency with MRS Supply Chain solutions.",
    imgAltTag: "Rail-Connected Warehousing in India | MRS Supply Chain",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Rail-Connected Warehousing in India | MRS Supply Chain",
      description: "Explore how rail-linked warehousing cuts costs, reduces lead times, and boosts multimodal efficiency with MRS Supply Chain solutions.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2025-08-28"
  },
  {
    id: 14,
    slug: "india-next-global-manufacturing-hub",
    title: "India Poised to Become the Next Global Manufacturing Hub: Opportunities, Challenges, and the Critical Role of Supply Chain Solutions",
    short_description: "Explore why India is emerging as a top global manufacturing hub and how strong logistics & warehousing solutions drive this growth. Learn more with MRS Supply Chain.",
    content: `
            <p>
               In today’s dynamic global economy, the manufacturing sector is undergoing a massive transformation. As companies seek to diversify and build resilient supply chains post-pandemic and amid geopolitical shifts, <span class='blodHead'>India is emerging as a prime candidate to become the next global manufacturing powerhouse.</span> Its strategic location, evolving policy landscape, expanding infrastructure, and cost advantages are making it increasingly attractive for investors and manufacturers worldwide.
            </p>
            
            <p>This blog explores why India is well-positioned to lead the next manufacturing wave, what this means for supply chains, and how logistics and warehousing players like MRS Supply Chain are pivotal in supporting this growth.</p>
           
            <h4>The Manufacturing Shift: Why India Is on the Rise</h4>
            <p>For decades, China has been the epicentre of global manufacturing, driven by vast scale, efficient infrastructure, and export-focused policies. However, rising labour costs, geopolitical tensions, and supply chain disruptions have pushed many global players to explore alternatives. The emerging China+1 strategy, where companies diversify manufacturing beyond China, has turned attention toward India.</p>

            <h5 class='blodHead'>Key Advantages India Offers</h5>
            
            <ul>
            <li><span class='blodHead'>Large Workforce & Competitive Labor Costs</span> : India’s young, trainable population offers a labour cost advantage over China and Southeast Asia <a href='https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS'>(World Bank report on labour costs).</a></li>

            <li><span class='blodHead'>Favorable Policy Environment </span> : Initiatives like Make in India, Atmanirbhar Bharat, and Production Linked Incentives (PLI) encourage domestic manufacturing growth.</li>

            <li><span class='blodHead'>Expanding Infrastructure</span> : Major investments in ports, freight corridors, and logistics hubs improve connectivity.</li>

            <li><span class='blodHead'>Geopolitical Stability</span> :India offers a stable environment to build long-term manufacturing facilities <a href='https://unctad.org'>(UNCTAD Investment Trends Monitor)</a> .</li>
            </ul>

            <p>According to industry reports, India’s manufacturing Purchasing Managers’ Index (PMI) and export orders are growing steadily, signaling robust industrial activity and global demand for Indian-made products (Source: IHS Markit, 2024).</p>
            
            <h4>India’s Policy Push: Make in India & Production Linked Incentives (PLI)</h4>
            <p>The Government of India has introduced landmark policies to catalyse manufacturing:</p>

            <ul>
            <li><span class='blodHead'>Make in India (2014)</span> : This flagship program aims to increase the manufacturing sector’s contribution to GDP from 16% to 25%, generating millions of jobs and promoting foreign direct investment (FDI).</li>

            <li><span class='blodHead'>Production Linked Incentive (PLI) Schemes </span> : Spanning over 14 sectors such as electronics, automotive, pharmaceuticals, textiles, and defense, the PLI programs offer financial incentives to firms for scaling manufacturing. With an outlay of approximately ₹2 trillion (US$23 billion), PLI is expected to significantly boost domestic production and exports.</li>
            </ul>

            <p>For example, the electronics sector alone is targeted with a ₹22,919 crore (approx. US$2.8 billion) scheme to move India from being an assembler to a more innovation-focused manufacturer. This is a crucial move as electronics and smartphone manufacturing become key growth drivers.</p>

            <p>Learn more about government initiatives to boost manufacturing <a href='https://www.makeinindia.com/'>here</a>.</p>

            <h4>Infrastructure Investments: Building the Backbone for Manufacturing</h4>
            <p>Strong infrastructure is essential to translate policy into action. India’s government has launched several mega-projects to improve connectivity:</p>

            <ul>
            <li><span class='blodHead'>Dedicated Freight Corridors (DFC)</span> : The Eastern and Western DFCs provide high-speed rail connectivity dedicated exclusively to freight, reducing transit times and costs.</li>

            <li><span class='blodHead'>East Coast Economic Corridor (ECEC)</span> : Stretching from Kolkata to Chennai, the ECEC aims to develop industrial clusters focused on sectors like automotive, petrochemicals, textiles, and food processing.</li>

            <li><span class='blodHead'>PM Gati Shakti : This national master plan integrates multiple infrastructure projects — roads, railways, ports, and airports — for seamless multimodal transport.</li>

            </ul>

            <p>The state of Tamil Nadu, often called the “Detroit of Asia,” is a hotspot for automotive manufacturing, supported by these transport corridors and infrastructure upgrades (Tamil Nadu Industrial Policy).</p>

            <h4>Manufacturing Growth Stories in India</h4>
            <p>Several sectors have already seen success:</p>

            <ul>
            <li><span class='blodHead'>Electronics and Smartphones</span> : Companies like Dixon Technologies and Foxconn are ramping up production. Apple has ambitious plans to increase iPhone manufacturing in India to 35% of global output by 2027 (Reuters report on Apple’s plans).</li>

            <li><span class='blodHead'>Defense Manufacturing</span> : The government is boosting domestic arms production with emergency procurements worth US$4.6 billion and promoting exports.</li>

            <li><span class='blodHead'>Fast Fashion and Apparel</span> :  With players like SHEIN and Reliance planning exports from India to global markets, the apparel sector is gearing up for growth.</li>
           </ul>

           <h4>Logistics and Warehousing: The Critical Link in India’s Manufacturing Ecosystem</h4>
          <p>Growth in manufacturing goes hand in hand with supply chain efficiency. Manufacturing hubs need reliable logistics, transport, and warehousing solutions to handle raw materials, in-process goods, and finished products.</p>

          <p>This is where <span class='blodHead' >MRS Supply Chain</span> plays a crucial role as a provider of <span class='blodHead' >top supply chain solutions in India-</span> offering logistics, warehousing, and transport services designed to support manufacturing clusters.</p>

          <h6 class='blodHead'>Strategic Connectivity & Rail Freight Advantages</h6>
          <p>One key enabler is rail transport, especially for connecting industrial hubs and ports. Rail freight is cost-effective, energy-efficient, and capable of moving large volumes over long distances.</p>

          <p>The rail corridor connecting Mundra Port to Delhi, for instance, exemplifies how rail logistics enhances freight movement by cutting transit time and reducing road congestion. This corridor supports the transport of bulk commodities and manufactured goods, contributing to smoother supply chains and lower costs. You can explore more about the benefits of this rail connection in this detailed blog on MRS Supply Chain.</p>

          <p>Rail transport aligns well with sustainability goals, as it produces fewer carbon emissions per ton-kilometer compared to road transport (International Energy Agency report).</p>


          <h6 class='blodHead'>Warehousing: Beyond Storage to Value Addition</h6>
            <p>Warehousing in key industrial states like Gujarat is expanding rapidly, supporting manufacturing growth with:</p>

            <ul>
            <li><span class='blodHead'>Grade-A Warehousing Facilities</span> : These modern warehouses offer advanced storage solutions with optimised space usage. Efficient warehouse space utilisation is vital to meet the storage demands of diverse industries. For insights, see this blog on space optimisation in warehouses.</li>

            <li><span class='blodHead'>Cold Chain Solutions</span> : Temperature-controlled warehousing is critical for sectors like pharmaceuticals, perishables, and chemicals. The growing importance of cold chain logistics near ports is discussed in this post on the future of cold chain logistics.</li>

            <li><span class='blodHead'>Duty-Free Warehousing</span> : Bonded warehouses facilitate duty deferment, enabling exporters and importers to manage cash flows better. MRS Supply Chain’s pioneering duty-free warehousing solutions support such specialised needs.</li>
           </ul>

           <p>The combination of efficient warehousing and integrated transport solutions enables manufacturers to reduce lead times, control inventory costs, and improve responsiveness. For manufacturers looking to optimize storage near key industrial hubs, read more about <a href='https://www.mrssupplychain.com/blog/warehousing-in-gujarat-and-its-importance-for-key-industries'>warehousing in Gujarat and its importance</a>  as well as <a href='https://www.mrssupplychain.com/blog/warehouse-in-mundra-choose-reliable-storage-for-your-needs'>choosing reliable storage in Mundra</a>.</p>


           <h4>The B2B Nature of Supply Chain Services for Manufacturing</h4>
           <p>The services offered by companies like MRS Supply Chain — logistics, warehousing, and transport — primarily serve other businesses. This business-to-business (B2B) model caters to manufacturers, retailers, distributors, and exporters, rather than individual consumers.</p>

           <p>The specificity of these services means that manufacturers looking to establish or expand production in India must carefully evaluate logistics partners capable of providing tailored solutions that handle complex supply chain demands. MRS Supply Chain’s expertise across these core operational pillars makes it a strong contender to support India’s manufacturing ambitions.</p>

           <p>If you want to learn how to avoid common import delays or smoothen your supply chain operations, consider reading this insightful blog on <a href='https://www.mrssupplychain.com/blog/how-to-avoid-import-delays-and-keep-your-business-running-smoothly'>how to avoid import delays</a>.</p>

           <h4>Challenges on the Road Ahead</h4>
           <p>While the outlook is promising, India faces challenges to becoming a global manufacturing hub:</p>

           <ul>
            <li><span class='blodHead'>Skill Gaps</span> : Despite a large workforce, there is a need for skilled labor trained in modern manufacturing technologies.</li>
            <li><span class='blodHead'>Infrastructure Bottlenecks </span> : Despite progress, certain regions lack robust last-mile connectivity.</li>
            <li><span class='blodHead'>Regulatory Complexity </span> : India’s regulatory environment can be complicated, requiring smoother processes for ease of doing business .</li>

            <li><span class='blodHead'>Energy & Sustainability </span> : Access to reliable power and green energy options must improve for sustainable industrial growth.</li>
           </ul>

           <p>Addressing these challenges will require continued collaboration between government, industry players, and supply chain providers.</p>


           <h4><h4>Challenges on the Road Ahead</h4></h4>
           <p>India’s emergence as a global manufacturing hub is no longer just a vision — it is underway. With the right policies, infrastructure investments, and a growing industrial base, India is attracting global brands to set up or expand manufacturing operations.</p>

           <p>However, these manufacturing ambitions can only be realised with robust logistics and warehousing networks that ensure timely, cost-effective movement and storage of goods. Supply chain solutions providers like <span class='blodHead' >MRS Supply Chain,</span> with their focus on key manufacturing regions and comprehensive services in <span class='blodHead' >logistics, warehousing, and transport across India,</span>  play an indispensable role in this transformation.</p>

           <p>For businesses ready to leverage India’s manufacturing potential, exploring expert supply chain services is critical. To learn more about MRS Supply Chain’s offerings, visit the <a href='https://www.mrssupplychain.com/'>home page</a>, or connect directly via their <a href='https://www.mrssupplychain.com/contact-us'>contact page.</a></p>`,
    category: "Blog",
    featureImage: "Blog_img/india-next-global-manufacturing-hub.jpeg",
    metaTitle: "The Next Global Manufacturing Hub | MRS Supply Chain",
    metaDescription: "Explore why India is emerging as a top global manufacturing hub and how strong logistics & warehousing solutions drive this growth. Learn more with MRS Supply Chain.",
    imgAltTag: "The Next Global Manufacturing Hub | MRS Supply Chain",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "The Next Global Manufacturing Hub | MRS Supply Chain",
      description: "Explore why India is emerging as a top global manufacturing hub and how strong logistics & warehousing solutions drive this growth. Learn more with MRS Supply Chain.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2025-06-16"
  },
  {
    id: 13,
    slug: "rail-transport-sustainable-freight-logistics-india",
    title: "Why Rail Transportation Solutions Are a Sustainable Alternative for Freight Logistics",
    short_description: "Discover why rail transportation is a greener, cost-effective alternative to road freight in India. Reduce emissions and optimise logistics with rail-based solutions.",
    content: `
            <p>
               As global supply chains evolve to meet rising environmental expectations, India’s logistics sector is undergoing a significant transformation. As environmental pressures mount and operational costs rise, freight logistics providers and their clients are reevaluating traditional transportation models. Among the alternatives,<span class='blodHead'>rail transportation stands out as a sustainable, efficient, and future-ready solution</span> for moving goods across the country.
            </p>
            
            <p>Despite India’s vast and rapidly expanding logistics network, a significant portion of cargo still moves via road. This mode, while flexible, is responsible for a large share of the sector’s carbon emissions and traffic congestion. Rail transport, by contrast, offers a cleaner, more scalable option—particularly suited for long-distance and high-volume freight.</p>
           
            <h4>The Environmental Imperative for Logistics</h4>
            <p>Freight logistics is a backbone of the Indian economy, contributing around 14% of the GDP. However, the sector also contributes significantly to air pollution and greenhouse gas emissions. The road transport sector alone accounts for nearly 90% of total freight volume but also produces the highest emissions per ton-kilometer. With increasing pressure on companies to adopt ESG (Environmental, Social, and Governance) practices, the need for sustainable freight alternatives has never been greater.</p>

            <p>
            <span class='blodHead'>Rail transportation emits up to 80% less carbon dioxide per </span>
            ton-kilometer than trucks. For businesses aiming to reduce their carbon footprint and improve environmental performance, shifting to rail can be a practical and impactful move.
            </p>
            
            <h4>Comparing Rail and Road Freight</h4>
            <h6 class='blodHead'>1. Lower Emissions and Energy Efficiency</h6> 
            <p>Railways are inherently more energy-efficient, using less fuel per unit of freight. Over longer distances, this efficiency becomes even more pronounced, making rail ideal for bulk cargo, heavy goods, and container loads. </p>


            <h6 class='blodHead'>2. Cost Benefits Over Long Distances</h6> 
            <p>Although road freight is often preferred for short hauls and flexible routes, rail becomes increasingly cost-effective for distances exceeding 300 kilometers. With fewer fuel stops, reduced toll charges, and minimal driver-related costs, rail logistics reduces the overall cost per ton.</p>


            <h6 class='blodHead'>3. Reduced Congestion and Road Dependency</h6> 
            <p>Railways are inherently more energy-efficient, using less fuel per unit of freight. Over longer distances, this efficiency becomes even more pronounced, making rail ideal for bulk cargo, heavy goods, and container loads. </p>
            
            <h4>Strategic Role of Rail in India's Freight Landscape</h4>
            <h6 class='blodHead'>1. The Rise of Dedicated Freight Corridors (DFCs)</h6> 
            <p>India’s government is actively promoting rail logistics through infrastructure initiatives such as the <span class='blodHead'> Western and Eastern Dedicated Freight Corridors (DFCs). </span> These specialised routes are designed to move freight faster, cheaper, and with minimal delays.</p>

            <p>One of the standout examples is the <a href='https://www.mrssupplychain.com/blog/connecting-markets-the-benefits-of-rail-transport-services-from-mundra-to-delhi' > Mundra to Delhi corridor, </a> where rail services are increasingly being used to connect port operations with major northern consumption markets. With enhanced speed, higher load capacity, and fixed scheduling, this corridor demonstrates how rail can effectively bridge regional supply chains</p>

            <h4>Rail Connectivity and Regional Warehousing</h4>
            <p>The state of Gujarat has emerged as a central logistics hub, largely due to its proximity to ports like Mundra and its expanding network of <a href='https://www.mrssupplychain.com/blog/warehousing-in-gujarat-and-its-importance-for-key-industries'> grade-A warehousing facilities.</a>   These warehouses play a vital role in supporting rail-based logistics by enabling efficient cargo staging and container handling.</p>
            
            <p>Additionally,<a href='https://www.mrssupplychain.com/blog/warehouse-in-mundra-choose-reliable-storage-for-your-needs'> warehouses in Mundra </a> offer a competitive edge to companies managing imports and exports through port-linked rail infrastructure. The integration of rail with warehousing ensures smoother transitions between modes of transport, optimising the overall supply chain.</p>

            <h4>Industries Benefiting from Rail-Based Logistics</h4>
            <h6 class='blodHead'>1. Manufacturing and Heavy Goods</h6>
            <p>Industries such as steel, cement, and automotive parts manufacturing often move heavy and bulk goods across long distances. Rail’s high load-bearing capacity and long-haul efficiency make it ideal for these sectors.</p>

            <h6 class='blodHead'>2. Agriculture and FMCG</h6>
            <p>From grains to packaged goods, rail provides a stable, cost-effective channel for moving large volumes with minimal delays. Combined with regional warehouses and distribution centers, it enables reliable service levels.</p>

            <h6 class='blodHead'>3. Cold Chain and Perishables</h6>
            <p>Though traditionally dominated by road, cold chain logistics is gradually integrating rail into its ecosystem. With technological advancements in reefer containers, rail is becoming increasingly viable for refrigerated goods. For insights into this emerging trend, one can explore <a href='https://www.mrssupplychain.com/blog/the-future-of-cold-chain-logistics-at-ports-trends-and-challenges'> cold chain logistics at ports,</a> which details future opportunities and infrastructure improvements in port-adjacent regions.</p>

            <h4>Infrastructure Integration: Warehousing, Transport, and Duty-Free Zones</h4>
            <p>The success of rail logistics depends on the seamless coordination of warehousing and transport services. Facilities such as <a href='https://www.mrssupplychain.com/services/pioneering-duty-free-warehousing-solutions'> duty-free warehouses </a> offer additional benefits for international trade operations, enabling bonded storage and deferred duties until goods are ready for distribution.</p>

            <p>Additionally, attention to <a href='https://www.mrssupplychain.com/blog/space-optimisation-in-warehouses-why-it-matters-for-different-industries'> space optimisation in warehouses </a> ensures that facilities are capable of handling high-throughput volumes efficiently, especially when synchronised with rail deliveries.</p>


            <h4>Challenges and Considerations</h4>
            <p>While rail offers multiple benefits, there are several considerations logistics planners must account for:<p>

            <ul>
            <li><span class='blodHead'>First and last-mile connectivity</span> : Rail doesn’t provide doorstep service, so multimodal solutions involving trucks for last-mile delivery remain essential.</li>

            <li><span class='blodHead'>Scheduling and infrastructure gaps</span> : Timetables and loading facilities can vary by region, requiring strategic coordination</li>
            <li><span class='blodHead'>Digital integration</span> : Real-time tracking, inventory visibility, and cargo booking need to be integrated across platforms to ensure operational transparency..</li>
            </ul>

            <p>Companies navigating these challenges can benefit from expert support to ensure smooth execution. For tips on avoiding operational hiccups, including customs delays and supply disruptions, readers can refer to <a href='https://www.mrssupplychain.com/blog/how-to-avoid-import-delays-and-keep-your-business-running-smoothly'> how to avoid import delays. </a></p>

            <h4>Sustainability and Competitive Advantage</h4>
            <p>In a competitive and cost-sensitive logistics environment, the ability to provide <span class='blodHead'> sustainable, timely, and affordable freight services </span> is increasingly seen as a market differentiator. Rail logistics contributes not only to environmental goals but also to operational resilience—offering businesses a dependable alternative during disruptions such as fuel shortages or roadblocks.</p>

            <p>Organisations that integrate rail into their logistics models are better prepared to meet ESG standards, reduce long-term costs, and improve delivery timelines.</p>

            <h4>Conclusion</h4>
            <p>India’s freight logistics sector is at a crossroads. With environmental concerns intensifying and infrastructure evolving rapidly, rail transport presents a <span class='blodHead'> sustainable, scalable, and cost-efficient </span> solution for modern logistics needs. From manufacturing to FMCG to port-based distribution, rail offers meaningful benefits that extend across the supply chain.</p>

            <p>The shift toward rail-integrated logistics is no longer a future possibility—it is a current necessity for businesses that aim to grow responsibly, efficiently, and sustainably.</p>


            <p>To learn more about logistics and warehousing trends in India, explore <a href='https://www.mrssupplychain.com/blog'> MRS Supply Chain’s blog </a> or view their range of <a href='https://www.mrssupplychain.com/'>services</a> spanning transport, warehousing, and freight solutions across India. For tailored supply chain solutions or partnership inquiries, visit their <a href='https://www.mrssupplychain.com/contact-us'>Contact</a> page. For a deeper understanding of the company’s legacy, network, and vision, refer to the <a href='https://www.mrssupplychain.com/about'>About section.</a></p>

            
           `,
    category: "Blog",
    featureImage: "Blog_img/rail-transport-sustainable-freight-logistics-india.jpeg",
    metaTitle: "Rail Logistics Solutions in India | Future of Freight Transport",
    metaDescription: "Discover why rail transportation is a greener, cost-effective alternative to road freight in India. Reduce emissions and optimise logistics with rail-based solutions.",
    imgAltTag: "Rail Logistics Solutions in India | Future of Freight Transport",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Rail Logistics Solutions in India | Future of Freight Transport",
      description: "Discover why rail transportation is a greener, cost-effective alternative to road freight in India. Reduce emissions and optimise logistics with rail-based solutions.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2025-06-16"
  },
  {
    id: 12,
    slug: "exploring-the-future-of-rail-transportation-solutions-in-india",
    title: "Exploring the Future of Rail Transportation Solutions in India",
    short_description: "Rail logistics solutions in India with MRS Supply Chain. Ensure cost-effective freight transport, faster delivery, and a sustainable supply chain.",
    content: `
            <p>
               India’s logistics landscape is rapidly evolving, with <a href='https://www.mrssupplychain.com/services/road-and-rail-transport'> rail transportation </a> emerging as a pivotal component in driving efficiency, sustainability, and cost-effectiveness. As the nation advances towards a greener and more integrated supply chain ecosystem, rail freight offers unparalleled advantages for businesses aiming to optimize their logistics operations.
            </p>

           
            <h4>The Strategic Shift Towards Rail Logistics</h4>
            <p>Traditionally reliant on <a href='https://www.mrssupplychain.com/services/road-and-rail-transport'> road transport, </a> India’s freight movement is witnessing a paradigm shift. The increasing emphasis on reducing carbon emissions, alleviating road congestion, and enhancing cargo safety has spotlighted rail as a superior alternative. Key benefits of rail logistics include:</p>
            
            <ul>
            <li><span class='blodHead'>Cost Efficiency</span> : Rail transport offers lower per-ton-kilometre costs, especially for bulk and long-haul shipments. </li>
            <li><span class='blodHead'>Environmental Sustainability</span> : With lower greenhouse gas emissions, rail is a greener mode of transport.</li>
            <li><span class='blodHead'>Enhanced Safety</span> : Reduced risk of accidents and cargo theft compared to road transport.</li>
            <li><span class='blodHead'>Reliability</span> : Scheduled services and dedicated freight corridors ensure timely deliveries.</li>
            </ul>


            <h4>Government Initiatives Bolstering Rail Infrastructure</h4>
            <p>The Indian government’s commitment to enhancing rail infrastructure is evident through several initiatives:</p>
            
            <ul>
            <li><span class='blodHead'>Dedicated Freight Corridors (DFCs)</span> : These corridors facilitate faster and more efficient movement of goods across key industrial regions.</li>
            <li><span class='blodHead'>PM Gati Shakti Plan</span> : A comprehensive infrastructure development program aiming to integrate various modes of transport, including rail, for seamless logistics.</li>
            <li><span class='blodHead'>Electrification and Modernization</span> : Efforts are underway to electrify the entire rail network, promoting energy efficiency and reducing dependence on fossil fuels.</li>
            </ul>



            <h4>MRS Supply Chain: Pioneering Rail-Integrated Logistics Solutions</h4>
            <p>At the forefront of this rail logistics revolution is MRS Supply Chain, offering comprehensive <a href='https://www.mrssupplychain.com/services/road-and-rail-transport'> road and rail transport services </a> tailored to modern business needs. Their offerings include:</p>
            
            <ul>
            <li><span class='blodHead'>Rail Freight Services</span> : Connecting major ports like <a href='https://www.mrssupplychain.com/blog/the-ascendancy-of-renewable-energy-in-mundra-mrs-supply-chains-strategic-contributions'> Mundra </a> to northern India, ensuring efficient cargo movement.</li>
            <li><span class='blodHead'>Multimodal Transport Solutions</span> :  Seamless integration of road and rail services for end-to-end logistics support.</li>
            <li><span class='blodHead'>Customs Clearance and Documentation</span> : Expertise in handling complex customs procedures facilitating smooth international trade.</li>
            <li><span class='blodHead'>Warehousing and Distribution</span> : Strategically located facilities near key ports and industrial hubs, ensuring timely storage and distribution.</li>

            <p>By leveraging MRS Supply Chain’s services, businesses can achieve:</p>
            <li><span class='blodHead'>Reduced Transit Times</span> : Optimized routes and schedules ensure faster deliveries.</li>
            <li><span class='blodHead'>Cost Savings</span> : Efficient transport modes and consolidated shipments significantly reduce costs.</li>
            <li><span class='blodHead'>Sustainability Goals:</span> : Eco-friendly transport options align with corporate environmental objectives.</li>


            <h4>Embracing the Future of Logistics</h4>
            <p>Integrating rail transport into the logistics framework is not just a trend but a necessity for businesses aiming to stay competitive in a dynamic market. With the backing of government initiatives and the expertise of industry leaders like MRS Supply Chain, the future of rail logistics in India looks promising.</p>

            <p>Now is the time to embrace rail-integrated logistics solutions for businesses seeking to revolutionise their supply chain operations. Explore the comprehensive services <a href='https://www.mrssupplychain.com/services/road-and-rail-transport'> MRS Supply Chain offers </a> and embark on a journey towards efficient, sustainable, and cost-effective logistics.</p>
           `,
    category: "Blog",
    featureImage: "Blog_img/Exploring the Future of Rail Transportation Solutions in India.png",
    metaTitle: "Rail Logistics Solutions in India | Future of Freight Transport",
    metaDescription: "Rail logistics solutions in India with MRS Supply Chain. Ensure cost-effective freight transport, faster delivery, and a sustainable supply chain.",
    imgAltTag: "Rail Logistics Solutions in India | Future of Freight Transport",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Rail Logistics Solutions in India | Future of Freight Transport",
      description: "Rail logistics solutions in India with MRS Supply Chain. Ensure cost-effective freight transport, faster delivery, and a sustainable supply chain.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2025-05-17"
  },
  {
    id: 11,
    slug: "why-mundra-port-is-a-strategic-gateway-for-importers-and-transport-companies",
    title: "Why Mundra Port is a Strategic Gateway for Importers and Transport Companies",
    short_description: "Mundra Port is India’s strategic gateway for importers, logistics, and freight. It has world-class infrastructure, multimodal connectivity, and optimised supply chain solutions.",
    content: `
            <p>
                India’s rise as a global trade powerhouse is deeply linked to the performance of its ports—and
                <span class='blodHead'>Mundra Port</span> is leading that transformation. Located in Gujarat along the Gulf of Kutch, Mundra has rapidly evolved into <span class='blodHead'> India’s largest commercial port, </span> offering unmatched advantages for importers, exporters, and transport companies alike.
            </p>
            <p>
               From its <span class='blodHead'> world-class infrastructure and multimodal connectivity </span> to the presence of logistics leaders like <span class='blodHead'> MRS Supply Chain,</span> Mundra Port is redefining how goods move in and out of India. Here’s why it’s the gateway of choice for future-ready supply chains.
            </p>

           
            <h4>A Strategic Coastal Location for Global Trade</h4>
            <p>Mundra Port sits at a geographically advantageous position along India’s western coastline, allowing direct access to major international trade lanes.</p>
            
            <ul>
            <li>Connects to over <span class='blodHead'> 150 global ports, </span> making it a preferred node for imports from the Middle East, Europe, China, Southeast Asia, and Africa.</li>
            <li>Close proximity to industrial clusters across <a href='https://www.mrssupplychain.com/blog/warehousing-in-gujarat-and-its-importance-for-key-industries'> Gujarat, </a> Rajasthan, Punjab, and Delhi NCR ensures faster movement of goods into high-demand markets.</li>
            </ul>

            

            <p>This geographic edge is further amplified by MRS Supply Chain’s <span class='blodHead'> presence across key ports in India </span> — including <span class='blodHead'> Mundra, Kandla, Navasheva, Pipavav, and Chennai </span> —ensuring seamless coverage and support wherever your cargo arrives.</p>


            <h4>Superior Multimodal Connectivity: Rail, Road, Air, and Pipeline</h4>
            <p>What sets Mundra apart is its integrated approach to logistics:</p>
            <ul>
            <li>Dedicated Rail Access: Private <a href="https://www.mrssupplychain.com/blog/connecting-markets-the-benefits-of-rail-transport-services-from-mundra-to-delhi"> rail lines connect Mundra </a> directly to India’s vast rail network, allowing time-sensitive freight to bypass road congestion.</li>
            <li>Road Infrastructure: Access to national and state highways supports quick last-mile delivery across India’s logistics corridors.</li>
            <li>Air Strip & Pipeline Systems: Mundra even boasts operational airstrip and cross-country pipelines, ideal for liquid cargo and urgent shipments.</li>
            </ul>

            <p>Through its Robust Logistics Network, MRS Supply Chain leverages this multimodal setup to offer smooth, start-to-finish operations that reduce handover delays and improve reliability.</p>

            <h4>Advanced Cargo Handling and Storage Infrastructure</h4>
            <p>Mundra Port is equipped to handle all types of cargo—from containers and dry bulk to liquid freight and ODC (Over-Dimensional Cargo).</p>
            <ul>
            <li>Four container terminals with a total capacity of <span class="blodHead"> 7.5 million TEUs. </span></li>
            <li>State-of-the-art cranes, tank farms, and ship unloaders.</li>
            <li>Extensive covered <a href="https://www.mrssupplychain.com/services/multiuser-warehousing"> warehouses </a> and open yards.</li>
            </ul>

            <p>MRS adds additional value with <span class="blodHead"> certified expertise in hazardous </span> and <span class="blodHead"> Non-Hazardous material handling, ODC cargo, </span> and <span class="blodHead"> project logistics.</span> When it comes to complex cargo types, experience makes the difference—and MRS has it.</p>


            <h4>FTWZ & SEZ Access for Operational Flexibility</h4>
            <p>Mundra also hosts <span class="blodHead"> India’s first port-based multi-product SEZ </span> and an <span class="blodHead"> FTWZ (Free Trade Warehousing Zone), </span> allowing for:</p>
            <ul>
            <li>Deferred customs duty on imports.</li>
            <li>Repackaging, labelling, and light assembly of goods before distribution.</li>
            <li>Temporary storage for duty-unpaid cargo.</li>
            </ul>

            <p>Through <span class="blodHead"> strategically located warehouses near port premises, MRS Supply Chain supports customs clearance, </span> duty compliance, and <span class="blodHead"> expedited movement from port to final destination </span> — all under one roof.</p>

            <h4>Optimised Cost Structures and Time-Saving Logistics</h4>
            <p>In today’s competitive market, controlling logistics costs and ensuring timely delivery are non-negotiable.</p>
            <p>MRS Supply Chain provides:</p>
            <ul>
            <li>Clear, competitive pricing without hidden fees for predictable budgeting.</li>
            <li>Faster customs processing and more innovative inland routing for time and cost efficiency.</li>
            <li>Multimodal route optimisation, combining rail, road, and ocean to fit unique business needs.</li>
            </ul>

            <p>By positioning near key Indian ports like Mundra, MRS reduces transit delays and enables businesses to <span class="blodHead"> move faster and scale efficiently. </span> </p>

            <h4>The MRS Powerhouse Advantage at Mundra Port</h4>
            <p>Choosing MRS Supply Chain for your import and inland logistics needs means more than just freight movement—it means partnering with a logistics leader that understands India’s port ecosystem deeply.</p>


            <h4>Why importers and transport companies trust MRS Supply Chain at Mundra:</h4>
            <ul>
            <li>Presence in India’s top 5 ports</li>
            <li>Certified expertise in complex cargo handling.</li>
            <li>Integrated road & rail transport solutions.</li>
            <li>Expedited customs clearance support.</li>
            <li>Cost-effective, transparent pricing.</li>
            <li>End-to-end logistics network with scalable warehousing.</li>
            </ul>

            <p>Whether you’re importing chemicals, machinery, consumer goods, or project equipment, MRS ensures your cargo reaches the destination reliably and economically.</p>

            <p>Mundra Port is not just a point of entry—it’s a strategic logistics hub that powers India’s import ecosystem. For importers, freight forwarders, and logistics managers, establishing operations around Mundra is a smart move for scale, speed, and sustainability.</p>

            <p>When paired with an expert <a href='https://www.mrssupplychain.com/blog/your-strategic-partner-in-importing-medical-devices-to-india-mrs-supply-chain'> logistics partner </a> like <span class="blodHead"> MRS Supply Chain, </span> the advantages multiply. From <span class="blodHead"> customs clearance to multimodal transport, warehousing to project logistics,</span> MRS brings it all together with precision, compliance, and care.</p>

            <p>Learn more about how MRS Supply Chain can optimise your import operations through Mundra and other major ports across India at <a href='https://www.mrssupplychain.com/'> www.mrssupplychain.com</a> </p>`,
    category: "Blog",
    featureImage: "Blog_img/Why Mundra Port is a Strategic Gateway for Importers and Transport Companies.png",
    metaTitle: "Mundra Port Strategic Gateway for Importers, Logistics & Freight in India",
    metaDescription: "Mundra Port is India’s strategic gateway for importers, logistics, and freight. It has world-class infrastructure, multimodal connectivity, and optimised supply chain solutions.",
    imgAltTag: "Mundra Port Strategic Gateway for Importers, Logistics & Freight in India",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Mundra Port Strategic Gateway for Importers, Logistics & Freight in India",
      description: "Discover the causes of import delays, their impact on businesses, and strategies to manage them. See how MRS Supply Chain helps you stay ahead of challenges.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2025-05-17"
  },
  {
    id: 10,
    slug: "how-to-avoid-import-delays-and-keep-your-business-running-smoothly",
    title: "How to Avoid Import Delays and Keep Your Business Running Smoothly",
    short_description: "MRS Supply Chain highlights the importance of space optimization across industries, from pharmaceuticals to solar panels, ensuring cost efficiency, better flow, and faster turnaround.",
    content: `
            <p>
                Supply chains are the heart of global trade, making sure businesses stay connected with their customers. But let’s face it: import delays can throw everything off balance. These delays can disrupt operations, increase costs, and even upset your customers.
            </p>
            <p>
                In this blog, we’ll explain what causes these delays, the problems they create, and simple strategies to manage them better. Plus, we’ll show you how <a href="https://www.mrssupplychain.com"> MRS Supply Chain </a> can help you stay ahead of these challenges.
            </p>

           
            <h4>What Are Import Delays and Why Do They Happen?</h4>
            <p>Import delays are when your goods take longer than expected to reach their destination. Here are some of the most common reasons:</p>
            <h5>1. Regulatory Requirements</h5>
            <ul>
            <li>Unawareness about <a href="https://www.mrssupplychain.com/blog/your-strategic-partner-in-importing-medical-devices-to-india-mrs-supply-chain">Import</a> regulatory requirements.</li>
            <li>Absence of well researched understanding of products category.</li>
            </ul>

            <h5>2. Shipping and Logistics Challenges</h5>
            <ul>
            <li>Vessel delays, port congestion, bad weather, or a shortage of workers—these all cause delays.</li>
            </ul>

            <p>In fact, studies show that global shipping times have increased by 25% in the last three years. So, it’s a problem many businesses are facing right now.</p>


            <h4>How Do Import Delays Disrupt Supply Chains?</h4>
            <h5>1. Goods Get Stuck, and the Chain Breaks</h5>
            <p>When goods are delayed:</p>
            <ul>
            <li>You might run out of stock and need help to meet customer demand.</li>
            <li>Your production line could slow down because raw materials aren’t arriving on time.</li>
            </ul>

            <h5>2. Your Costs Go Up</h5>
            <p>Delays often lead to unexpected expenses, like:</p>
            <ul>
            <li>Paying for extra storage while your goods are stuck in transit.</li>
            <li>Higher shipping rates when you have to expedite deliveries to catch up.</li>
            </ul>

            <h5>3. Customers Start Losing Trust</h5>
            <p>If orders are delayed, customers may think twice before coming back. No one likes waiting for something they’ve already paid for, right?</p>


            <h4>What Strategies Can You Use to Reduce Import Delays?</h4>
            <h5>1. Stay Ahead of Regulatory Requirements</h5>
            <ul>
            <li>Make sure all your paperwork is accurate and up-to-date.</li>
            <li>Partner with customs experts to avoid unnecessary holdups.</li>
            </ul>

            <h5>2. Keep an Eye on Shipments</h5>
            <ul>
            <li>Use tracking tools to monitor where your goods are in real-time.</li>
            <li>Stay in touch with your suppliers and <a href="https://www.mrssupplychain.com/blog/the-future-of-cold-chain-logistics-at-ports-trends-and-challenges">logistics partners </a> to address problems before they escalate.</li>
            </ul>

            <h5>3. Be Smart with Inventory</h5>
            <ul>
            <li>Keep extra stock on hand for high-demand products to avoid running out.</li>
            <li>Use tools that predict customer demand so you can plan better.</li>
            </ul>


            <h4>How Does MRS Supply Chain Help You Overcome Import Delays?</h4>
            <p>At MRS Supply Chain, we get it—import delays are frustrating. That’s why we’ve built solutions to help businesses like yours avoid these issues. Here’s how we can support you:</p>
            <h5>1. Free Trade Warehousing Zones (FTWZs) & Customs Bonded Warehouse</h5>
            <ul>
            <li>Store your goods duty-free in key locations like <a href="https://www.mrssupplychain.com/services/pioneering-duty-free-warehousing-solutions"> Kandla, Mundra, and Nhava Sheva. </a> This makes it easier to respond quickly to market needs without customs delays.</li>
            </ul>

            <h5>2. Real-Time Tracking</h5>
            <ul>
            <li>With our advanced tracking systems, you’ll always know where your goods are and when they arrive.</li>
            </ul>

            <h5>3. Customs Expertise</h5>
            <ul>
            <li>Our team ensures all your shipments are compliant with customs regulations so there are no surprises at the border.</li>
            </ul>

            <h5>4. End-to-End Logistics Support</h5>
            <ul>
            <li> From <a href="https://www.mrssupplychain.com/blog/the-future-of-cold-chain-logistics-at-ports-trends-and-challenges"> moving goods across borders </a> to managing inventory, we handle it all so you can focus on growing your business.</li>
            </ul>



            <h4>Why Should You Address Import Delays Now?</h4>
            <p>Import delays are a growing issue, and ignoring them could hurt your business in the long run :</p>
            <ul>
            <li>Supply Chain Disruptions: Delays create bottlenecks in the supply chain, leading to shortages of goods, production slowdowns, and increased costs.</li>
            <li>Customer Dissatisfaction: Late deliveries lead to happier customers, potentially damaging brand reputation and loyalty.</li>
            <li>Financial Losses: Businesses face increased expenses due to storage fees, demurrage charges (charges for exceeding the allowed time for container use), and lost sales due to stockouts.</li>
            </ul>
            <p>But making these changes takes time and planning. That’s where a trusted partner like MRS Supply Chain can step in to guide you.</p>


            <h4>How to Protect Your Business from Import Delays?</h4>
            <p><a href="https://www.mrssupplychain.com/services/import-management"> Import delays </a> don’t have to derail your business. With the right strategies, like staying compliant, improving visibility, and managing inventory, you can stay on track.</p>
            <p>MRS Supply Chain is here to help you avoid delays, reduce costs, and keep your customers happy. Ready to simplify your supply chain?</p>
            <h5>Get in touch with us today, and let’s make import delays a thing of the past.</h5>

                `,
    category: "Blog",
    featureImage: "Blog_img/How to Avoid Import Delays and Keep Your Business Running Smoothly.png",
    metaTitle: "How to Avoid Import Delays and Keep Your Business Running Smoothly",
    metaDescription: "MRS Supply Chain highlights the importance of space optimization across industries, from pharmaceuticals to solar panels, ensuring cost efficiency, better flow, and faster turnaround.",
    imgAltTag: "How to Avoid Import Delays and Keep Your Business Running Smoothly",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How to Avoid Import Delays and Keep Your Business Running Smoothly",
      description: "Discover the causes of import delays, their impact on businesses, and strategies to manage them. See how MRS Supply Chain helps you stay ahead of challenges.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2024-12-26"
  },
  {
    id: 9,
    slug: "space-optimisation-in-warehouses-why-it-matters-for-different-industries",
    title: "Space Optimisation in Warehouses: Why It Matters for Different Industries",
    short_description: "MRS Supply Chain highlights the importance of space optimization across industries, from pharmaceuticals to solar panels, ensuring cost efficiency, better flow, and faster turnaround.",
    content: `
            <p>
                MRS Supply Chain highlights the importance of space optimization across industries, from pharmaceuticals to solar panels, ensuring cost efficiency, better flow, and faster turnaround.
            </p>

            <p>Efficient space optimization is no longer a luxury; it's a necessity across industries relying on <a href="https://www.mrssupplychain.com/blog/warehouse-in-mundra-choose-reliable-storage-for-your-needs">warehousing solutions</a> to maintain their supply chains. Different sectors face unique challenges in storing goods, from handling delicate <a href="https://www.mrssupplychain.com/blog/strategic-warehousing-for-pharma-at-gujarat-key-ports">pharmaceutical</a> products to managing bulky solar panels. The right space optimisation strategy ensures not just cost efficiency but also improved inventory flow, reduced damage, and faster turnaround.</p>
            <p>Here's a closer look at <b>five key industries</b> and why space optimisation is critical for each of them:</p>


            <h4>1. Efficient Warehouse Solutions for Solar Energy Components</h4>
            <p>Solar Panel Storage Challenges: Warehousing large, fragile solar panels pose difficulties due to their size and fragility, leading to damage, increased costs, and inefficiencies.</p>
            <p>Solar Energy Warehouse Optimization: Vertical racking systems and modular storage solutions ensure safe handling and maximise space. Wide aisle setups in custom-built warehouses enable smooth movement and improved capacity.</p>


            <h4>2. Optimized Storage for Pharmaceutical Warehousing Needs</h4>
            <p><b>Temperature-Controlled Pharmaceutical Storage Issues:</b> <a href="https://www.mrssupplychain.com/blog/the-future-of-cold-chain-logistics-at-ports-trends-and-challenges">Managing cold storage</a>, precise inventory tracking, and hygiene standards in pharmaceutical warehousing can be challenging, especially with poor space utilisation.</p>
            <p><b>Pharmaceutical Warehouse Solutions for Efficiency:</b> Advanced Warehouse Management Systems (WMS) optimise SKU tracking and segregation. Custom cooling zones and cross-docking strategies reduce delays and improve space utilisation.</p>


            <h4>3. Space Optimization in Metal and Heavy Manufacturing Warehousing</h4>
            <p>
            <b>Heavy Machinery Warehousing Challenges:</b> Handling high-density loads and bulky items like metal coils often results in congestion, safety risks, and operational delays.</p>
            <p>
            <b>Metal Storage Warehouse Improvements:</b> Cantilever racking systems, mezzanine floors, and optimised aisle layouts boost storage capacity and accessibility. Predictive analytics streamline demand forecasting and inventory movement.</p>


            <h4>4. Maximizing Space for FMCG and Retail Warehousing Operations</h4>
            <p>
            <b>FMCG and Retail Warehousing Problems:</b> High SKU turnover, seasonal demand spikes, and limited shelf life demand efficient storage and retrieval systems.</p>
            <p>
            <b>Retail Warehouse Space Optimization Strategies:</b> Narrow-aisle racking and modular storage systems enhance capacity and adaptability. Regular space utilisation audits eliminate inefficiencies during peak demand periods.</p>


            <h4>5. Advanced Automotive Warehousing Solutions for Component Storage</h4>
            <p>
            <b>Automotive Component Warehousing Issues:</b> Managing various sizes of automotive components, from small spare parts to large assemblies, creates space management challenges and reduces productivity.</p>
            <p>
            <b>Automotive Warehouse Space Optimization:</b> Automated Storage and Retrieval Systems (AS/RS) and high-rise shelving maximise vertical space. In-plant warehousing integrates storage with production lines, ensuring seamless operations.</p>
            <p>
            ABy understanding the specific warehousing needs of each sector, <a href="https://www.mrssupplychain.com/">MRS Supply Chain</a> delivers tailored space optimisation strategies that enhance efficiency, safety, and performance across industries.</p>


            <h4>10 Proven Best Practices for Warehouse Space Optimization</h4>
            <p>
            Here's how MRS Supply Chain applies industry expertise to optimise <a href="https://www.mrssupplychain.com/services/multiuser-warehousing">warehouse</a> space and improve operational efficiency:</p>


            <h5>1. Utilize Vertical Space Effectively</h5>
            <p>
            Maximise your facility's capacity by adopting high-rise shelving and mezzanine systems. MRS designs racking solutions customised to your industry's needs—whether solar panels, metals, or pharmaceuticals.</p>


            <h5>2. Implement Advanced Warehouse Management Systems (WMS)</h5>
            <p>
            Real-time inventory visibility and predictive analytics ensure every square foot is utilised efficiently, streamlining workflows and avoiding bottlenecks.</p>


            <h5>3. Adopt Automated Storage and Retrieval Systems (AS/RS)</h5>
            <p>
            Automation enhances picking accuracy, reduces manual labour, and increases storage density—critical for <a href="https://www.mrssupplychain.com/sector/industrial-sector">industries</a> managing large SKUs like automotive or FMCG.</p>


            <h5>4. Optimize Aisle Width for Maximum Efficiency</h5>
            <p>
            Narrower aisles can boost storage capacity without compromising safety. MRS ensures your warehouse layout balances accessibility and space utilisation.</p>


            <h5>5. Leverage Cross-Docking Techniques</h5>
            <p>
            For industries with fast-moving goods like FMCG, cross-docking reduces the need for prolonged storage, speeding up deliveries and cutting costs.</p>


            <h5>6. Conduct Regular Space Utilization Audits</h5>
            <p>
            Identifying and addressing underutilised areas ensures warehouses remain optimised for dynamic inventory needs.</p>


            <h5>7. Implement Predictive Analytics for Inventory Management</h5>
            <p>
            Using data-driven tools, MRS prevents overstocking and stockouts, optimising space for industries where precision matters—like pharmaceuticals.</p>


            <h5>8. Rationalize SKU Inventory for Better Management</h5>
            <p>
            Streamlined SKUs eliminate clutter and improve productivity, ensuring warehouses function efficiently for high-turnover sectors.</p>


            <h5>9. Maximize Modular Storage Solutions</h5>
            <p>
            Adaptable storage systems allow warehouses to scale operations based on inventory demand—ideal for businesses managing seasonal or fluctuating goods.</p>


            <h5>10. Collaborate with Third-Party Logistics Providers (3PLs)</h4>
            <p>
            Shared storage solutions with MRS's 3PL services, offering <b>Grade A warehousing near major ports</b>, provide flexible and cost-effective space solutions.</p>


            <h4>Why Choose MRS Supply Chain for Space Optimization?</h4>
            <p>
            With <b>14+ years of experience</b>, MRS Supply Chain understands that each industry requires a unique approach to warehousing. Whether it's <b>built-to-suit facilities</b> for heavy industries, <b>customs-bonded warehousing</b> for exports, or <b>multi-user spaces</b> for scalable storage, MRS delivers:</p>
            

            <ul>
                <li><b>Future-Ready Infrastructure</b></li>

                <li><b>Customised Solutions for Industry-Specific Needs</b></li>

                <li><b>Strategic Locations Near Key Ports: Nava Sheva, Kandla, and Mundra</b></li>
            </ul>


            <p><b>Partnering with MRS Supply Chain</b> ensures your goods are stored efficiently, operations are streamlined, and your supply chain gains a competitive edge.</p>


            <h4>Ready to Optimize Your Warehousing Operations?</h4>
            <p>
            Contact <a href="https://www.mrssupplychain.com/contact-us">MRS Supply Chain</a> today and explore how our customised strategies can redefine efficiency for your industry.</p>

                `,
    category: "Blog",
    featureImage: "Blog_img/Space Optimisation in Warehouses Why It Matters for Different Industries.png",
    metaTitle: "Space Optimisation in Warehouses: Why It Matters for Different Industries",
    metaDescription: "MRS Supply Chain highlights the importance of space optimization across industries, from pharmaceuticals to solar panels, ensuring cost efficiency, better flow, and faster turnaround.",
    imgAltTag: "Warehouses Optimisation",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Space Optimisation in Warehouses: Why It Matters for Different Industries",
      description: "MRS Supply Chain highlights the importance of space optimization across industries, from pharmaceuticals to solar panels, ensuring cost efficiency, better flow, and faster turnaround.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2024-12-21"
  },
  {
    id: 8,
    slug: "navigating-the-complexities-of-import-management-for-solar-panels-with-mrs-supply-chain",
    title: "Navigating the Complexities of Import Management for Solar Panels with MRS Supply Chain",
    short_description: "The global shift towards renewable energy sources is significantly boosting the demand for solar panels, making the logistics of importing them increasingly strategic and complex.",
    content: `
            <p>
                The global shift towards <a href="https://www.mrssupplychain.com/blog/the-ascendancy-of-renewable-energy-in-mundra-mrs-supply-chains-strategic-contributions">renewable energy</a> sources is significantly boosting the demand for solar panels, making the logistics of importing them increasingly strategic and complex. MRS Supply Chain offers specialised <a href="https://www.mrssupplychain.com/services/import-management">import management</a> services tailored for the solar panel sector, designed to navigate the intricate processes of international logistics and regulatory compliance. This blog explores key considerations and how MRS optimises importing solar panels to India, drawing insights from industry practices and regulations.
            </p>

            <h4>Understanding Import Regulations and Compliance</h4>
            <p>When importing solar panels into India, businesses face a myriad of regulations and compliance requirements. Familiarity with HS codes specific to solar panels is crucial as these codes classify goods for customs and tariff purposes. Importers must ensure their products meet Indian standards and undergo required product tests to ensure quality and safety compliance. Solar panels and related components are subject to Basic Customs Duty (BCD) and Goods and Services Tax (GST), which vary based on the type and origin of the products.</p>


            <h4>Strategic Shipping and Logistics</h4>
            <p>Choosing the correct shipping terms and logistics partners is critical in the solar panel industry. Common Incoterms such as CIF, FOB, and Ex Works define the responsibilities of sellers and buyers in the <a href="https://www.mrssupplychain.com/sector/renewable-energy-and-infrastructure-projects">international shipping of solar panels.</a> MRS Supply Chain leverages its expertise to assist clients in selecting the most effective terms and transportation methods, ensuring timely and cost-efficient deliveries. The use of advanced tracking and logistics technologies further enhances the transparency and reliability of the shipping process.</p>


            <h4>Efficient Customs Clearance</h4>
            <p>Clearing customs efficiently is crucial for the timely installation of solar projects. MRS Supply Chain's expertise in customs brokerage ensures that all necessary paperwork is accurately prepared and submitted, facilitating smooth customs clearance. This includes managing complex documentation and adhering to the latest regulations and duties applicable to solar technology.</p>


            <h4>Comprehensive Logistics and Import Management Solutions for the Solar Power Industry</h4>
            <p>
            MRS Supply Chain offers a comprehensive suite of logistics solutions tailored to meet the unique demands of the solar power industry. These services ensure projects stay on schedule and within budget and streamline the complex process of importing solar panels and related equipment.</p>

            <ul>
                <li>Customs Clearance and Compliance for Solar Panels: Expert customs services tailored for importing and exporting solar panels, ensuring compliance with customs duties specific to the solar power industry.</li>

                <li>International Transport Solutions for Solar Equipment: Robust <a href="https://www.mrssupplychain.com/services/road-and-rail-transport">transport solutions</a> designed for the safe and efficient shipment of solar equipment globally.</li>

                <li>Optimised Land Logistics for Solar Panel Transportation: Customised logistics and route plans optimised for the safe transit and timely delivery of solar panels.</li>

                <li>Precision Cargo Loading for Solar Industry: Advanced techniques and equipment to ensure secure loading of solar panels, minimising the risk of damage.</li>

                <li>Container Stripping and Loading for Solar Panel Deliveries: Expert management of the container stripping process and subsequent loading onto trucks, ensuring secure transfer of solar panels.</li>

                <li>Project Cargo Management for Solar Industry Installations: Expert management of oversized and heavy components for large-scale solar installations.</li>

                <li>Warehousing Solutions for the Solar Power Sector: <a href="https://www.mrssupplychain.com/services/multiuser-warehousing">Specialised warehousing solutions</a> catering to the storage needs of the solar power sector.</li>
            </ul>


            <p>The importation of solar panels involves careful consideration of regulatory, logistical, and operational factors. MRS Supply Chain, with its comprehensive <a href="https://www.mrssupplychain.com/services/import-management">import management services</a>, stands out as a crucial partner for businesses looking to capitalise on the growing solar energy market in India. By addressing the complexities of customs, compliance, and logistics, MRS ensures that its clients can focus on advancing the adoption of sustainable energy solutions. Partnering with an experienced logistics provider like MRS Supply Chain can mitigate the risks associated with international trade and enhance the efficiency of operations.</p>

                `,
    category: "Blog",
    featureImage: "Blog_img/Solar Panels with MRS.jpg",
    metaTitle: "Import Management for Solar & Renewable Energy | MRS Supply Chain.",
    metaDescription: "MRS Supply Chain offers specialised import management for solar panels, ensuring smooth customs clearance and efficient logistics for your solar projects.",
    imgAltTag: "Import Management for Solar & Renewable Energy",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Navigating the Complexities of Import Management for Solar Panels with MRS Supply Chain",
      description: "The global shift towards renewable energy sources is significantly boosting the demand for solar panels, making the logistics of importing them increasingly strategic and complex.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2024-11-27"
  },
  {
    id: 7,
    slug: "your-strategic-partner-in-importing-medical-devices-to-india-mrs-supply-chain",
    title: "Your Strategic Partner in Importing Medical Devices to India: MRS Supply Chain",
    short_description: "As India continues to be a key player in the global medical device market, understanding the complexities of import regulations is crucial for manufacturers looking to enter or expand within the Indian market.",
    content: `
            <p>As India continues to be a key player in the global medical device market, understanding the complexities of import regulations is crucial for manufacturers looking to enter or expand within the Indian market. MRS Supply Chain offers specialised logistic and <a href="https://www.mrssupplychain.com/services/import-management">import management services</a> tailored to the unique needs of the medical device sector in India. These services are designed to navigate the intricate regulatory environment overseen by the Central Drugs Standard Control Organization (CDSCO) under the Drugs and Cosmetics Act and Rules.</p> 


            <h4>Understanding Import Regulations and Compliance</h4>
            <p>The importation of medical devices in India requires adherence to stringent quality and efficacy standards to ensure the safety and reliability of medical products available to consumers. All medical devices must comply with the regulations set forth by the CDSCO, and importers must ensure all products meet these standards before they enter the Indian market. MRS Supply Chain's expertise ensures compliance with these regulations, facilitating a smooth importation process.</p>
                
                
            <h4>Strategic Shipping and Logistics</h4>
            <p>Selecting the right shipping terms and logistics partners is crucial, especially in a market as regulated as India. MRS Supply Chain assists clients in choosing the most effective transportation methods and terms, ensuring that deliveries are timely and cost-efficient. Advanced tracking and logistics technologies enhance the transparency and reliability of the shipping process.</p>
                
                
            <h4>Efficient Customs Clearance</h4>
            <p>Efficient customs clearance is vital for the timely distribution of medical devices in India. MRS Supply Chain leverages its deep understanding of local regulations and customs procedures to ensure all necessary documentation is accurately prepared and submitted. This includes managing complex documentation such as the commercial invoice, certificate of conformity, and other essential paperwork as outlined by CDSCO guidelines.</p>
                
                
            <h4>Comprehensive Logistics and Import Management Solutions for the Medical Device Industry by MRS Supply Chain</h4>
            <p><a href="https://www.mrssupplychain.com/blog/the-future-of-cold-chain-logistics-at-ports-trends-and-challenges">MRS Supply Chain provides a comprehensive suite of logistics solutions</a> meticulously tailored to India's medical device industry. These solutions ensure regulatory compliance, operational efficiency, and the highest quality and safety standards necessary for medical equipment logistics.</p>
                
            <ul>
                <li>Customs Clearance and Compliance for Medical Devices: MRS Supply Chain excels in managing customs for medical devices, ensuring full compliance with all regulatory requirements. Our expertise extends to handling intricate paperwork and navigating the complex customs environment, crucial for the smooth entry and distribution of medical devices in India.</li>
                
                <li>International Transport Solutions for Medical Equipment: We offer secure and efficient transportation options for medical equipment to India, incorporating both air and ocean freight solutions. This includes specialised <a href="https://www.mrssupplychain.com/blog/strategic-warehousing-for-pharma-at-gujarat-key-ports">temperature-controlled transport for sensitive medical devices</a>, ensuring they remain uncompromised throughout their journey.</li>
                
                <li>Optimised Land Logistics for Medical Device Transportation: Our logistics plans are customised to address the delicate nature of medical devices. We implement strategic route optimization and deploy advanced tracking systems to ensure safe transit and timely delivery of medical equipment to its final destination.</li>
                
                <li>Precision Cargo Loading for the Medical Industry: MRS Supply Chain meticulously ensures that all medical devices are securely loaded and transported to prevent damage. This includes specialised packaging configurations and handling procedures adapted for various types of medical equipment.</li>
                
                <li>Container Stripping and Loading for Medical Device Deliveries: We manage the careful handling of medical devices during the unloading from containers and subsequent reloading onto delivery trucks. Our team is trained to handle medical devices with the utmost care, ensuring they arrive in pristine condition.</li>
                
                <li>Project Cargo Management for Medical Industry Installations: We handle large-scale shipments necessary for medical facility installations, coordinating all aspects of logistics from shipping to final installation. This service is designed to support the setup of new medical facilities or the expansion of existing ones.</li>
                
                <li>Warehousing Solutions for the Medical Device Sector: MRS Supply Chain provides secure and <a href="https://www.mrssupplychain.com/services/multiuser-warehousing">compliant warehousing solutions for medical devices.</a> Our warehouses are equipped to manage temperature control and maintain sterile conditions, ensuring that medical devices are stored under optimal conditions before distribution.</li>
            </ul>
                
                
            <p>Each aspect of our logistics solutions is backed by a deep understanding of the medical device sector's unique needs, from regulatory compliance and temperature control to precision handling and customised delivery options. By leveraging our expertise in medical device logistics, MRS Supply Chain ensures that medical devices move through supply chains efficiently, securely, and in compliance with all national and international regulations.</p>
                
            <p>Navigating the importation of medical devices into India involves a complex set of regulatory, logistical, and operational challenges. With its comprehensive import management services, MRS Supply Chain is a crucial partner for businesses looking to navigate this landscape successfully. By managing the complexities of customs, compliance, and logistics, MRS ensures that its clients can focus on what they do best — improving health outcomes across India with their medical devices.</p>

                `,
    category: "Blog",
    featureImage: "Blog_img/Your Strategic Partner.jpg",
    metaTitle: "Reliable Import-Export Management for Medical Healthcare Goods",
    metaDescription: "MRS Supply Chain offers expert import management services for medical devices, ensuring compliance with India's CDSCO regulations, efficient customs clearance, and secure logistics solutions for timely delivery.",
    imgAltTag: "Import Export Management for Medical Devices",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Your Strategic Partner in Importing Medical Devices to India: MRS Supply Chain",
      description: "As India continues to be a key player in the global medical device market, understanding the complexities of import regulations is crucial for manufacturers looking to enter or expand within the Indian market.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2024-11-22"
  },
  {
    id: 6,
    slug: "warehousing-in-gujarat-and-its-importance-for-key-industries",
    title: "Warehousing in Gujarat and Its Importance for Key Industries",
    short_description: "Gujarat has emerged as a significant player in India's industrial landscape, characterised by its diverse sectors and robust infrastructure. The state's strategic location, particularly its extensive coastline and access to major ports,",
    content: `
                
                <p>
                Gujarat has emerged as a significant player in India's industrial landscape, characterised by its diverse sectors and robust infrastructure. The state's strategic location, particularly its extensive coastline and access to major ports, has made it an attractive destination for businesses looking to establish or expand their operations. Within this context, a <a href='https://mrssupplychain.com/services/pioneering-duty-free-warehousing-solutions' target="_blank"> warehouse in Gujarat</a> has become a critical asset for industries, facilitating efficient supply chain management and supporting economic growth.
                </p>


                <h4>The Role of Warehousing in Modern Industries</h4>
                <p>Warehousing is a pivotal component in modern industries, functioning as a critical facility for storing and distributing goods. Key functions include inventory management, order fulfilment, and distribution logistics. By streamlining supply chains, <a href='https://www.mrssupplychain.com/services/multiuser-warehousing' target="_blank">industrial warehousing</a> enhances production efficiency and ensures timely product delivery to market. This capability is essential for competitive businesses in a fast-paced, ever-evolving economy.</p>


                <h4>MRS Supply Chain’s Advantage:</h4>
                <p>As a provider of seamless supply chain solutions, <a href='https://www.mrssupplychain.com/' target="_blank">MRS Supply Chain</a> ensures that goods are stored efficiently and aligned with the latest technological advancements. This includes tailored solutions to manage diverse industry requirements, from FMCG to specialised sectors like pharmaceuticals and automotive.</p>


                <h4>Why Gujarat Is a Prime Location for Warehousing</h4>
                <p>Gujarat's geographical advantages significantly bolster its position as a prime location for warehousing:</p>
                <ul>
                  <li>Proximity to Major Ports: The state is home to key ports like Mundra and Kandla, which facilitate international trade and allow businesses to ship goods globally.</li>
                  <li>Robust Transportation Infrastructure: Gujarat boasts well-developed roads, railways, and ports, ensuring the smooth movement of goods across the country and beyond.</li>
                  <li>Availability of Industrial Land: Industrial zones like those managed by the Gujarat Industrial Development Corporation (GIDC) offer vast spaces for setting up industrial warehousing facilities.</li>
                  <li>Supportive Government Policies: The Gujarat government actively promotes warehousing investments, offering incentives and policies that fuel industrial growth.</li>
                </ul>


                <h4>MRS Supply Chain’s Warehousing:</h4>
                <p>Strategically located near Gujarat’s key ports and infrastructure hubs, MRS Supply Chain offers integrated warehousing solutions that fully exploit the state’s logistical strengths. This helps businesses reduce transit times and enhances their access to national and global markets, positioning MRS among the <a href='https://www.mrssupplychain.com/services/multiuser-warehousing' target="_blank">top-rated warehousing in Gujarat.</a> </p>


                <h4>Benefits of Warehousing in Gujarat for Industries</h4>
                <p>The benefits of establishing warehousing operations in Gujarat are manifold:</p>
                <ul>
                  <li>Cost Efficiency: Gujarat offers competitive land rates and lower operational costs, making it financially attractive for businesses seeking long-term savings</li>
                  <li>Reduced Transit Time: Warehousing facilities near ports and highways ensure faster market access and smoother supply chains.</li>
                  <li>Seamless Connectivity: Multimodal logistics options (road, rail, and sea) enhance supply chain efficiency and provide flexibility and resilience.</li>
                  <li>Boosting Export Potential: Gujarat’s Free Trade Warehousing Zones (FTWZs) empower businesses to store goods without incurring customs duties until they are sold, a significant advantage for exporters.</li>
                </ul>


                <h4>MRS Supply Chain’s FTWZ Services:</h4>
                <p>With FTWZ operations at key locations like Kandla and Mundra, MRS Supply Chain helps businesses maximise their export potential by offering secure,<a href='https://www.mrssupplychain.com/services/pioneering-duty-free-warehousing-solutions' target="_blank">duty-free storage.</a> These facilities allow companies to defer customs duties and VAT until the goods are sold, optimising cash flow and reducing overheads.</p>


                <h4>How Gujarat’s Warehousing Ecosystem Supports Various Industries</h4>
                <p>Gujarat's diverse industrial ecosystem thrives on specialised warehousing solutions tailored to the needs of various sectors:</p>
                <ul>
                  <li>Textiles: Warehouses equipped for efficient storage and distribution cater to Gujarat’s significant textile industry, helping businesses maintain product quality.</li>
                  <li>Pharmaceuticals: Cold storage and climate-controlled facilities ensure compliance with safety regulations for sensitive products, which is crucial for Gujarat's booming pharma sector.</li>
                  <li>FMCG: Streamlined inventory management in warehouses supports the rapid turnover required by fast-moving consumer goods industries, ensuring products are always available on the shelf.</li>
                  <li>Automotive: Dedicated warehousing solutions for parts and finished vehicles help optimise the supply chain, enabling just-in-time deliveries for automotive manufacturers.</li>
                </ul>


                <h4>MRS Supply Chain’s Tailored Solutions: </h4>
                <p>Whether it’s cold storage for pharmaceuticals or specialised <a href='https://www.mrssupplychain.com/sector/manufacturing-automotive-technology-and-consumer-goods' target="_blank">warehouses for automotive</a> parts, MRS Supply Chain provides customised solutions that cater to the unique demands of each sector. This approach ensures industries can operate efficiently and in a highly competitive market, establishing its position among the top-rated warehousing in Gujarat.</p>


                <h4>Future of Warehousing in Gujarat: Opportunities and Challenges</h4>
                <p>The future outlook for industrial warehousing in Gujarat is promising, with significant growth potential:</p>
                <ul>
                  <li>Growth Projections: Increased industrial activity and rising demand for logistics services are driving rapid expansion in the warehousing sector.</li>
                  <li>Upcoming Developments: New industrial parks and logistics hubs are being developed to support this growth, creating even more business opportunities.</li>
                  <li>Challenges: Despite the bright future, challenges such as land acquisition difficulties, infrastructure gaps in certain areas, and increasing competition must be addressed to sustain growth momentum.</li>
                </ul>


                <h4>MRS Supply Chain’s Preparedness: </h4>
                <p>As one of Gujarat's leading supply chain providers,<a href='https://www.mrssupplychain.com/' target="_blank"> MRS Supply Chain</a> is well-positioned to navigate these challenges and leverage upcoming opportunities. Their forward-thinking approach and investment in infrastructure will ensure businesses have access to cutting-edge warehousing solutions.</p>


                <p>Warehousing is integral to Gujarat’s industrial framework, providing crucial support across various sectors. The state’s strategic advantages—from proximity to major ports to robust infrastructure—make it an ideal destination for businesses looking to enhance their logistics capabilities. With companies like MRS Supply Chain offering innovative and customised solutions, businesses can leverage <a href='https://www.mrssupplychain.com/services/multiuser-warehousing' target="_blank">Gujarat’s warehousing</a> potential to drive operational success and unlock new growth opportunities. From a warehouse in Gujarat to expansive warehousing hubs in Gujarat, the future of logistics and industrial warehousing in this state is set to thrive.</p>
                `,
    category: "Blog",
    featureImage: "Blog_img/Warehousing in Gujarat.png",
    metaTitle: "Discover the significance of warehousing for key industries in Gujarat. Explore its strategic advantages, benefits, and how it supports economic growth.",
    metaDescription: "Discover how to choose the right warehouse in Mundra. From port access to cost-effective leasing, find solutions that enhance your logistics and business efficiency.",
    imgAltTag: "Warehousing in Gujara",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Discover the significance of warehousing for key industries in Gujarat. Explore its strategic advantages, benefits, and how it supports economic growth.",
      description: "Discover how to choose the right warehouse in Mundra. From port access to cost-effective leasing, find solutions that enhance your logistics and business efficiency.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2024-09-24"
  },
  {
    id: 5,
    slug: "warehouse-in-mundra-choose-reliable-storage-for-your-needs",
    title: "Warehouse in Mundra: Choose Reliable Storage for Your Needs",
    short_description: "Mundra, located on the western coast of India, has emerged as a strategic logistics hub, particularly for warehousing and distribution operations.",
    content: `
                
                <p>Mundra, located on the western coast of India, has emerged as a strategic logistics hub, particularly for warehousing and distribution operations. With its proximity to major ports and well-developed infrastructure, choosing the right warehouse in Mundra can significantly enhance business operations. At <a href='https://www.mrssupplychain.com/'  target="_blank">MRS Supply Chain,</a> we understand the importance of selecting an optimal <a href='https://www.mrssupplychain.com/services/multiuser-warehousing'  target="_blank">warehouse in Mundra Port</a> that aligns with your specific needs, ensuring efficiency and growth. This blog will explore the advantages of Mundra as a logistics centre and provide guidance on selecting the ideal warehouse for your business operations.
                </p>


                <h4>Why Mundra? The Strategic Advantage</h4>
                <p>Mundra offers several location benefits that make it an attractive choice for businesses:</p>
                <ul>
                <li>Proximity to Major Ports: Mundra Port is India's largest commercial port, facilitating seamless access to global trade routes. This strategic location allows for efficient import and export activities, connecting businesses to international markets.</li>
                <li>Robust Infrastructure: The region boasts excellent road, rail, and sea connectivity. The extensive network ensures quick movement of goods to and from the port, reducing transit times and costs. Businesses looking for the best warehouse in Mundra will benefit from the combination of solid infrastructure and proximity to transportation routes.</li>
                <li>Growing Industrial Presence: Mundra is witnessing a surge in industrial development, with various sectors such as e-commerce, FMCG, and manufacturing establishing operations in the area. This growth creates a high demand for warehousing solutions, including large-scale and small warehouse options in Mundra.</li>
                </ul>


                <h4>Key Factors to Consider When Choosing a Warehouse in Mundra</h4>
                <p>When selecting a warehouse in Mundra, consider the following key factors:</p>
                <ul>
                <li>Location: Ensure easy access to ports and major transportation routes to facilitate efficient logistics. For businesses focusing on maritime trade, a <a href='https://www.mrssupplychain.com/services/multiuser-warehousing' target="_blank">warehouse in Mundra Port</a> offers an advantageous position to streamline imports and exports.</li>
                <li>Storage Capacity: Evaluate the size of the warehouse and its flexibility to accommodate your inventory needs. Whether you're looking for a small warehouse in Mundra or a larger facility, ensuring the space aligns with your operational scale is key.</li>
                <li>Infrastructure and Amenities: Look for essential features such as temperature control for sensitive goods, security measures, and loading docks for smooth operations.</li>
                <li>Technological Integration: Opt for warehouses incorporating automation and advanced inventory management systems to streamline operations.</li>
                <li>Cost and Affordability: Balance operational costs with the value provided by the warehouse facilities. If you're seeking a <a href="https://www.mrssupplychain.com/services/multiuser-warehousing" target="_blank">warehouse for lease in Mundra,</a> evaluate long-term leasing options to maximize cost-effectiveness.</li>
                </ul>


                <h4>Types of Warehousing Solutions in Mundra</h4>
                <p>Mundra offers various warehousing options tailored to different business needs:</p>
                <ul>
                  <li>General Warehousing: Suitable for standard storage of non-perishable goods.</li>
                  <li>Cold Storage: Essential for businesses dealing with temperature-sensitive products.</li>
                  <li>Free Trade Warehousing Zones (FTWZ): These zones provide duty-free benefits for exporters and importers, enhancing cost-effectiveness.</li>
                  <li>Third-Party Logistics (3PL) Providers: Outsourcing storage and distribution to 3PL providers can offer flexibility and efficiency in managing logistics, especially considering the <a href="https://www.mrssupplychain.com/services/multiuser-warehousing" target="_blank">best warehouse in Mundra.</a> </li>
                
                </ul>


                <h4>Regulatory and Compliance Requirements</h4>
                <p>Understanding local regulations and customs procedures is crucial when operating in Mundra. Compliance with these regulations ensures smooth operations and avoids potential legal issues, particularly when leasing a warehouse in Mundra for lease.</p>


                <h4>The Role of Technology in Modern Warehouses</h4>
                <p>Modern warehouses increasingly rely on technology to enhance efficiency:</p>
                <ul>
                  <li>AI and Automation: These technologies streamline operations by optimising inventory management and reducing manual errors.</li>
                  <li>Real-Time Tracking Systems: Implementing tracking systems allows businesses to monitor inventory levels accurately, ensuring timely order fulfillment. When selecting a warehouse in Mundra for lease, it's important to assess the facility's technological capabilities.</li>
                </ul>


                <p>Mundra is a smart choice for warehousing due to its strategic location, robust infrastructure, and diverse warehousing solutions. For businesses looking to enhance efficiency and reduce operational costs, MRS Supply Chain offers tailored warehousing options, from large to small warehouses in Mundra. Companies can make informed decisions that transform their operations by carefully considering location, capacity, amenities, technological integration, and compliance requirements. Whether you're seeking the best warehouse in Mundra or a warehouse in Mundra port, MRS Supply Chain is committed to helping you unlock Mundra’s full potential for your logistics needs.</p>


                `,
    category: "Blog",
    featureImage: "Blog_img/Warehouse in Mundra.png",
    metaTitle: "Logistics Solutions Powering Mundra’s Renewable Energy: MRS Supply Chain’s Strategic Role",
    metaDescription: "Discover how to choose the right warehouse in Mundra. From port access to cost-effective leasing, find solutions that enhance your logistics and business efficiency.",
    imgAltTag: "Warehouse in Mundra",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Logistics Solutions Powering Mundra’s Renewable Energy: MRS Supply Chain’s Strategic Role",
      description: "Discover how to choose the right warehouse in Mundra. From port access to cost-effective leasing, find solutions that enhance your logistics and business efficiency.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2024-09-18"
  },
  {
    id: 4,
    slug: "the-ascendancy-of-renewable-energy-in-mundra-mrs-supply-chains-strategic-contributions",
    title: "The Ascendancy of Renewable Energy in Mundra: MRS Supply Chain's Strategic Contributions",
    short_description: "Mundra, Gujarat, has emerged as a critical epicentre in India's quest for sustainable energy, thanks to a robust renewable sector that not only aligns with the national energy blueprint but also serves as a vital combatant against climate change.",
    content: `
                
                <p>Mundra, Gujarat, has emerged as a critical epicentre in India's quest for sustainable energy, thanks to a robust renewable sector that not only aligns with the national energy blueprint but also serves as a vital combatant against climate change. At the heart of this transformative shift is MRS Supply Chain, whose innovative logistics solutions are pivotal in propelling Mundra's renewable initiatives to new heights.
                </p>

                <p>The surge in demand for renewable resources underscores the indispensable need for a resilient logistics framework. By optimizing logistical operations and mitigating challenges, MRS Supply Chain ensures that Mundra remains a key driver in India's renewable energy proliferation.
                </p>

                <h4>Current Dynamics of Mundra’s Renewable Energy Sector</h4>
                <p>Mundra is witnessing exponential growth in renewable energy ventures, primarily spurred by the
                <a href='https://economictimes.indiatimes.com/industry/renewables/adani-to-invest-rs-2-3-lakh-crore-in-renewable-energy-manufacturing-capacity/articleshow/109104897.cms' target="_blank">Adani Group's visionary projects.</a>
                The region is set to burgeon into a major nexus for solar and wind energy, with Adani Green Energy Limited (AGEL) planning to amplify its capacity to 45 GW by 2030 from a current 10,934 MW. The expansive Khavda renewable energy park, anticipated to produce 30 GW annually, is poised to power nearly 18 million homes.
                </p>


                <h4>Pivotal Projects and Strategic Initiatives</h4>
                <p>Prominent undertakings include the sprawling 726 square kilometre Khavda Park, a blend of solar and wind technologies, and Adani Power’s trailblazing green ammonia combustion project at Mundra, set to substantially cut <a href='https://www.adanipower.com/en/newsroom/media-releases/adani-power-to-co-fire-green-ammonia-at-its--mundra-plant-for-a-sustainable-future' target="_blank">carbon emissions.</a> These initiatives not only underscore technological advancements but also reaffirm the region's commitment to sustainable energy paradigms.
                </p>


                <h4>MRS Supply Chain: Enhancing Renewable Energy Frameworks</h4>
                <p>MRS Supply Chain's specialized logistics services are tailored to meet the unique demands of the renewable sector. Their adeptness in managing oversized cargo, such as wind turbines and solar panels, ensures projects adhere to schedules and budgets.
                </p>

                <h4>Navigating Logistics Complexities in Renewable Energy</h4>
                <p>The swift expansion of renewable energy in Mundra introduces multiple logistics challenges, which MRS Supply Chain adeptly addresses:
                </p>
                
                <ul>
                <li>Specialized Transportation: The company utilizes advanced methods to transport oversized components securely and punctually.</li>
                <li>Safety Protocols: With high-risk equipment, MRS enforces stringent safety standards to safeguard materials during transit.</li>
                <li>Enhanced Visibility: Leveraging cutting-edge tracking technologies, MRS offers comprehensive visibility, enabling real-time shipment monitoring.</li>
                <li>Regulatory Adherence: MRS expertly navigates the regulatory landscape to forestall delays and avoid penalties.</li>
                <li>Supply Chain Resilience: Addressing material shortages and geopolitical tensions, MRS employs proactive strategies to sustain operations and maintain project timelines.</li>
                </ul>



                <h4>The Critical Role of Logistics in Renewable Energy Ecosystems</h4>
                <p>Efficient logistics are fundamental to the success of renewable energy projects, influencing numerous facets of the supply chain:
                </p>
                <ul>
                <li>Operational Efficiency: MRS enhances logistics operations to expedite component delivery, boosting overall project efficiency.</li>
                <li>Cost Management: MRS significantly reduces production expenses through strategic logistics practices such as route optimization and shipment consolidation.</li>
                <li>Sustainable Practices: Committed to eco-friendly operations, MRS minimizes emissions and uses sustainable packaging materials.</li>
                <li>Supply Chain Dependability: A robust logistics network guarantees timely delivery of components, essential for uninterrupted project execution.</li>
                <li>Market Competitiveness: MRS's dedication to sustainability attracts clientele to prioritise environmental responsibility.</li>
                </ul>

                <h4>Projections and Prospects in Renewable Energy Logistics</h4>
                <p>The trajectory for renewable energy logistics in Mundra is promising ripe with opportunities for innovation and advancement. As the sector continues to expand, addressing logistics challenges will be crucial. Positioned at the forefront, MRS Supply Chain is dedicated to pioneering sustainable logistics solutions that resonate with the overarching objectives of renewable energy advancement.
                </p>

                <p>MRS Supply Chain’s integral role in this dynamic landscape underscores the symbiotic relationship between advanced logistics and renewable energy growth in Mundra. Stakeholders are urged to prioritize logistical enhancements to bolster the efficacy and sustainability of renewable projects. With strategic investments in sophisticated logistics solutions, Mundra is poised to sustain its leadership in the renewable sector. For a deeper insight into MRS Supply Chain’s contributions, visit their website.
                </p>`,
    category: "Blog",
    featureImage: "Blog_img/Logistics Solutions Powering Mundra’s Renewable Energy.png",
    metaTitle: "Logistics Solutions Powering Mundra’s Renewable Energy: MRS Supply Chain’s Strategic Role",
    metaDescription: "Discover how MRS Supply Chain's innovative logistics solutions are propelling Mundra's renewable energy sector, driving sustainability and efficiency in key projects.",
    imgAltTag: "Logistics Solutions Powering Mundra’s Renewable Energy",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Logistics Solutions Powering Mundra’s Renewable Energy: MRS Supply Chain’s Strategic Role",
      description: "Discover how MRS Supply Chain's innovative logistics solutions are propelling Mundra's renewable energy sector, driving sustainability and efficiency in key projects",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2024-08-02"
  },
  {
    id: 3,
    slug: "the-future-of-cold-chain-logistics-at-ports-trends-and-challenges",
    title: "The Future of Cold Chain Logistics at Ports: Trends and Challenges",
    short_description: "The cold chain logistics sector is experiencing significant transformations, particularly at ports where the movement of temperature-sensitive goods is crucial.",
    content: `
                
                <p>The cold chain logistics sector is experiencing significant transformations, particularly at ports where the movement of temperature-sensitive goods is crucial. As global demand for perishable products continues to rise, understanding future trends and challenges in cold chain logistics is essential for industry stakeholders. This blog will explore the current landscape of <a href='https://www.mrssupplychain.com/' target="_blank">cold chain logistics</a> at ports, with a specific focus on the Mundra port in Kutch, Gujarat. We will examine emerging trends, the challenges faced, and the strategies to navigate this evolving environment.
                </p>

                <p>At MRS Supply Chain, we are dedicated to staying at the forefront of these developments and providing expert insights to our clients. By analysing the latest trends and challenges in cold chain logistics, we aim to help our partners make informed decisions and optimise their supply chain operations. Our team of experienced professionals combines industry knowledge with cutting-edge technology to deliver innovative solutions tailored to the unique needs of each client.
                </p>

                <h4>Understanding Cold Chain Logistics</h4>
                <p>Cold chain logistics refers to the temperature-controlled supply chain that ensures the integrity of perishable goods from production to consumption. This system is vital for various industries, including <a href='https://www.mrssupplychain.com/blog/strategic-warehousing-for-pharma-at-gujarat-key-ports' target="_blank">pharmaceuticals</a>, food and beverage, and chemicals, where maintaining specific temperature ranges is crucial to prevent spoilage or degradation. Ports play a pivotal role in cold chain logistics, acting as key nodes for the import and export of temperature-sensitive products.
                </p>


                <h4>Emerging Trends in Cold Chain Logistics</h4>
                <p>As the demand for temperature-sensitive products continues to rise, stakeholders are embracing innovative solutions to enhance efficiency and maintain product integrity. Here are some of the key trends that are redefining cold chain logistics:
                </p>
                <h5>1-Increased Demand for E-Grocery Services</h5>
                <p>The COVID-19 pandemic has accelerated the shift towards e-commerce, particularly in grocery delivery services. According to industry reports, the e-grocery market is expected to grow significantly, with a projected market size of USD 801.26 billion by 2030, growing at a <a href='https://www.forbes.com/sites/stevebanker/2021/09/20/the-cold-chain-is-a-top-opportunity-for-third-party-logistics-providers/' target="_blank">CAGR of 14.07% from 2022 to 2030.</a> This surge in demand necessitates enhanced cold chain logistics capabilities to ensure the safe and timely delivery of perishable goods.
                </p>

                <h5>2-Technological Advancements</h5>
                <p>Technological innovation is at the forefront of transforming cold chain logistics. The integration of Internet of Things (IoT) devices allows for <a href='https://www.altexsoft.com/blog/cold-chain-logistics/' target="_blank">real-time monitoring of temperature and humidity levels</a> throughout the supply chain. Predictive analytics and machine learning are also being leveraged to optimise routes and reduce energy consumption, enhancing overall efficiency. These technologies not only improve operational performance but also help in maintaining compliance with regulatory standards.
                </p>

                <h5>3-Sustainability Initiatives</h5>
                <p>Sustainability is becoming a critical focus for cold chain logistics. Companies are increasingly adopting eco-friendly practices, such as energy-efficient warehouses and electric vehicles for transportation. The emphasis on reducing carbon footprints aligns with consumer preferences for environmentally responsible practices. Innovations in packaging materials, such as phase-change materials (PCMs) that maintain temperature without the need for traditional refrigerants, are also gaining traction.
                </p>

                <h5>4-Innovative Cold Storage Solutions</h5>
                <p>As warehouse capacity tightens, particularly in urban areas, the industry is witnessing a shift towards more creative cold storage solutions. The use of trailers as mobile cold storage units and the establishment of smaller, decentralized distribution centres closer to consumer hubs are emerging trends. These strategies aim to reduce delivery times and costs while maintaining product integrity.
                </p>

                <h5>5-Focus on Transparency and Traceability</h5>
                <p>Consumers are increasingly demanding transparency regarding the origin and handling of their food products. This trend is prompting companies to adopt advanced tracking systems that provide real-time data on product conditions throughout the supply chain. Implementing blockchain technology can enhance traceability, ensuring that consumers have access to information about the journey of their products, thereby building trust and accountability.
                </p>

                <h4>Challenges in Cold Chain Logistics</h4>
                <p>Despite the promising trends, several challenges persist in the cold chain logistics landscape at ports.</p>

                <h5>1-Infrastructure Limitations</h5>
                <p>Many ports lack the necessary infrastructure to support efficient cold chain operations. Inadequate cold storage facilities, outdated equipment, and insufficient handling capabilities can lead to increased spoilage rates and operational inefficiencies. Investments in modern infrastructure are crucial to meet the growing demand for cold chain logistics.
                </p>

                <h5>2-Regulatory Compliance</h5>
                <p>The cold chain logistics sector is subject to stringent regulations concerning temperature control and product handling. Compliance with these regulations can be challenging, particularly for companies operating in multiple jurisdictions with varying standards. Failure to adhere to these regulations can result in significant financial penalties and damage to a company's reputation.
                </p>

                <h5>3-Labour Shortages</h5>
                <p>The cold chain logistics industry faces a growing labour shortage, exacerbated by the demanding nature of the work. The need for skilled labour to operate sophisticated cold chain systems is critical, yet many companies struggle to attract and retain talent. Automation and technology can help mitigate this challenge by reducing the reliance on manual labou
                </p>

                <h5>4-Market Fragmentation</h5>
                <p>The cold chain logistics market is often fragmented, with varying levels of service quality and technological adoption among providers. This fragmentation can lead to inefficiencies and complicate collaboration between stakeholders. Standardising practices and enhancing communication across the supply chain can help address these issues.
                </p>

                <h4>Strategies for Navigating the Future of Cold Chain Logistics</h4>
                <p>To successfully navigate the evolving landscape of cold chain logistics at ports, stakeholders must adopt several key strategies:</p>

                <h5>1-Invest in Technology</h5>
                <p>Investing in the implementation of IoT and predictive analytics can drastically streamline the loading and offloading processes, ensuring perishable goods are managed with precision from ship to shore. These technologies can help optimise routes, reduce energy consumption, and improve compliance with regulatory standards.
                </p>

                <h5>2-Enhance Infrastructure</h5>
                <p>For ports, enhancing infrastructure means not only increasing cold storage capacity but also integrating advanced dock management systems to reduce wait times and ensure faster turnaround of temperature-sensitive shipments.
                </p>

                <h5>3-Foster Collaboration</h5>
                <p>Ports must act as central hubs that foster collaboration, creating systems that allow for seamless data exchange and coordination between shipping companies, cold storage facilities, and ground transportation providers. Establishing partnerships with third-party logistics (3PL) providers specialising in cold chain management can also enhance service offerings and operational capabilities.
                </p>

                <h5>4-Prioritise Sustainability</h5>
                <p>Adopting sustainable practices not only aligns with consumer preferences but also contributes to long-term operational efficiency. Ports can lead the way in sustainability by adopting green technologies such as solar-powered refrigeration units and electric cargo handlers to minimise the environmental footprint of logistics operations.
                </p>

                <h5>5-Focus on Talent Development</h5>
                <p>Addressing labour shortages requires a focus on talent development and retention. Developing a skilled workforce at ports is critical, as specialised training in managing high-tech cold chain logistics systems ensures the integrity of sensitive goods throughout their journey. Additionally, leveraging automation can help reduce the burden on human resources and improve overall efficiency.
                </p>

                <p>The future of cold chain logistics at ports, including the Mundra port in Kutch, Gujarat, is poised for significant transformation, driven by increasing demand, technological advancements, and a growing emphasis on sustainability. While challenges such as infrastructure limitations, regulatory compliance, and labour shortages persist, strategic investments and collaborative efforts can help stakeholders navigate this evolving landscape. By embracing innovation and prioritising operational efficiency, the cold chain logistics sector can meet the demands of a rapidly changing market and ensure the safe delivery of temperature-sensitive products.</p>

                <p>At MRS Supply Chain, we are committed to supporting our clients in navigating these trends and challenges. Our team of experts combines industry knowledge with <a href="https://www.mrssupplychain.com/services/tech-driven-last-mile-delivery-services" target="_blank">tech-driven last-mile delivery solutions</a> that optimise cold chain operations and drive business growth. By partnering with MRS Supply Chain,<a href="https://www.mrssupplychain.com/" target="_blank">logistics companies in Kutch</a> can stay ahead of the curve and capitalise on the opportunities presented by the future of cold chain logistics at ports, including the strategic hub of Mundra port in Kutch, Gujarat.
                </p>`,
    category: "Blog",
    featureImage: "Blog_img/Cold Chain Logistics at Mundra port in Kutch, Gujarat.jpg",
    metaTitle: "Future of Cold Chain Logistics at Ports: Trends, Challenges & Strategies",
    metaDescription: "Explore cold chain logistics trends, challenges, and strategies at ports, including insights on the strategic Mundra port in Kutch, Gujarat.",
    imgAltTag: "Cold Chain Logistics at Mundra port in Kutch, Gujarat.",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Connecting Markets: The Benefits of Rail Transport Services from Mundra to Delhi",
      description: "Explore cold chain logistics trends, challenges, and strategies at ports, including insights on the strategic Mundra port in Kutch, Gujarat.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2024-08-02"
  },
  {
    id: 2,
    slug: "strategic-warehousing-for-pharma-at-gujarat-key-ports",
    title: "Strategic Warehousing for Pharma at Gujarat’s Key Ports",
    short_description: "Gujarat, a cornerstone in the global pharmaceutical sector, boasts strategic port locations such as Kandla, Mundra, and Hajira.",
    content: `
                
                <p>Gujarat, a cornerstone in the global pharmaceutical sector, boasts strategic port locations such as Kandla, Mundra, and Hajira. These ports are pivotal for efficient international trade and are integral to specialised <a href="https://www.mrssupplychain.com/services/multiuser-warehousing" target='_blank'>warehousing for pharma</a> industry's stringent standards. Within this dynamic, MRS Supply Chain elevates the logistical framework with its advanced facility in Gujarat, meticulously designed to meet the critical needs of pharmaceutical storage, security, and regulatory compliance. This ensures that MRS is not just a participant but a leader in enhancing global pharmaceutical supply chain efficiency. As we explore further, we will see how warehousing for the pharmaceutical industry at these key ports significantly enhances Gujarat's sector.
                </p>

                <h3>The Crucial Role of Gujarat's Strategic Location and Infrastructure</h3>
                <h4>Strategic Location and Accessibility</h4>
                <p>Gujarat's ports—Kandla, Mundra, and Hajira—serve as key nodes in the global pharmaceutical supply chain, offering unmatched access to major international markets. These ports enable the efficient movement of pharmaceutical goods, reducing transit times and ensuring that products reach global markets swiftly and securely.</p>

                <h4>Robust Infrastructure Tailored for Pharma</h4>
                <p>The state's infrastructure is purpose-built to support the pharmaceutical industry. It features advanced warehousing facilities that meet international standards for product safety and quality control.</p>

                <h4>Government Policies and Support</h4>
                <p>Gujarat's government actively promotes the pharmaceutical sector through various incentives, such as tax breaks and subsidised land rates for setting up manufacturing and warehousing units. These policies are designed to bolster investment in the pharma sector, further enhancing the state's appeal as a leading logistics hub.</p>

                <p>This strategic amalgamation of location, infrastructure, and supportive policies creates an ideal ecosystem for the pharmaceutical industry to thrive in Gujarat, setting a benchmark for global logistics excellence. As we transition into the specialised warehousing solutions provided by MRS Supply Chain, it's clear that integrating these elements is pivotal for sustaining the growth and efficiency of the pharma sector in the region.</p>

                <h3>Customised Warehousing Solutions for the Pharma Industry in Gujarat - MRS Supply Chain Advantage</h3>
                <h4>Tailored Services for the Pharma Industry</h4>
                <p>MRS Supply Chain has optimised its warehousing services to meet the pharmaceutical industry's unique needs, offering various solutions that cater to different aspects of logistical and supply chain needs. These services include Built-to-Suit Warehousing, which provides customised spaces designed to match specific business requirements and future-ready infrastructure. Multiuser Warehousing offers flexible space and resource sharing, optimised for both B2B and B2C operations. Customs Bonded Warehousing ensures secure, compliant storage near key ports like Hazira, Kandla, and Mundra. In-Plant Warehouse Management enhances manufacturing operations with solutions tailored to the unique needs of manufacturing processes. These tailored services ensure that pharmaceutical products are managed with the utmost care and precision throughout their lifecycle.</p>
    
                <p>Here are the key features of<a href="https://www.mrssupplychain.com/" target='_blank'> MRS Supply Chain's warehousing services </a>tailored for the pharmaceutical industry:</p>

                <ul>
                  <li><span>Robust Security Systems:</span> Safeguards valuable pharmaceuticals against potential threats.</li>
                  <li><span>Advanced Inventory Management Systems:</span> Provides real-time tracking and reporting to ensure efficient management and compliance.</li>
                  <li><span>Compliance Management:</span> Systems designed to ensure that warehousing practices adhere to regulatory standards required by healthcare authorities, both locally and internationally.</li>
                  <li><span>Scalable Storage Options:</span> Flexible warehousing solutions that can expand or contract based on the market demand or specific project requirements, providing cost-effective scalability.</li>
                </ul>

                <p>These features are designed to meet the stringent health and safety regulations critical for pharmaceutical logistics.</p>

                <h4>Strategic Integration at Gujarat Ports</h4>
                <p>Utilising its prime locations at<a href="https://www.mrssupplychain.com/" target='_blank'> Kandla, Mundra, and Hajira ports</a>, MRS Supply Chain offers swift access to international shipping routes, enhancing the logistical efficiency of pharma operations. This strategic positioning reduces lead times and cuts down on transportation costs, making it easier to manage the supply chain for pharmaceutical products effectively.</p>

                <h4>Proven Impact in the Pharma Sector</h4>
                <p>Through its dedicated warehousing solutions, MRS Supply Chain has successfully supported numerous pharmaceutical companies, demonstrating significant improvements in supply chain efficiency and compliance. This track record highlights their capability to handle complex pharmaceutical logistics challenges, reinforcing their role as a vital partner in the industry.</p>
                <p>These specialised warehousing solutions underscore MRS Supply Chain's commitment to supporting the pharmaceutical industry's evolving needs, ensuring that products are managed with the utmost care and precision throughout their lifecycle.</p>
                <p>As a trusted partner in the pharmaceutical logistics sector, MRS Supply Chain stands out through its commitment to delivering tailored, high-quality warehousing solutions at Gujarat's key ports. By choosing MRS, <a hre="https://www.mrssupplychain.com/services/multiuser-warehousing" target='_blank'>pharmaceutical warehousing</a> companies gain a strategic advantage, leveraging MRS's expertise and innovative logistics services to enhance their operations and market reach. For those looking to optimise their supply chain efficiency and ensure product integrity, MRS Supply Chain is your ideal partner. Contact MRS Supply Chain today to fortify your logistics and elevate your market potential.</p>


                `,
    category: "Blog",
    featureImage: "Blog_img/Warehousing Solutions for Pharmaceutical.webp",
    metaTitle: "Warehousing Solutions for Pharma in Gujarat Ports",
    metaDescription: "MRS Supply Chain offers customized pharma warehousing in Gujarat ports (Kandla, Mundra, Hazira) for efficient global logistics. Contact us for tailored solutions!",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Strategic Warehousing for Pharma at Gujarat’s Key Ports",
      description: "Gujarat, a cornerstone in the global pharmaceutical sector, boasts strategic port locations such as Kandla, Mundra, and Hajira.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2024-06-29"
  },
  {
    id: 1,
    slug: "connecting-markets-the-benefits-of-rail-transport-services-from-mundra-to-delhi",
    title: "Connecting Markets: The Benefits of Rail Transport Services from Mundra to Delhi",
    short_description: "Rail transport from Gujarat to North India is crucial for linking industries and markets, and MRS Supply Chain is enhancing this vital connection with their innovative combined road and rail solutions from Mundra Port.",
    content: `
                
                <p>Rail transport from Gujarat to North India is crucial for linking industries and markets, and MRS Supply Chain is enhancing this vital connection with their innovative combined road and rail solutions from Mundra Port. This strategic approach not only optimises logistics but also cuts transportation costs significantly, emphasising Mundra's role as a critical hub in the regional economy and spotlighting MRS's commitment to efficient and economical transport solutions. Let's explore how this integrated approach is transforming the logistics landscape across the region.
                </p>

                <p>In the dynamic landscape of Indian logistics,<a href="https://www.mrssupplychain.com/" target='_blank'> rail transport </a>serves as a vital conduit for moving goods from Gujarat to North India. Specifically, rail transport from Mundra, Gujarat to Delhi represents an expansive and efficient logistics network, offering a seamless and reliable pathway for businesses to optimise their supply chains and access the vast markets of North India.
                </p>

                <h4>Extensive Reach of Rail Networks in North India</h4>
                <p>North India's rail network provides an essential backbone for distributing goods efficiently across the region. From Mundra, rail lines extend through various states, reaching even the most remote areas. This extensive network ensures that businesses can rely on rail transport for widespread market access, making it a preferred choice for sectors requiring robust supply chain solutions, including the pharmaceutical industry. Here’s a closer look at how this network enhances connectivity and supports various industries:</p>

                 <ul>
                  <li>Connects major commercial hubs and remote areas, enhancing market accessibility.</li>
                  <li>Supports multimodal logistics by integrating with road and air transport networks.</li>
                  <li>Facilitates efficient distribution for diverse industries, including agriculture, manufacturing, and retail.</li>
                </ul>

                <h4>Cost Effectiveness of Rail Transport</h4>
                <p>Rail transport offers a cost-effective alternative to road and air transport, particularly for long-distance hauls from Mundra to North India. The economies of scale possible with rail freight allow businesses to reduce transportation costs significantly. Additionally, the predictable nature of rail tariffs and schedules helps companies plan their budgets and logistics operations more effectively. Here’s how it manages to keep expenses down for businesses transporting goods from Mundra to North India:</p>

                <ul>
                  <li>Significantly lower fuel costs compared to road transport.</li>
                  <li>Reduces the need for multiple cargo handlers, lowering labour costs.</li>
                  <li>Offers bulk transport options, which decreases the cost per unit.</li>
                </ul>

                <h4>Timely Delivery Via Rail</h4>
                <p>The reliability of rail transport is enhanced by fixed schedules and dedicated freight corridors, ensuring timely delivery of goods. This is particularly crucial for industries like pharmaceuticals, where delays can lead to significant losses. Rail transport's ability to adhere to strict timelines helps maintain the integrity of supply chains and ensures that products reach their destinations on schedule. Here’s how rail transport meets these stringent demands for punctuality:</p>
                
                <ul>
                  <li>Less prone to traffic delays than<a href="https://www.mrssupplychain.com/services/road-and-rail-transport" target='_blank'> road transport</a>, ensuring more predictable arrival times.</li>
                  <li>Offers dedicated freight corridors designed to minimise stoppages.</li>
                  <li>Provides scheduled departures and arrivals, which helps in precise planning of supply chain activities.</li>
                </ul>

                <h4>Environmental Advantages of Rail Transport </h4>
                <p>Rail transport is not only efficient and economical but also environmentally friendly. Trains produce a fraction of the greenhouse gas emissions per ton-mile compared to trucks and planes, making rail transport a more sustainable choice. This is especially important for companies looking to reduce their carbon footprint and contribute to environmental conservation efforts. Here’s a look at how it contributes to sustainability efforts:</p>
                
                <ul>
                  <li>Lower emissions per ton-mile compared to trucks, contributing to reduced air pollution.</li>
                  <li>Consumes less energy per ton-mile, promoting energy conservation.</li>
                  <li>Helps reduce road congestion, leading to lower overall urban emissions.</li>
                </ul>

              
                <p class="last-para">As businesses prioritise efficiency, cost-effectiveness, and sustainability in their logistics strategies, the <a href="https://www.mrssupplychain.com/services/road-and-rail-transport" target='_blank'>Rail Transport Services</a> from Mundra, Gujarat to Delhi, offered by MRS Supply Chain, stand out as a superior solution. With diverse delivery options, multimodal freight services, and a commitment to timely and safe delivery, MRS enhances rail transport's inherent advantages. Explore how MRS can elevate your logistics operations and ensure your goods move seamlessly across North India.<a htrf="https://www.mrssupplychain.com/services/road-and-rail-transport" target='_blank'> Connect with MRS Rail Transport Services</a> to discover a partnership that transcends expectations.</p>
                
                `,
    category: "Blog",
    featureImage: "Blog_img/Rail Transport Solution .webp",
    metaTitle: "Rail Transport Mundra to Delhi - Cost-Effective & Efficient Solution with MRS",
    metaDescription: "Move goods efficiently from Mundra to Delhi with MRS Rail Transport! Cost-effective, reliable, and perfect for North Indian markets. Reduce costs & emissions.",
    ogImage: "path/to/og-image.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Connecting Markets: The Benefits of Rail Transport Services from Mundra to Delhi",
      description: "Rail transport from Gujarat to North India is crucial for linking industries and markets, and MRS Supply Chain is enhancing this vital connection with their innovative combined road and rail solutions from Mundra Port.",
      image: "path/to/schema-image.jpg"
    },
    publishDate: "2024-06-29"
  }
];
const Blog_close_icon = "data:image/svg+xml,%3csvg%20width='13'%20height='13'%20viewBox='0%200%2013%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cline%20x1='13'%20y1='7'%20x2='-4.37114e-08'%20y2='7'%20stroke='black'/%3e%3cline%20x1='6.48438'%20y1='13'%20x2='6.48437'%20y2='2.18557e-08'%20stroke='black'/%3e%3c/svg%3e";
function HomeBlog() {
  useEffect(() => {
    new Swiper(".blog-sldr", {
      slidesPerView: 3.1,
      spaceBetween: 70,
      autoplay: {
        delay: 3e3
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3.1
        }
      }
    });
    $$1(".Blog_close_icon").off("click").on("click", function() {
      var $blogBx = $$1(this).closest(".blog-bx");
      $$1(this).toggleClass("bl-rotate");
      $$1(".Blog_close_icon").not(this).removeClass("bl-rotate");
      $$1(".blg-inner-dv").not($blogBx.find(".blg-inner-dv")).addClass("blopen");
      $blogBx.find(".blg-inner-dv").toggleClass("blopen");
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "blog-sec section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "blg-ttl-bx", children: [
      /* @__PURE__ */ jsx("h2", { className: "blog-hdng js-split-text black", children: "News & Blog" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "btn grey blg-btn",
          id: "btn-styl",
          href: "/blog",
          "data-aos": "fade-in",
          "data-aos-duration": "600",
          "data-aos-once": "true",
          "data-aos-delay": "600",
          children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "View All" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "swiper blog-sldr",
        "data-aos": "fade-in",
        "data-aos-duration": "800",
        "data-aos-once": "true",
        "data-aos-delay": "800",
        children: /* @__PURE__ */ jsx("div", { className: "swiper-wrapper", children: postsData.map((post) => /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsx("a", { href: `/blog/${post.slug}`, children: /* @__PURE__ */ jsxs("div", { className: "blog-bx", children: [
          /* @__PURE__ */ jsxs("div", { className: "blg-content-dv", children: [
            /* @__PURE__ */ jsxs("div", { className: "date-box", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                post.category,
                " · ",
                post.publishDate
              ] }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "Blog_close_icon",
                  src: Blog_close_icon,
                  alt: "Blog_close_icon"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "post-ttl clamp-1", children: post.title }),
            /* @__PURE__ */ jsxs("div", { className: "blg-inner-dv blopen", children: [
              /* @__PURE__ */ jsx("p", { children: post.short_description }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", href: `/blog/${post.slug}`, children: "Read more" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "img",
            {
              className: "featur-img featur-img1",
              src: post.featureImage,
              alt: "blog1"
            }
          )
        ] }, post.id) }) })) })
      }
    )
  ] }) }) });
}
const message_icon = "data:image/svg+xml,%3csvg%20width='59'%20height='44'%20viewBox='0%200%2059%2044'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Vector'%20d='M55.6068%200H3.39319C1.52213%200%200%201.52213%200%203.39308V40.2496C0%2042.0257%201.3721%2043.4866%203.11179%2043.6302C3.1285%2043.6315%203.14521%2043.6328%203.16203%2043.634C3.23855%2043.6391%203.31541%2043.6427%203.39319%2043.6427H55.6068C55.6846%2043.6427%2055.7615%2043.6391%2055.838%2043.634C55.8549%2043.6328%2055.8717%2043.6315%2055.8886%2043.63C57.6281%2043.4863%2059%2042.0256%2059%2040.2496V3.39308C59%201.52213%2057.4779%200%2055.6068%200ZM52.5935%202.76562L29.5%2025.8592L6.40646%202.76562H52.5935ZM2.8373%2040.5351C2.7919%2040.4489%202.76562%2040.3517%202.76562%2040.2496V3.39308C2.76562%203.29098%202.7919%203.19384%202.83742%203.10764L21.551%2021.8214L2.8373%2040.5351ZM6.40646%2040.8771L23.5067%2023.7769L28.5222%2028.7925C28.7816%2029.0517%2029.1333%2029.1975%2029.5%2029.1975C29.8667%2029.1975%2030.2184%2029.0519%2030.4778%2028.7925L35.4932%2023.7769L52.5934%2040.877L6.40646%2040.8771ZM56.2344%2040.2496C56.2344%2040.3517%2056.2081%2040.4489%2056.1626%2040.5351L37.449%2021.8214L56.1627%203.10764C56.2082%203.19384%2056.2345%203.29098%2056.2345%203.39308L56.2344%2040.2496Z'%20fill='url(%23paint0_linear_0_2526)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_0_2526'%20x1='-49'%20y1='43.6427'%20x2='29.5'%20y2='43.6427'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0.0542986'%20stop-color='%233B84B6'/%3e%3cstop%20offset='1'%20stop-color='%23E49449'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
const linkdn_icon = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2841_1682)'%3e%3cpath%20d='M23.9933%2024.0002L23.9993%2023.9992V15.1972C23.9993%2010.8912%2023.0723%207.57422%2018.0383%207.57422C15.6183%207.57422%2013.9943%208.90222%2013.3313%2010.1612H13.2613V7.97622H8.48828V23.9992H13.4583V16.0652C13.4583%2013.9762%2013.8543%2011.9562%2016.4413%2011.9562C18.9903%2011.9562%2019.0283%2014.3402%2019.0283%2016.1992V24.0002H23.9933Z'%20fill='%239E9E9E'/%3e%3cpath%20d='M0.396484%207.97656H5.37249V23.9996H0.396484V7.97656Z'%20fill='%239E9E9E'/%3e%3cpath%20d='M2.882%200C1.291%200%200%201.291%200%202.882C0%204.473%201.291%205.791%202.882%205.791C4.473%205.791%205.764%204.473%205.764%202.882C5.763%201.291%204.472%200%202.882%200Z'%20fill='%239E9E9E'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2841_1682'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
function Footer() {
  const form_subs = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const emailinput_subs = React.useRef(null);
  const handleFocus = (e) => {
    e.target.classList.remove("error_line");
    let er2 = document.getElementById("eml_err_subs");
    er2.classList.remove("show_error");
    let er2v = document.getElementById("eml_err1_subs");
    er2v.classList.remove("show_error");
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    let email_fld_subs = emailinput_subs.current.value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email_fld_subs == "") {
      let v2 = document.getElementById("email_fld_subs");
      v2.className += " error_line";
      let er2 = document.getElementById("eml_err_subs");
      er2.className += " show_error";
    } else if (!email_fld_subs.match(mailformat)) {
      let v2 = document.getElementById("email_fld_subs");
      v2.className += " error_line";
      let er2v = document.getElementById("eml_err1_subs");
      er2v.className += " show_error";
    } else {
      fetch(
        "https://script.google.com/macros/s/AKfycbyK-BOXb7UbgaZkq49hQCwtNIZ9J9WWl5Zrn0cD88m2N-5O7IiKFlikpJCutW3HsIKN/exec",
        {
          method: "POST",
          body: new FormData(form_subs.current)
        }
      ).then((res) => {
        console.log("SUCCESSFULLY SUBMITTED");
        setLoading(false);
      }).catch((err) => console.log(err));
      emailjs.sendForm(
        "service_7xurfxj",
        "template_7d3op88",
        e.target,
        "SsPYHKCapw4h-xBn_"
      ).then(
        (result) => {
          console.log(result.text);
          setStatusMessage("Thank you for subscribing");
          let bx = document.getElementById("thnk_box_subs");
          bx.className += " thnk_show";
          let frm_bx = document.getElementById("subs_form_bx");
          frm_bx.className += " form_hide";
        },
        (error) => {
          console.log(error.text);
          setStatusMessage(`${error.text} happened`);
        }
      );
      e.target.reset();
    }
  };
  useEffect(() => {
    if (!$(".marquee").data("isMarqueeInitialized")) {
      $(".marquee").data("isMarqueeInitialized", true);
      $(".marquee").marquee({
        //speed in milliseconds of the marquee
        duration: 9e3,
        //gap in pixels between the tickers
        gap: 50,
        //time in milliseconds before the marquee will start animating
        delayBeforeStart: 0,
        //'left' or 'right'
        direction: "left",
        //true or false - should the marquee be duplicated to show an effect of continuous flow
        duplicated: true
      });
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "section footer-sec section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 flex foo-contanr", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "clm-2 footr-clm1",
          "data-aos": "fade-down",
          "data-aos-easing": "linear",
          "data-aos-duration": "600",
          "data-aos-delay": "200",
          "data-aos-once": "true",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: message_icon,
                alt: "message_icon",
                "data-aos": "fade-in",
                "data-aos-duration": "500",
                "data-aos-once": "true"
              }
            ),
            /* @__PURE__ */ jsxs(
              "h2",
              {
                className: "white subscribe-txt",
                "data-aos": "fade-in",
                "data-aos-easing": "linear",
                "data-aos-duration": "600",
                "data-aos-delay": "600",
                "data-aos-once": "true",
                children: [
                  "Subscribe to",
                  /* @__PURE__ */ jsx("br", {}),
                  "Newsletters"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "p",
              {
                className: "white",
                "data-aos": "fade-in",
                "data-aos-duration": "600",
                "data-aos-once": "true",
                "data-aos-delay": "800",
                children: [
                  "Want to stay up to date? ",
                  /* @__PURE__ */ jsx("br", {}),
                  "Sign up for MRS’s biannual update",
                  " "
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "contact_form",
                "data-aos": "fade-in",
                "data-aos-duration": "500",
                "data-aos-once": "true",
                "data-aos-delay": "1100",
                children: [
                  /* @__PURE__ */ jsxs(
                    "form",
                    {
                      className: "conversion_form",
                      ref: form_subs,
                      onSubmit: sendEmail,
                      id: "subs_form_bx",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "", children: [
                          /* @__PURE__ */ jsx("label", { className: "form-label hide", children: "Email Address" }),
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              type: "email",
                              name: "email",
                              placeholder: "Enter your email",
                              className: "form__input",
                              id: "email_fld_subs",
                              ref: emailinput_subs,
                              onFocus: handleFocus
                            }
                          ),
                          /* @__PURE__ */ jsx("p", { className: "error_msg", id: "eml_err_subs", children: "Please Enter Email Address" }),
                          /* @__PURE__ */ jsx("p", { className: "error_msg", id: "eml_err1_subs", children: "Please Enter Valid Email Address" })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "btn_col", children: /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "submit",
                            className: "btn btn-primary conv_btn cont_form_btn",
                            id: "susbs-btn",
                            value: "Subscribe"
                          }
                        ) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "thnk txt_wht white", id: "thnk_box_subs", children: "Thank you for subscribing" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "clm-2 footr-clm2", children: [
        /* @__PURE__ */ jsxs("div", { className: "foo-links", children: [
          /* @__PURE__ */ jsx("a", { href: "/", className: "js-split-text delay-3s", children: "Home" }),
          /* @__PURE__ */ jsx("a", { href: "/#solution", className: "js-split-text delay-4s", children: "Services" }),
          /* @__PURE__ */ jsx("a", { href: "/#sector", className: "js-split-text delay-5s", children: "Sectors" }),
          /* @__PURE__ */ jsx("a", { href: "/careers", className: "js-split-text delay-7s", children: "Careers" }),
          /* @__PURE__ */ jsx("a", { href: "/contact-us", className: "js-split-text delay-8s", children: "Contact Us" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "foo-innr-container", children: [
          /* @__PURE__ */ jsxs("div", { className: "width-60 foo-innr-clm1", children: [
            /* @__PURE__ */ jsx("h6", { className: "light-grey js-split-text delay-6s", children: "Head Office" }),
            /* @__PURE__ */ jsx(
              "p",
              {
                "data-aos": "fade-in",
                "data-aos-duration": "500",
                "data-aos-once": "true",
                "data-aos-delay": "700",
                className: "foo-addrss",
                children: "No 7, Ground Floor, 4th Cross, Papaiah Garden Road, Banashankari, 3rd Stage, Bangalore - 560085, Karnataka, India"
              }
            ),
            /* @__PURE__ */ jsx("h6", { className: "light-grey phone js-split-text delay-8s foo-phone", children: "Phone" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                className: "ph-numbr",
                href: "tel:+912836235415",
                "data-aos": "fade-in",
                "data-aos-duration": "500",
                "data-aos-once": "true",
                "data-aos-delay": "1000",
                children: "+91 2836 235415"
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "site-credit credit-desk",
                "data-aos": "fade-in",
                "data-aos-duration": "500",
                "data-aos-once": "true",
                "data-aos-delay": "900",
                children: "© 2024, MRS Supply Chain. All Rights Reserved."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "width-40 foo-innr-clm2", children: [
            /* @__PURE__ */ jsx("h6", { className: "light-grey js-split-text delay-7s", children: "Email" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:connect@mrssupplychain.com",
                "data-aos": "fade-in",
                "data-aos-duration": "500",
                "data-aos-once": "true",
                "data-aos-delay": "900",
                className: "foo-email",
                children: "connect@mrssupplychain.com"
              }
            ),
            /* @__PURE__ */ jsx("h6", { className: "light-grey follow-ttl js-split-text delay-7s", children: "Follow Us" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.linkedin.com/company/mrs-shipping-llp/",
                className: "linkdn",
                target: "_blank",
                "data-aos": "fade-in",
                "data-aos-duration": "500",
                "data-aos-once": "true",
                "data-aos-delay": "900",
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: linkdn_icon,
                    alt: "message_icon",
                    "data-aos": "fade-in",
                    "data-aos-duration": "500",
                    "data-aos-once": "true"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "foo-bottom-links", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/safety-policy",
                  "data-aos": "fade-in",
                  "data-aos-duration": "500",
                  "data-aos-once": "true",
                  "data-aos-delay": "950",
                  children: "Safety Policy"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/privacy-policy",
                  "data-aos": "fade-in",
                  "data-aos-duration": "500",
                  "data-aos-once": "true",
                  "data-aos-delay": "1000",
                  children: "Privacy Policy"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "site-credit credit-mob",
                "data-aos": "fade-in",
                "data-aos-duration": "500",
                "data-aos-once": "true",
                "data-aos-delay": "900",
                children: "© 2024, MRS Supply Chain. All Rights Reserved."
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "section bottom-footer-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container", children: /* @__PURE__ */ jsx("h2", { className: "marquee", children: "We are the 1st Company in Kutch to Provide Single Largest Warehouse of Grade A category" }) }) })
  ] });
}
const Proximity_Hazira = "/assets/Proximity_Hazira-IWVkbWmP.svg";
const Certifications = "data:image/svg+xml,%3csvg%20width='100'%20height='85'%20viewBox='0%200%20100%2085'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M91.5215%2048.3246V1.55385C91.5215%200.621538%2090.9%200%2089.9677%200H19.7338C18.8015%200%2018.18%200.621538%2018.18%201.55385V55.6277L15.0723%2056.7154V54.0738C15.0723%2053.1415%2014.4508%2052.52%2013.5185%2052.52H1.55385C0.621538%2052.52%200%2053.1415%200%2054.0738V83.1308C0%2084.0631%200.621538%2084.6846%201.55385%2084.6846H13.5185C14.4508%2084.6846%2015.0723%2084.0631%2015.0723%2083.1308V81.4215L30.3%2078.9354C33.0969%2078.4692%2059.6677%2084.3738%2062.1538%2084.3738C63.7077%2084.3738%2065.4169%2083.9077%2066.8154%2082.82C66.9708%2082.6646%2093.6969%2061.9985%2096.96%2059.5123C101.777%2056.0938%2099.4462%2048.1692%2091.5215%2048.3246ZM81.1108%2052.9861V13.5185H88.4138V48.9462C86.5492%2049.5677%2083.1308%2051.7431%2081.1108%2052.9861ZM68.9908%2060.1338C68.3692%2059.5123%2067.5923%2059.0462%2066.66%2058.7354L41.0215%2049.5677C40.0892%2049.2569%2039.0015%2049.1015%2038.0692%2049.1015L78.0031%2015.2277V54.6954C75.6723%2056.2492%2072.72%2057.9585%2068.9908%2060.1338ZM21.2877%203.10769H88.4138V10.4108H21.2877V3.10769ZM75.3615%2013.5185L31.6985%2050.5V13.5185H75.3615ZM21.2877%2013.5185H28.5908V52.0538L21.2877%2054.54V13.5185ZM11.9646%2081.7323H3.10769V55.7831H11.9646V81.7323ZM95.0954%2057.0262C65.4169%2080.0231%2095.0954%2057.0262%2064.9508%2080.3338C63.7077%2081.1108%2062.3092%2081.4215%2060.7554%2080.9554C32.6308%2075.9831%2032.9415%2075.3615%2029.8338%2075.8277L15.0723%2078.3138V60.1338C17.5585%2059.3569%2029.6785%2055.0061%2036.5154%2052.6754C39.6231%2051.4323%2040.0892%2053.1415%2065.7277%2061.8431C66.9708%2062.3092%2067.7477%2063.2415%2068.2138%2064.3292C68.5246%2065.5723%2068.3692%2066.8154%2067.5923%2067.7477C66.5046%2069.3015%2064.4846%2069.7677%2062.9308%2068.9908L48.3246%2062.7754C47.5477%2062.4646%2046.6154%2062.7754%2046.3046%2063.5523C45.9938%2064.3292%2046.3046%2065.2615%2047.0815%2065.5723L61.6877%2071.7877C62.62%2072.2538%2063.5523%2072.4092%2064.4846%2072.4092C66.66%2072.4092%2068.8354%2071.3215%2070.0785%2069.4569C71.4769%2067.5923%2071.7877%2065.4169%2071.1662%2063.2415C71.1662%2063.0862%2071.0108%2062.7754%2070.8554%2062.62C88.5692%2052.0538%2089.8123%2050.3446%2093.8523%2051.5877C96.96%2052.8308%2096.96%2055.6277%2095.0954%2057.0262Z'%20fill='white'/%3e%3cpath%20d='M37.4477%2017.8692H40.5554V20.9769H37.4477V17.8692Z'%20fill='white'/%3e%3cpath%20d='M69.1462%2047.8585H72.2538V50.9662H69.1462V47.8585Z'%20fill='white'/%3e%3c/svg%3e";
const CostEffective = "/assets/Cost-Effective-ut4C7ObH.svg";
const Robust = "/assets/Robust-H3jNOAqJ.svg";
const CustomsProcessingSupport = "/assets/CustomsProcessingSupport-grr0okOF.svg";
function Advantage() {
  useEffect(() => {
    let scroll_tl = gsap.timeline({
      // scrollTrigger: {
      //     trigger: '.factsContainer',
      //     start: "top center",
      //     // pin: true,
      //     scrub: true,
      //     end: "+=300",
      //     // markers: true,
      // }
    }), facts = [...document.querySelectorAll(".fact")];
    scroll_tl.to(".factsContainer h2", {
      // scale: 1.5,
      duration: 0.5,
      ease: "ease"
    });
    scroll_tl.to(facts, {
      xPercent: -45 * (facts.length - 1),
      scrollTrigger: {
        trigger: ".factsContainer_sm",
        start: "20% 62%",
        pin: true,
        // horizontal: true,
        pinSpacing: true,
        // markers: true,
        scrub: 1.5,
        // snap: 1 / (facts.length - 1),
        // base vertical scrolling on how wide the container is so it feels more natural.
        // end: () => `+=${smallFactsContainer.offsetWidth}`
        end: () => `+=4320`
      }
    });
    var isInViewport = function(elem) {
      var distance = elem.getBoundingClientRect();
      return distance.top >= 0 && distance.left >= 0 && distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) && distance.right <= (window.innerWidth || document.documentElement.clientWidth);
    };
    var findMe = document.querySelectorAll(".animte");
    document.querySelectorAll(".fact");
    window.addEventListener(
      "scroll",
      function(event) {
        findMe.forEach((element) => {
          if (isInViewport(element)) {
            element.classList.add("animt");
          }
        });
      },
      false
    );
    AOS.init();
    new Swiper(".adva-sldr", {
      navigation: {
        nextEl: ".adva-swiper-button-next",
        prevEl: ".adva-swiper-button-prev"
      },
      slidesPerView: 2,
      spaceBetween: 40,
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
    let lastScrollTop = 0;
    window.addEventListener("scroll", function() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let parallaxContainer = document.querySelector(".advantg-sec");
      let parallaxSpeed = 0.8;
      let scrollDirection = scrollTop > lastScrollTop ? "down" : "up";
      let scrollPosition = Math.abs(scrollTop - lastScrollTop);
      if (scrollDirection === "down") {
        parallaxContainer.style.backgroundPositionY = `calc(5% + ${scrollPosition * parallaxSpeed}px)`;
      } else {
        parallaxContainer.style.backgroundPositionY = `calc(5% - ${scrollPosition * parallaxSpeed}px)`;
      }
      lastScrollTop = scrollTop;
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "advantg-sec section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container", id: "parallax-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "mrsTtl-dv", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "svg-dv",
          "data-aos": "fade-in",
          "data-aos-duration": "500",
          "data-aos-once": "true",
          "data-aos-delay": "200",
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "",
              xmlns: "http://www.w3.org/2000/svg",
              width: "412",
              height: "139",
              viewBox: "0 0 412 139",
              fill: "none",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M106.734 136.337H107.158L107.227 135.918L120.172 57.3816H120.512L120.512 135.837V136.337H121.012H164.029H164.529V135.837V3.52368V3.02368L164.029 3.02368L98.4198 3.02368H97.9906L97.9255 3.44783L84.2205 92.7382L69.0904 3.44016L69.0198 3.02368H68.5974L1 3.02368H0.5L0.5 3.52368L0.5 135.837V136.337H1H44.0165H44.5165V135.837L44.5165 57.2302L60.3353 135.935L60.416 136.337H60.8255H106.734ZM221.177 135.837V89.8289H224.859L243.529 136.024L243.656 136.337H243.993H292.07H292.839L292.527 135.634L269.039 82.7019C286.451 73.3294 288.594 56.6552 288.594 44.9842C288.594 33.1745 285.222 22.666 277.602 15.111C269.98 7.55552 258.179 3.02368 241.463 3.02368L174.95 3.02368H174.45V3.52368V135.837V136.337H174.95H220.677H221.177V135.837ZM409.9 38.6277L410.447 38.5384L410.302 38.0029C406.839 25.2781 400.083 15.8866 390.549 9.68417C381.024 3.48752 368.766 0.5 354.332 0.5C335.555 0.5 320.212 4.84156 309.549 12.7435C298.87 20.6573 292.922 32.1182 292.922 46.2461C292.922 61.8257 299.241 71.1755 308.124 77.0818C316.963 82.9589 328.311 85.4054 338.334 87.2966L338.335 87.2969C340.926 87.7754 343.413 88.1756 345.742 88.5505C346.71 88.7062 347.65 88.8575 348.559 89.0082C351.668 89.5236 354.416 90.0323 356.701 90.6883C358.993 91.3461 360.766 92.1378 361.963 93.1887C363.135 94.219 363.772 95.5136 363.772 97.2605C363.772 99.3556 362.945 100.77 361.537 101.686C360.095 102.624 357.994 103.07 355.416 103.07C349.653 103.07 345.564 101.305 342.651 98.9239C339.73 96.5362 337.964 93.5054 336.9 90.94L336.752 90.5831L336.369 90.6364L288.473 97.3061L287.931 97.3815L288.055 97.9143C291.153 111.274 297.863 121.443 308.584 128.26C319.29 135.067 333.945 138.5 352.886 138.5C368.495 138.5 382.891 134.971 393.398 127.203C403.926 119.419 410.5 107.413 410.5 90.5908C410.5 82.7219 408.835 76.5046 406.003 71.5502C403.172 66.5961 399.19 62.9337 394.603 60.1495C385.779 54.7945 374.659 52.6638 365.068 50.826C364.712 50.7577 364.357 50.6898 364.005 50.6221L364.001 50.6214C358.112 49.5371 352.886 48.5091 349.13 46.891C347.256 46.0839 345.788 45.1458 344.791 44.0143C343.805 42.8949 343.264 41.5695 343.264 39.9368C343.264 38.1246 344.036 36.8389 345.342 35.9838C346.676 35.1109 348.6 34.6684 350.897 34.6684C357.238 34.6684 361.101 40.1389 362.891 45.8548L363.021 46.2685L363.449 46.1987L409.9 38.6277ZM227.184 56.5618H221.177V38.8145H230.257C235.17 38.8145 237.949 39.8857 239.508 41.4199C241.061 42.9485 241.505 45.0369 241.505 47.3276C241.505 49.4676 241.067 51.086 240.328 52.3176C239.59 53.5468 238.53 54.4267 237.224 55.0567C234.583 56.3307 230.986 56.5618 227.184 56.5618Z",
                  stroke: "white"
                }
              )
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "adv-hdng-clm", children: [
        /* @__PURE__ */ jsxs("h2", { className: "ttl-60px uppercase white power-ttl js-split-text", children: [
          "Powerhouse",
          /* @__PURE__ */ jsx("br", {}),
          " Advantage"
        ] }),
        /* @__PURE__ */ jsxs(
          "h4",
          {
            className: "white",
            "data-aos": "fade-up",
            "data-aos-duration": "400",
            "data-aos-once": "true",
            children: [
              "Opting for MRS Supply Chain ",
              /* @__PURE__ */ jsx("br", {}),
              " Solutions Near to Ports"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "swiper adva-sldr",
        "data-aos": "fade-in",
        "data-aos-duration": "500",
        "data-aos-once": "true",
        "data-aos-delay": "400",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
            /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "adv-box-innr", children: [
              /* @__PURE__ */ jsx("img", { src: Proximity_Hazira, alt: "Proximity_Hazira" }),
              /* @__PURE__ */ jsx("h3", { children: "Establishing Presence in Key Indian Ports" }),
              /* @__PURE__ */ jsx("p", { children: "Presence in Kandla Port, Mundra Port, Navasheva Port, Pipava Port & Chennai Port. We have staff support in Key ports of India, you can rely on our efficiency for smooth operations." })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "adv-box-innr orange-gradient", children: [
              /* @__PURE__ */ jsx("img", { src: Certifications, alt: "Certifications" }),
              /* @__PURE__ */ jsx("h3", { children: "⁠⁠Certifications for Material Handling" }),
              /* @__PURE__ */ jsx("p", { children: "Expertise in Material Handling Haz & Non Haz Cargo, ODC Cargo and Project cargo" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "adv-box-innr", children: [
              /* @__PURE__ */ jsx("img", { src: CostEffective, alt: "ICON_CostEffective" }),
              /* @__PURE__ */ jsx("h3", { children: "Cost-Effective Solutions" }),
              /* @__PURE__ */ jsx("p", { children: "Clear, competitive pricing without hidden fees for better budget management." })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "adv-box-innr orange-gradient", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: CustomsProcessingSupport,
                  alt: "CustomsProcessingSupport"
                }
              ),
              /* @__PURE__ */ jsx("h3", { children: "Customs Processing Support" }),
              /* @__PURE__ */ jsx("p", { children: "Expedited customs clearance and strategic warehousing locations minimize delays." })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "adv-box-innr", children: [
              /* @__PURE__ */ jsx("img", { src: Robust, alt: "Robust" }),
              /* @__PURE__ */ jsx("h3", { children: "Robust Logistics Network" }),
              /* @__PURE__ */ jsx("p", { children: "Comprehensive logistics capabilities ensure smooth supply chain operations from start to finish." })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "adva-pegination-arrow",
              "data-aos": "fade-in",
              "data-aos-duration": "600",
              "data-aos-once": "true",
              "data-aos-delay": "300",
              children: [
                /* @__PURE__ */ jsx("div", { className: "adva-swiper-button-next cursor", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "41",
                    height: "41",
                    viewBox: "0 0 41 41",
                    fill: "none",
                    children: /* @__PURE__ */ jsxs("g", { opacity: "1", children: [
                      /* @__PURE__ */ jsx("path", { d: "M12 20H28", stroke: "#fff", strokeLinecap: "round" }),
                      /* @__PURE__ */ jsx(
                        "path",
                        {
                          d: "M21 12L29 20L21 28",
                          stroke: "#fff",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "circle",
                        {
                          cx: "20.5",
                          cy: "20.5",
                          r: "20",
                          transform: "matrix(-1 0 0 1 41 0)",
                          stroke: "#fff"
                        }
                      )
                    ] })
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "adva-swiper-button-prev cursor", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "41",
                    height: "41",
                    viewBox: "0 0 41 41",
                    fill: "none",
                    children: /* @__PURE__ */ jsxs("g", { opacity: "1", children: [
                      /* @__PURE__ */ jsx("path", { d: "M29 20H13", stroke: "#fff", strokeLinecap: "round" }),
                      /* @__PURE__ */ jsx(
                        "path",
                        {
                          d: "M20 12L12 20L20 28",
                          stroke: "#fff",
                          strokeLinecap: "round"
                        }
                      ),
                      /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", stroke: "#fff" })
                    ] })
                  }
                ) })
              ]
            }
          )
        ]
      }
    )
  ] }) }) });
}
function Header2() {
  const form_popup = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const nameinput_popup = React.useRef(null);
  const emailinput_popup = React.useRef(null);
  const phoneinput_popup = React.useRef(null);
  const departinput_popup = React.useRef(null);
  React.useRef(null);
  const handleFocus_pp = (e) => {
    e.target.classList.remove("error_line");
    let er11 = document.getElementById("nm_errP");
    er11.classList.remove("show_error");
    let er11v = document.getElementById("nm_errP1");
    er11v.classList.remove("show_error");
    let er22 = document.getElementById("eml_errP");
    er22.classList.remove("show_error");
    let er22v = document.getElementById("eml_errP1");
    er22v.classList.remove("show_error");
    let er33 = document.getElementById("cmp_errP");
    er33.classList.remove("show_error");
    let er55 = document.getElementById("depart_errP");
    er55.classList.remove("show_error");
    let er66 = document.getElementById("msg_errP");
    er66.classList.remove("show_error");
    let er66v = document.getElementById("msg_errP1");
    er66v.classList.remove("show_error");
  };
  const handleFocus_pp1 = (e) => {
    e.target.classList.remove("error_line");
    let er44 = document.getElementById("phn_errP");
    er44.classList.remove("show_error");
    let er44v = document.getElementById("phn_errP1");
    er44v.classList.remove("show_error");
  };
  const sendEmail1 = async (e) => {
    e.preventDefault();
    let name_fld_popup = nameinput_popup.current.value;
    let email_fld_popup = emailinput_popup.current.value;
    let phone_fld_popup = phoneinput_popup.current.value;
    let dprt_fld_popup = departinput_popup.current.value;
    let phone_fltr = document.getElementById("phone_fld_popup");
    var mob_regx = /^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var alpha_allwd = /^[A-Za-z ]+$/;
    if (name_fld_popup == "") {
      let v1 = document.getElementById("name_fld_popup");
      v1.className += " error_line";
      let er11 = document.getElementById("nm_errP");
      er11.className += " show_error";
    } else if (!name_fld_popup.match(alpha_allwd)) {
      let v1 = document.getElementById("name_fld_popup");
      v1.className += " error_line";
      let er11v = document.getElementById("nm_errP1");
      er11v.className += " show_error";
    } else if (email_fld_popup == "") {
      let v2 = document.getElementById("email_fld_popup");
      v2.className += " error_line";
      let er22 = document.getElementById("eml_errP");
      er22.className += " show_error";
    } else if (!email_fld_popup.match(mailformat)) {
      let v2 = document.getElementById("email_fld_popup");
      v2.className += " error_line";
      let er22v = document.getElementById("eml_errP1");
      er22v.className += " show_error";
    } else if (phone_fld_popup == "") {
      let v4 = document.getElementById("phone_fld_popup");
      v4.className += " error_line";
      let er44 = document.getElementById("phn_errP");
      er44.className += " show_error";
    } else if (!mob_regx.test(phone_fltr.value)) {
      let v4 = document.getElementById("phone_fld_popup");
      v4.className += " error_line";
      let er44 = document.getElementById("phn_errP1");
      er44.className += " show_error";
    } else if (dprt_fld_popup == "") {
      let v5 = document.getElementById("dprt_fld_popup");
      v5.className += " error_line";
      let er55 = document.getElementById("depart_errP");
      er55.className += " show_error";
    } else {
      fetch(
        "https://script.google.com/macros/s/AKfycbwOP9_uQMoUzUQMbgzEzHir-fhe5FLJACsEfhFfWGxhXnpmfZTvZF-5lcFLuFRMeUni/exec",
        {
          method: "POST",
          body: new FormData(form_popup.current)
        }
      ).then((res) => {
        console.log("SUCCESSFULLY SUBMITTED");
        setLoading(false);
      }).catch((err) => console.log(err));
      emailjs.sendForm(
        "service_7xurfxj",
        "template_u6s227l",
        e.target,
        "SsPYHKCapw4h-xBn_"
      ).then(
        (result) => {
          console.log(result.text);
          setStatusMessage("Your Message has been sent successfully");
          let bx = document.getElementById("thnk_boxP");
          bx.className += " thnk_show";
          let frm_bx = document.getElementById("popup_form_bx");
          frm_bx.className += " form_hide";
        },
        (error) => {
          console.log(error.text);
          setStatusMessage(`${error.text} happened`);
        }
      );
      e.target.reset();
    }
  };
  useEffect(() => {
    $$1(window).scroll(function() {
      if ($$1(this).scrollTop() > 50) {
        $$1(".mob-menu").addClass("hdr-scroll");
      } else {
        $$1(".mob-menu").removeClass("hdr-scroll");
      }
    });
    $$1(".enquire_btn").on("click", function() {
      $$1(".career_popup_box").fadeIn();
      $$1(".carrer_overlay").fadeIn();
      $$1("body").css("overflow", "hidden");
    });
    $$1(".career_cls_btn").on("click", function() {
      $$1(".career_popup_box").fadeOut();
      $$1(".carrer_overlay").fadeOut();
      $$1("body").css("overflow", "auto");
    });
    (function() {
      $$1(".has-children").off("click").on("click", function() {
        var $children = $$1(this).children("ul");
        $$1(".has-children").not(this).children("ul").slideUp("slow", "swing");
        $$1(".has-children").not(this).find(".icon-arrow").removeClass("open");
        $children.slideToggle("slow", "swing");
        $$1(this).find(".icon-arrow").toggleClass("open");
      });
      $$1(".has-sub-children").off("click").on("click", function(e) {
        e.stopPropagation();
        var $subChildren = $$1(this).children(".sub-children");
        $$1(".has-sub-children").not(this).children(".sub-children").slideUp("slow", "swing");
        $$1(".has-sub-children").not(this).find(".sub-icon-arrow").removeClass("open");
        $subChildren.slideToggle("slow", "swing");
        $$1(this).find(".sub-icon-arrow").toggleClass("open");
      });
    })();
    $$1(".park_drp").mouseenter(function(e) {
      $$1(".solution_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".explore_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".esg_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".menu_animate_box").removeClass("submenu_animation");
      $$1(this).find(".megamenu").addClass("open_megamenu");
      $$1(".hdr_container").removeClass("show_header_bg2");
      $$1(".hdr_container").addClass("show_header_bg1");
      $$1(".park_drp .menu_animate_box").addClass("submenu_animation");
      $$1(this).toggleClass("add_black");
      e.stopPropagation();
    });
    $$1(".prk_menu2").mouseenter(function(e) {
      $$1(".hdr_container").removeClass("show_header_bg1");
      $$1(".hdr_container").addClass("show_header_bg_sticky2");
    });
    $$1(".park_drp").mouseleave(function(e) {
      $$1(".megamenu").removeClass("open_megamenu");
      $$1(".hdr_container").removeClass("show_header_bg1");
      $$1(".hdr_container").removeClass("show_header_bg2");
      $$1(".dropdown").removeClass("add_black");
      $$1(".dropdown").append(
        "<style>.dropdown a::after{right:2px !important;}</style>"
      );
    });
    $$1(".prk_menu2").mouseleave(function(e) {
      $$1(".hdr_container").removeClass("show_header_bg_sticky2");
    });
    $$1(".solution_drp").mouseenter(function(e) {
      $$1(".park_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".explore_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".esg_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".park_drp").removeClass("add_black");
      $$1(".explore_drp").removeClass("add_black");
      $$1(".esg_drp").removeClass("add_black");
      $$1(".menu_animate_box").removeClass("submenu_animation");
      $$1(this).find(".megamenu").addClass("open_megamenu");
      $$1(".hdr_container").removeClass("show_header_bg2");
      $$1(".hdr_container").addClass("show_header_bg1");
      $$1(".solution_drp .menu_animate_box").addClass("submenu_animation");
      $$1(this).toggleClass("add_black");
      e.stopPropagation();
    });
    $$1(".solu_menu2").mouseenter(function(e) {
      $$1(".hdr_container").removeClass("show_header_bg1");
      $$1(".hdr_container").addClass("show_header_bg_sticky2");
    });
    $$1(".solution_drp").mouseleave(function(e) {
      $$1(".megamenu").removeClass("open_megamenu");
      $$1(".hdr_container").removeClass("show_header_bg1");
      $$1(".hdr_container").removeClass("show_header_bg2");
      $$1(".dropdown").removeClass("add_black");
    });
    $$1(".solu_menu2").mouseleave(function(e) {
      $$1(".hdr_container").removeClass("show_header_bg_sticky2");
    });
    $$1(".explore_drp").mouseenter(function(e) {
      $$1(".park_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".solution_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".esg_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".park_drp").removeClass("add_black");
      $$1(".solution_drp").removeClass("add_black");
      $$1(".esg_drp").removeClass("add_black");
      $$1(".menu_animate_box").removeClass("submenu_animation");
      $$1(this).find(".megamenu").addClass("open_megamenu");
      $$1(".hdr_container").removeClass("show_header_bg2");
      $$1(".hdr_container").addClass("show_header_bg1");
      $$1(".explore_drp .menu_animate_box").addClass("submenu_animation");
      $$1(this).toggleClass("add_black");
      e.stopPropagation();
    });
    $$1(".explo_menu2").mouseenter(function(e) {
      $$1(".hdr_container").removeClass("show_header_bg1");
      $$1(".hdr_container").addClass("show_header_bg_sticky2");
    });
    $$1(".explore_drp").mouseleave(function(e) {
      $$1(".megamenu").removeClass("open_megamenu");
      $$1(".hdr_container").removeClass("show_header_bg1");
      $$1(".hdr_container").removeClass("show_header_bg2");
      $$1(".dropdown").removeClass("add_black");
    });
    $$1(".explo_menu2").mouseleave(function(e) {
      $$1(".hdr_container").removeClass("show_header_bg_sticky2");
    });
    $$1(".esg_drp").mouseenter(function(e) {
      $$1(".park_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".solution_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".explore_drp").find(".megamenu").removeClass("open_megamenu");
      $$1(".park_drp").removeClass("add_black");
      $$1(".solution_drp").removeClass("add_black");
      $$1(".explore_drp").removeClass("add_black");
      $$1(".menu_animate_box").removeClass("submenu_animation");
      $$1(this).find(".megamenu").addClass("open_megamenu");
      $$1(".hdr_container").removeClass("show_header_bg1");
      $$1(".hdr_container").addClass("show_header_bg2");
      $$1(".esg_drp .menu_animate_box").addClass("submenu_animation");
      $$1(this).toggleClass("add_black");
      e.stopPropagation();
    });
    $$1(".esg_drp").mouseleave(function(e) {
      $$1(".megamenu").removeClass("open_megamenu");
      $$1(".hdr_container").removeClass("show_header_bg1");
      $$1(".hdr_container").removeClass("show_header_bg2");
      $$1(".dropdown").removeClass("add_black");
    });
    $$1(".contact_link").mouseenter(function(e) {
      $$1(".megamenu").removeClass("open_megamenu");
      $$1(".hdr_container").removeClass("show_header_bg1");
      $$1(".hdr_container").removeClass("show_header_bg2");
      $$1(".dropdown").removeClass("add_black");
      e.stopPropagation();
    });
    $$1(".contact_link").mouseleave(function(e) {
      $$1(".megamenu").removeClass("open_megamenu");
      $$1(".hdr_container").removeClass("show_header_bg1");
      $$1(".hdr_container").removeClass("show_header_bg2");
      $$1(".dropdown").removeClass("add_black");
    });
    $$1(".dropdown").on("click", function(e) {
      $$1(".dropdown").find("a.dropdown-toggle.nav-link").css("padding-left", "2px");
      $$1(".dropdown").find("a::after").css("right", "2px");
      $$1(".dropdown").css("background-color", "transparent");
    });
    $$1(".srvc-menu").mouseenter(function(e) {
      $$1(".srvc-lnk").addClass("chnag-color");
    });
    $$1(".srvc-menu").mouseleave(function(e) {
      $$1(".srvc-lnk").removeClass("chnag-color");
    });
    $$1(".sctr-menu").mouseenter(function(e) {
      $$1(".sctr-lnk").addClass("chnag-color");
    });
    $$1(".sctr-menu").mouseleave(function(e) {
      $$1(".sctr-lnk").removeClass("chnag-color");
    });
    $$1(".mob_menu_btn").on("click", function() {
      $$1(".mobile_nav").addClass("open_mob_nav");
    });
    $$1(".close_mob_nav").on("click", function() {
      $$1(".mobile_nav").removeClass("open_mob_nav");
    });
    $$1(".anchr_btn").on("click", function() {
      $$1(".mobile_nav").removeClass("open_mob_nav");
    });
    if ($$1(window).width() > 1023) {
      var prevScrollpos = window.pageYOffset;
      window.onscroll = function() {
        var header = document.getElementById("desk_header");
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          header.style.display = "block";
        } else {
          header.style.display = "none";
        }
        prevScrollpos = currentScrollPos;
      };
      $$1(window).on("scroll", function() {
        var sticky = $$1("#desk_header"), scroll = $$1(window).scrollTop();
        if (scroll <= 450) {
          sticky.hide();
        }
      });
    }
    if ($$1(window).width() < 1023) {
      var prevScrollpos = window.pageYOffset;
      window.onscroll = function() {
        var header = document.getElementById("desk_header_1");
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          header.classList.add("fixed");
        } else {
          header.classList.remove("fixed");
        }
        prevScrollpos = currentScrollPos;
      };
      $$1(window).on("scroll", function() {
        var sticky = $$1(".desktop_header1"), scroll = $$1(window).scrollTop();
        if (scroll == 0) {
          sticky.removeClass("fixed");
        }
      });
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "header_sec snap_sec desktop_header1",
        id: "desk_header_1",
        "data-aos": "fade-in",
        "data-aos-delay": "400",
        "data-aos-once": "true",
        children: /* @__PURE__ */ jsx("div", { className: "hdr_container", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 no-padding flex", children: [
          /* @__PURE__ */ jsx("div", { className: "clm-2 hdr-clm1", children: /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx("img", { src: MRS_Logo, alt: "MRS_Logo" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "clm-2 hdr-clm2", children: /* @__PURE__ */ jsx("div", { className: "desk_menu_row", children: /* @__PURE__ */ jsx("div", { className: "zero_padding", children: /* @__PURE__ */ jsx("nav", { className: "navbar navbar-expand-lg navbar-dark", children: /* @__PURE__ */ jsx("div", { className: "container-fluid no_padding", children: /* @__PURE__ */ jsx("div", { className: "collapse navbar-collapse", id: "main_nav", children: /* @__PURE__ */ jsxs("ul", { className: "navbar-nav", children: [
            /* @__PURE__ */ jsx("li", { className: "nav-item menu_link no_LR_margin contact_link", children: /* @__PURE__ */ jsxs("a", { className: "nav-link", href: "/about", children: [
              " ",
              "About Us",
              " "
            ] }) }),
            /* @__PURE__ */ jsxs("li", { className: "nav-item dropdown has-megamenu menu_link explore_drp", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  className: "nav-link dropdown-toggle srvc-lnk",
                  "data-bs-toggle": "dropdown",
                  "data-bs-hover": "dropdown",
                  children: [
                    " ",
                    "Services"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "dropdown-menu megamenu srvc-menu",
                  role: "menu",
                  children: /* @__PURE__ */ jsxs("div", { className: "row_border", children: [
                    /* @__PURE__ */ jsx("div", { className: "over_flow", children: /* @__PURE__ */ jsxs("div", { className: "col-megamenu menu_animate_box animi_bx1", children: [
                      /* @__PURE__ */ jsx("h5", { children: "End-to-End Supply Chain Management" }),
                      /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
                        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/multiuser-warehousing", children: "Warehousing Solutions" }) }),
                        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/pioneering-duty-free-warehousing-solutions", children: "Free Trade Zone" }) }),
                        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/road-and-rail-transport", children: "Surface & Rail Transport" }) })
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsx("div", { className: "over_flow", children: /* @__PURE__ */ jsxs("div", { className: "col-megamenu menu_animate_box animi_bx2", children: [
                      /* @__PURE__ */ jsx("h5", { children: "Regulatory Compliance and Documentation" }),
                      /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
                        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/customs-brokerage-and-regulatory-compliance", children: "Customs Brokerage" }) }),
                        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/customs-brokerage-and-regulatory-compliance#foreign", children: "Customs & Foreign Trade Compliance" }) }),
                        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/import-management", children: "Import Management" }) })
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsx("div", { className: "over_flow", children: /* @__PURE__ */ jsxs("div", { className: "col-megamenu menu_animate_box animi_bx3", children: [
                      /* @__PURE__ */ jsx("h5", { children: "Innovative Logistics and Industrial Solutions" }),
                      /* @__PURE__ */ jsx("ul", { className: "list-unstyled", children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/tech-driven-last-mile-delivery-services", children: "Tech-Driven Last-Mile Delivery" }) }) })
                    ] }) })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "nav-item dropdown has-megamenu menu_link esg_drp", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  className: "nav-link dropdown-toggle sctr-lnk",
                  "data-bs-toggle": "dropdown",
                  "data-bs-hover": "dropdown",
                  children: [
                    " ",
                    "Sectors",
                    " "
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "dropdown-menu megamenu sctr-menu",
                  role: "menu",
                  children: /* @__PURE__ */ jsxs("div", { className: "row_border esg_menus", children: [
                    /* @__PURE__ */ jsx("div", { className: "over_flow", children: /* @__PURE__ */ jsx("div", { className: "col-megamenu menu_animate_box animi_bx1", children: /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/manufacturing-automotive-technology-and-consumer-goods", children: "Manufacturing, Automotive, Technology, and Consumer Goods" }) }),
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/industrial-sector", children: "Industrial Sector" }) })
                    ] }) }) }),
                    /* @__PURE__ */ jsx("div", { className: "over_flow", children: /* @__PURE__ */ jsx("div", { className: "col-megamenu menu_animate_box animi_bx2", children: /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/renewable-energy-and-infrastructure-projects", children: "Renewable Energy and Infrastructure Projects" }) }),
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/arts-exhibitions-and-luxury-Goods", children: "Arts, Exhibitions, and Luxury Goods" }) })
                    ] }) }) }),
                    /* @__PURE__ */ jsx("div", { className: "over_flow", children: /* @__PURE__ */ jsx("div", { className: "col-megamenu menu_animate_box animi_bx3", children: /* @__PURE__ */ jsxs("ul", { className: "list-unstyled", children: [
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/chemicals-construction-energy-and-agriculture", children: "Chemicals, Construction, Energy, and Agriculture" }) }),
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/e-commerce-and-retail", children: "E-commerce and Retail" }) })
                    ] }) }) })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("li", { className: "nav-item menu_link no_LR_margin contact_link", children: /* @__PURE__ */ jsxs("a", { className: "nav-link", href: "/careers", children: [
              " ",
              "Career",
              " "
            ] }) }),
            /* @__PURE__ */ jsx("li", { className: "nav-item menu_link no_LR_margin contact_link", children: /* @__PURE__ */ jsxs("a", { className: "nav-link", href: "/blog", children: [
              " ",
              "Blog",
              " "
            ] }) }),
            /* @__PURE__ */ jsx("li", { className: "nav-item menu_link no_LR_margin contact_link", children: /* @__PURE__ */ jsxs("a", { className: "nav-link", href: "/contact-us", children: [
              " ",
              "Contact Us",
              " "
            ] }) })
          ] }) }) }) }) }) }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "section hdr-sec mob-menu", children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: "main-container width-1250 flex head-container",
        "data-aos": "fade-in",
        "data-aos-duration": "500",
        "data-aos-once": "true",
        children: [
          /* @__PURE__ */ jsx("div", { className: "clm-2 mob-clm1", children: /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx("img", { src: MRS_Logo, alt: "MRS_Logo" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "clm-2 mob-clm2", children: /* @__PURE__ */ jsx("nav", { role: "navigation", children: /* @__PURE__ */ jsxs("div", { id: "menuToggle", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox" }),
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsxs("ul", { id: "menu", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/", children: "Home" }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/about", children: "About" }) }),
              /* @__PURE__ */ jsxs("li", { className: "has-children", children: [
                /* @__PURE__ */ jsxs("a", { children: [
                  "Services ",
                  /* @__PURE__ */ jsx("img", { src: Sub_menu, className: "icon-arrow" })
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "children", children: [
                  /* @__PURE__ */ jsxs("li", { className: "has-sub-children", children: [
                    /* @__PURE__ */ jsxs("a", { children: [
                      "End-to-End Supply Chain Management",
                      " ",
                      /* @__PURE__ */ jsx("img", { src: Sub_menu, className: "sub-icon-arrow" })
                    ] }),
                    /* @__PURE__ */ jsxs("ul", { className: "sub-children", children: [
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/multiuser-warehousing", children: "Warehousing Solutions" }) }),
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/pioneering-duty-free-warehousing-solutions", children: "Free Trade Zone" }) }),
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/road-and-rail-transport", children: "Surface & Rail Transport" }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "has-sub-children", children: [
                    /* @__PURE__ */ jsxs("a", { children: [
                      "Regulatory Compliance and Documentation",
                      " ",
                      /* @__PURE__ */ jsx("img", { src: Sub_menu, className: "sub-icon-arrow" })
                    ] }),
                    /* @__PURE__ */ jsxs("ul", { className: "sub-children", children: [
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/customs-brokerage-and-regulatory-compliance", children: "Customs Brokerage and Regulatory Compliance" }) }),
                      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/customs-brokerage-and-regulatory-compliance#foreign", children: "Customs & Foreign Trade Compliance" }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "has-sub-children", children: [
                    /* @__PURE__ */ jsxs("a", { children: [
                      "Innovative Logistics and Industrial Solutions",
                      " ",
                      /* @__PURE__ */ jsx("img", { src: Sub_menu, className: "sub-icon-arrow" })
                    ] }),
                    /* @__PURE__ */ jsx("ul", { className: "sub-children", children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/tech-driven-last-mile-delivery-services", children: "Tech-Driven Last-Mile Delivery Services" }) }) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "has-children", children: [
                /* @__PURE__ */ jsxs("a", { children: [
                  "Sector ",
                  /* @__PURE__ */ jsx("img", { src: Sub_menu, className: "icon-arrow" })
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "children", children: [
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/arts-exhibitions-and-luxury-Goods", children: "Arts, Exhibitions, and Luxury Goods" }) }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/industrial-sector", children: "Industrial Sector" }) }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/e-commerce-and-retail", children: "E-commerce and Retail" }) }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/chemicals-construction-energy-and-agriculture", children: "Chemicals, Construction, Energy, and Agriculture" }) }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/manufacturing-automotive-technology-and-consumer-goods", children: "Manufacturing, Automotive, Technology, and Consumer Goods" }) }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/sector/renewable-energy-and-infrastructure-projects", children: "Renewable Energy and Infrastructure Projects" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/careers", children: "Careers" }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/blog", children: "Blog" }) }),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/contact-us", children: "Contact Us" }) })
            ] })
          ] }) }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "carrer_overlay" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "career_popup_box",
        "data-aos": "fade-in",
        "data-aos-delay": "400",
        "data-aos-once": "true",
        children: [
          /* @__PURE__ */ jsx("img", { className: "career_cls_btn", src: Close_icon }),
          /* @__PURE__ */ jsxs("div", { className: "caeer_inner_dv", children: [
            /* @__PURE__ */ jsx("h2", { className: "career_hd", children: "Connect us" }),
            /* @__PURE__ */ jsxs(
              "form",
              {
                className: "conversion_form",
                ref: form_popup,
                onSubmit: sendEmail1,
                id: "popup_form_bx",
                "data-aos": "fade-in",
                "data-aos-duration": "500",
                "data-aos-delay": "400",
                "data-aos-once": "true",
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      className: "page_name",
                      type: "hidden",
                      name: "Page_name",
                      value: "Contact Page"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label conv_frm_label", children: "Name" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        name: "name",
                        className: "form-control",
                        placeholder: "Name",
                        id: "name_fld_popup",
                        ref: nameinput_popup,
                        onFocus: handleFocus_pp
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "error_msg", id: "nm_errP", children: "Please Enter Name" }),
                    /* @__PURE__ */ jsx("p", { className: "error_msg", id: "nm_errP1", children: "Letters and space only." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label", children: "Email Address" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "email",
                        name: "email",
                        className: "form-control",
                        placeholder: "Email",
                        id: "email_fld_popup",
                        ref: emailinput_popup,
                        onFocus: handleFocus_pp
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "error_msg", id: "eml_errP", children: "Please Enter Email Address" }),
                    /* @__PURE__ */ jsx("p", { className: "error_msg", id: "eml_errP1", children: "Please Enter Valid Email Address" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label", children: "Phone No" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        name: "phone",
                        className: "form-control",
                        placeholder: "Phone",
                        id: "phone_fld_popup",
                        ref: phoneinput_popup,
                        onFocus: handleFocus_pp1
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "error_msg", id: "phn_errP", children: "Please Enter Phone No" }),
                    /* @__PURE__ */ jsx("p", { className: "error_msg", id: "phn_errP1", children: "Please Enter Valid Phone No" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc selectin-fld", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label", children: "Type of Enquiry" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        className: "form-control enq_type cont_enq",
                        name: "enquiry",
                        id: "dprt_fld_popup",
                        ref: departinput_popup,
                        onFocus: handleFocus_pp,
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", disabled: true, selected: true, children: "You are interrested in" }),
                          /* @__PURE__ */ jsx("option", { value: "Built To Suit Warehousing", children: "End-to-End Supply Chain Management" }),
                          /* @__PURE__ */ jsx("option", { value: "Multiuser Warehousing", children: "Regulatory Compliance and Documentation" }),
                          /* @__PURE__ */ jsx("option", { value: "Customs Bonded Warehouse", children: "Innovative Logistics and Industrial Solutions" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "error_msg", id: "depart_errP", children: "Please Select Type of Enquiry" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "col-6 btn_col", children: /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "submit",
                      className: "btn btn-primary conv_btn cont_form_btn",
                      value: "Submit"
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "thnk txt_wht white", id: "thnk_boxP", children: "Your form has been sent successfully" })
          ] })
        ]
      }
    )
  ] });
}
const warehousing_cont = "/assets/Warehousing_big-oWBPlPk3.svg";
const trade_zone_bg = "/assets/trade_zone_big-VeOugL_t.svg";
const transport_big = "/assets/transport_big-MOHvG3hf.svg";
const borker_big = "data:image/svg+xml,%3csvg%20width='143'%20height='143'%20viewBox='0%200%20143%20143'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask0_3254_5919'%20style='mask-type:alpha'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='143'%20height='143'%3e%3cpath%20d='M114.352%2097.055V125.683H19.3915V2.79297H89.2154L114.352%2027.9296V43.9894'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M112.955%2027.9277H89.2155V4.1875'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M99.8281%20127.079V140.206H4.86758V13.8125H17.995'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M44.6664%2030.375H63.9407'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M31.9598%2057.9531H90.0533'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M31.9598%2070.5234H61.0067'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M31.9598%2083.0898H78.0033'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M66.8718%2095.6602H78.0031'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M66.8718%20108.227H101.784'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M50.8123%2095.6602L38.244%20108.229L31.9598%20101.945'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M96.8559%2083.0898H131.849C135.305%2083.0898%20138.133%2085.9177%20138.133%2089.374V95.6582H90.5717V89.374C90.5717%2085.9174%2093.3996%2083.0898%2096.8559%2083.0898Z'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M106.79%2082.3869L104.577%2055.1621C104.135%2049.7287%20109.15%2045.3867%20114.352%2045.3867C119.729%2045.3867%20124.563%2049.8035%20124.127%2055.1621L121.914%2082.3866'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M76.6473%2015.3594H31.9598V45.3838H76.6473V15.3594Z'%20stroke='black'%20stroke-width='3'%20stroke-miterlimit='22.9256'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_3254_5919)'%3e%3crect%20x='-19'%20y='-7'%20width='174'%20height='174'%20fill='url(%23paint0_linear_3254_5919)'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_3254_5919'%20x1='-19'%20y1='-7'%20x2='158'%20y2='171.5'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%231788D6'/%3e%3cstop%20offset='1'%20stop-color='%23E48A36'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
const custom_trade_big = "/assets/custom_trade_big-YnZdurv9.svg";
const lastTech = "/assets/lastTech-FnFXOpwf.svg";
function HomeSolution2() {
  useEffect(() => {
    $(document).ready(function() {
      $(".servc-link").click(function() {
        $(".servc-link").removeClass("active");
        $(this).addClass("active");
        var targetId = $(this).data("target");
        $(".solution-contnt-clm > .srvc-cont").not("#" + targetId).fadeOut();
        $("#" + targetId).fadeIn();
      });
    });
    $(".accordion-list > li > .answer").hide();
    $(".accordion-list > li > h3").off("click").on("click", function() {
      const listItem = $(this).parent();
      if (listItem.hasClass("active")) {
        listItem.removeClass("active").find(".answer").slideUp();
      } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        listItem.addClass("active").find(".answer").slideDown();
      }
      return false;
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "section solution-sec section-padd-LR", id: "solution", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200", children: [
    /* @__PURE__ */ jsxs("div", { className: "soltn-inner-container", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 soltn-clm1", children: /* @__PURE__ */ jsxs("h2", { className: "white js-split-text", children: [
        "Solutions ",
        /* @__PURE__ */ jsx("br", {}),
        "We Offer "
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 soltn-clm2", children: /* @__PURE__ */ jsx("div", { className: "ovrflw-hdn", children: /* @__PURE__ */ jsx("p", { className: "", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "400", children: "Logistics solutions tailored to your business needs for seamless supply chain excellence." }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "row hm-solutuon-sec2", id: "solution-desk", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 solution-box-clm", children: /* @__PURE__ */ jsxs("div", { className: "solution-grid", children: [
        /* @__PURE__ */ jsx("div", { className: "servc-link active", id: "servc-link1", "data-target": "srvc-cont1", "data-aos": "fade-in", "data-aos-duration": "400", "data-aos-once": "true", "data-aos-delay": "", children: /* @__PURE__ */ jsx("h2", { className: "sol-btn1", children: "Warehousing" }) }),
        /* @__PURE__ */ jsx("div", { className: "servc-link", id: "servc-link2", "data-target": "srvc-cont2", "data-aos": "fade-in", "data-aos-duration": "400", "data-aos-once": "true", "data-aos-delay": "", children: /* @__PURE__ */ jsx("h2", { className: "sol-btn1", children: "Free Trade Zone" }) }),
        /* @__PURE__ */ jsx("div", { className: "servc-link", id: "servc-link3", "data-target": "srvc-cont3", "data-aos": "fade-in", "data-aos-duration": "400", "data-aos-once": "true", "data-aos-delay": "", children: /* @__PURE__ */ jsxs("h2", { className: "sol-btn1", children: [
          "Surface",
          /* @__PURE__ */ jsx("br", {}),
          " & Rail Transport "
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "servc-link", id: "servc-link4", "data-target": "srvc-cont4", "data-aos": "fade-in", "data-aos-duration": "400", "data-aos-once": "true", "data-aos-delay": "", children: /* @__PURE__ */ jsxs("h2", { className: "sol-btn1", children: [
          "Customs",
          /* @__PURE__ */ jsx("br", {}),
          " Brokerage"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "servc-link", id: "servc-link5", "data-target": "srvc-cont5", "data-aos": "fade-in", "data-aos-duration": "400", "data-aos-once": "true", "data-aos-delay": "", children: /* @__PURE__ */ jsx("h2", { className: "sol-btn1", children: "Customs and Foreign Trade Compliance" }) }),
        /* @__PURE__ */ jsx("div", { className: "servc-link", id: "servc-link6", "data-target": "srvc-cont6", "data-aos": "fade-in", "data-aos-duration": "400", "data-aos-once": "true", "data-aos-delay": "", children: /* @__PURE__ */ jsx("h2", { className: "sol-btn1", children: "Tech-Driven Last-Mile Delivery" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "clm-2 solution-contnt-clm", children: [
        /* @__PURE__ */ jsx("div", { id: "srvc-cont1", className: "srvc-cont", "data-aos": "fade-in", "data-aos-duration": "400", "data-aos-once": "true", "data-aos-delay": "400", children: /* @__PURE__ */ jsxs("div", { className: "hm-soln-contnr", children: [
          /* @__PURE__ */ jsx("div", { className: "soln-img-bx", children: /* @__PURE__ */ jsx("img", { src: warehousing_cont, alt: "warehousing_cont" }) }),
          /* @__PURE__ */ jsxs("div", { className: "soln-cntn-bx", children: [
            /* @__PURE__ */ jsx("h3", { className: "white", children: "Warehousing" }),
            /* @__PURE__ */ jsx("p", { className: "white", children: 'Our warehousing solutions are designed to meet the diverse needs of businesses. From tailor-made "Built to Suit" facilities to versatile "Multi-user Warehousing," from the convenience of "Customs Bonded Warehouse" services to efficient "In-Plant Warehouse Management"' }),
            /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/multiuser-warehousing", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { id: "srvc-cont2", className: "srvc-cont hidden", children: /* @__PURE__ */ jsxs("div", { className: "hm-soln-contnr", children: [
          /* @__PURE__ */ jsx("div", { className: "soln-img-bx", children: /* @__PURE__ */ jsx("img", { src: trade_zone_bg, alt: "trade_zone" }) }),
          /* @__PURE__ */ jsxs("div", { className: "soln-cntn-bx", children: [
            /* @__PURE__ */ jsx("h3", { className: "white", children: "Free Trade Zone" }),
            /* @__PURE__ */ jsx("p", { className: "white", children: "At MRS, we take pride in being the trusted partner for numerous corporate giants in Gujarat, providing end-to-end supply chain management solutions that drive excellence. " }),
            /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/pioneering-duty-free-warehousing-solutions", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { id: "srvc-cont3", className: "srvc-cont hidden", children: /* @__PURE__ */ jsxs("div", { className: "hm-soln-contnr", children: [
          /* @__PURE__ */ jsx("div", { className: "soln-img-bx", children: /* @__PURE__ */ jsx("img", { src: transport_big, alt: "transport_big.svg" }) }),
          /* @__PURE__ */ jsxs("div", { className: "soln-cntn-bx", children: [
            /* @__PURE__ */ jsx("h3", { className: "white", children: "Surface & Rail Transport" }),
            /* @__PURE__ */ jsx("p", { className: "white", children: "At MRS Transport Solutions, we proudly offer an innovative combination of Road and Rail Transport services, creating a unique and economical logistics solution connecting Mundra Port to the Northern regions of India. " }),
            /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/road-and-rail-transport", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { id: "srvc-cont4", className: "srvc-cont hidden", children: /* @__PURE__ */ jsxs("div", { className: "hm-soln-contnr", children: [
          /* @__PURE__ */ jsx("div", { className: "soln-img-bx", children: /* @__PURE__ */ jsx("img", { src: borker_big, alt: "borker_big.svg" }) }),
          /* @__PURE__ */ jsxs("div", { className: "soln-cntn-bx", children: [
            /* @__PURE__ */ jsx("h3", { className: "white", children: "Customs Brokerage" }),
            /* @__PURE__ */ jsx("p", { className: "white", children: "In the intricate world of global trade, regulatory compliance and documentation stand as pivotal elements, ensuring smooth business operations. At MRS Supply Chain, we understand the complexities and nuances of this domain. " }),
            /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/customs-brokerage-and-regulatory-compliance", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { id: "srvc-cont5", className: "srvc-cont hidden", children: /* @__PURE__ */ jsxs("div", { className: "hm-soln-contnr", children: [
          /* @__PURE__ */ jsx("div", { className: "soln-img-bx", children: /* @__PURE__ */ jsx("img", { src: custom_trade_big, alt: "custom_trade_big" }) }),
          /* @__PURE__ */ jsxs("div", { className: "soln-cntn-bx", children: [
            /* @__PURE__ */ jsx("h3", { className: "white", children: "Customs and Foreign Trade Compliance" }),
            /* @__PURE__ */ jsx("p", { className: "white", children: "By leveraging our expertise in various domain like 100% EOU, SEZ, Public & Private Bonded Warehouse, MOOWR and allied compliances which need very specific expertise to make operation seamless our team of experts help you navigate the maze of international trade regulations and paperwork." }),
            /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/customs-brokerage-and-regulatory-compliance#foreign", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { id: "srvc-cont6", className: "srvc-cont hidden", children: /* @__PURE__ */ jsxs("div", { className: "hm-soln-contnr", children: [
          /* @__PURE__ */ jsx("div", { className: "soln-img-bx", children: /* @__PURE__ */ jsx("img", { src: lastTech, alt: "lastTech" }) }),
          /* @__PURE__ */ jsxs("div", { className: "soln-cntn-bx", children: [
            /* @__PURE__ */ jsx("h3", { className: "white", children: "Tech-Driven Last-Mile Delivery" }),
            /* @__PURE__ */ jsx("p", { className: "white", children: "In today's fast-paced world, the efficiency of last-mile delivery is not just an option but a necessity. MRS Supply Chain is at the forefront of revolutionizing this critical segment with our cutting-edge, tech-driven last-mile delivery services." }),
            /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/tech-driven-last-mile-delivery-services", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "row built-row", id: "solution-mob", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "accordion-list white", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Warehousing" }),
        /* @__PURE__ */ jsxs("div", { className: "answer", children: [
          /* @__PURE__ */ jsx("img", { src: warehousing_cont, alt: "warehousing_cont" }),
          /* @__PURE__ */ jsx("p", { children: 'Our warehousing solutions are designed to meet the diverse needs of businesses. From tailor-made "Built to Suit" facilities to versatile "Multi-user Warehousing," from the convenience of "Customs Bonded Warehouse" services to efficient "In-Plant Warehouse Management"' }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/multiuser-warehousing", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Free Trade Zone" }),
        /* @__PURE__ */ jsxs("div", { className: "answer", children: [
          /* @__PURE__ */ jsx("img", { src: trade_zone_bg, alt: "warehousing_cont" }),
          /* @__PURE__ */ jsx("p", { children: "At MRS, we take pride in being the trusted partner for numerous corporate giants in Gujarat, providing end-to-end supply chain management solutions that drive excellence." }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/pioneering-duty-free-warehousing-solutions", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Surface & Rail Transport" }),
        /* @__PURE__ */ jsxs("div", { className: "answer", children: [
          /* @__PURE__ */ jsx("img", { src: transport_big, alt: "warehousing_cont" }),
          /* @__PURE__ */ jsx("p", { children: "At MRS Transport Solutions, we proudly offer an innovative combination of Road and Rail Transport services, creating a unique and economical logistics solution connecting Mundra Port to the Northern regions of India." }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/road-and-rail-transport", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Customs Brokerage" }),
        /* @__PURE__ */ jsxs("div", { className: "answer", children: [
          /* @__PURE__ */ jsx("img", { src: borker_big, alt: "warehousing_cont" }),
          /* @__PURE__ */ jsx("p", { children: "In the intricate world of global trade, regulatory compliance and documentation stand as pivotal elements, ensuring smooth business operations. At MRS Supply Chain, we understand the complexities and nuances of this domain." }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/customs-brokerage-and-regulatory-compliance", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Customs and Foreign Trade Compliance" }),
        /* @__PURE__ */ jsxs("div", { className: "answer", children: [
          /* @__PURE__ */ jsx("img", { src: custom_trade_big, alt: "warehousing_cont" }),
          /* @__PURE__ */ jsx("p", { children: "By leveraging our expertise in various domain like 100% EOU, SEZ, Public & Private Bonded Warehouse, MOOWR and allied compliances which need very specific expertise to make operation seamless our team of experts help you navigate the maze of international trade regulations and paperwork." }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/customs-brokerage-and-regulatory-compliance#foreign", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Tech-Driven Last-Mile Delivery" }),
        /* @__PURE__ */ jsxs("div", { className: "answer", children: [
          /* @__PURE__ */ jsx("img", { src: lastTech, alt: "warehousing_cont" }),
          /* @__PURE__ */ jsx("p", { children: "In today's fast-paced world, the efficiency of last-mile delivery is not just an option but a necessity. MRS Supply Chain is at the forefront of revolutionizing this critical segment with our cutting-edge, tech-driven last-mile delivery services." }),
          /* @__PURE__ */ jsx("a", { className: "btn white hm-spt-btn", id: "btn-styl", href: "/services/tech-driven-last-mile-delivery-services", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Learn More" }) })
        ] })
      ] })
    ] }) }) })
  ] }) }) });
}
function Homepage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "pg-body viewport", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Top Supply Chain Solutions | Logistics, Warehousing, and Transport Services in India" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Discover MRS Supply Chain, India's best company for supply chain solutions, logistics services, warehousing, customs brokerage, last-mile delivery, and road and rail transport. Optimize your supply chain with us."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Supply Chain Solutions, Logistics Services, Warehousing Solutions, Customs Brokerage, Last-Mile Delivery, Road and Rail Transport, Best Supply Chain Company in India"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { id: "scroll-container", className: "scroll-container", children: [
      /* @__PURE__ */ jsx(Header2, {}),
      /* @__PURE__ */ jsx(HomeSpotlight, {}),
      /* @__PURE__ */ jsx(HomeAbout, {}),
      /* @__PURE__ */ jsx(Advantage, {}),
      /* @__PURE__ */ jsx(HomeSolution2, {}),
      /* @__PURE__ */ jsx(HomeSector, {}),
      /* @__PURE__ */ jsx(HomeClients, {}),
      /* @__PURE__ */ jsx(HomeBlog, {}),
      /* @__PURE__ */ jsx(formSection, {}),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] }) });
}
const About_MRS = "/assets/About_MRS_hdr-bYBVLKeo.jpg";
const Line$4 = "data:image/svg+xml,%3csvg%20width='1318'%20height='1'%20viewBox='0%200%201318%201'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cline%20x1='-4.37114e-08'%20y1='0.5'%20x2='1511'%20y2='0.499868'%20stroke='white'%20stroke-dasharray='4%204'/%3e%3c/svg%3e";
function AboutSpotlight() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "section inner-spotlight-sec section-padd-LR overflow abt-hdr-sec", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsx("h1", { className: "white js-split-text", children: "About MRS Group" }),
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "600", children: "Legacy Insights" }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-up", "data-aos-duration": "900", "data-aos-once": "true", "data-aos-delay": "1000", children: "MRS Group, an emerging leader in integrated logistics." }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "1100", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "About Us" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: About_MRS, alt: "supplyChainImage", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "600" }) }) })
  ] }) });
}
const AboutUs = "/assets/about_us-LhCywApO.png";
function aboutAboutUs() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "abt_us-section section-padd-LR overflow abt-sec2", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black", children: [
    /* @__PURE__ */ jsx("h2", { className: "ttl-45px abt-ttl", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "1200", children: "MRS Group: Pioneering Progress, Inspiring Futures" }),
    /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 contnt-clm", children: [
        /* @__PURE__ */ jsx("h3", { className: "grey", "data-aos": "fade-in", "data-aos-delay": "400", "data-aos-once": "true", children: "We are a leading integrated logistics service provider in India, established in 2016 as a shipping and customs brokerage company." }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "800", children: "Originating from humble beginnings in the heart of Kutch, Gujarat, we are now headquartered in Bangalore, with branches across the nation, offering comprehensive solutions for supply chain management. Our range of services encompasses various aspects of the supply chain, from international freight forwarding to project logistics, customs brokerage, air freight transhipment centres, free trade warehousing, customs bonded warehousing, contract logistics, and 4PL services. With MRS Group, the entire realm of logistics and distribution is made accessible with our infrastructure backed by technology and a presence in over 7 locations nationwide." }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "600", children: "With a team of over 50 employees and a solid financial foundation, MRS Group has diversified into an international standard industrial infrastructure company, offering industrial parks and build-to-suit model infrastructure of Grade A quality. Recognising the growing demand for integrated services and cross-border trade, MRS Group  now provides comprehensive solutions under one roof. " })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 img-clm", children: /* @__PURE__ */ jsx("img", { src: AboutUs, alt: "AboutUs", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "800" }) })
    ] })
  ] }) }) });
}
function aboutMissin() {
  useEffect(() => {
    $(document).ready(function() {
      $(".vision").on("mouseenter", function() {
        $(".background-image").removeClass("show");
        $(".bg1").addClass("show");
        $(".vision h2, .vision p").addClass("txt-shadw current");
        $(".mission h2, .value h2").removeClass("txt-shadw");
        $(".mission p, .value p").removeClass("current");
      });
      $(".mission").on("mouseenter", function() {
        $(".background-image").removeClass("show");
        $(".bg2").addClass("show");
        $(".mission h2, .mission p").addClass("txt-shadw current");
        $(".vision h2, .value h2").removeClass("txt-shadw");
        $(".vision p, .value p").removeClass("current");
      });
      $(".value").on("mouseenter", function() {
        $(".background-image").removeClass("show");
        $(".bg3").addClass("show");
        $(".value h2, .value p").addClass("txt-shadw current");
        $(".vision h2, .mission h2").removeClass("txt-shadw");
        $(".vision p, .mission p").removeClass("current");
      });
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { class: "mission-section section-padd-LR overflow", children: [
    /* @__PURE__ */ jsxs("div", { class: "background-images", children: [
      /* @__PURE__ */ jsx("div", { class: "background-image bg1 show" }),
      /* @__PURE__ */ jsx("div", { class: "background-image bg2" }),
      /* @__PURE__ */ jsx("div", { class: "background-image bg3" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1150 black flex", children: [
      /* @__PURE__ */ jsx("div", { className: "width-30" }),
      /* @__PURE__ */ jsxs("div", { className: "width-70", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex VMV-bx vision", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "400", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h2", { className: "VMV-ttl txt-shadw", children: "Vision" }),
          /* @__PURE__ */ jsx("p", { className: "vision-para current", children: "To be amongst one of the top Supply Chain & Industrial Infrastructure Company worldwide." })
        ] }),
        /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", className: "line-img", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "500", "data-aos-once": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "flex VMV-bx mission", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "600", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h2", { className: "VMV-ttl", children: "Mission" }),
          /* @__PURE__ */ jsx("p", { className: "mission-para", children: "To build a robust network of Supply Chain & Industrial Infrastructure by adopting the technology and global standards." })
        ] }),
        /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", className: "line-img", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "700", "data-aos-once": "true" }),
        /* @__PURE__ */ jsxs("div", { className: "flex VMV-bx value", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "800", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h2", { className: "VMV-ttl", children: "Values" }),
          /* @__PURE__ */ jsx("p", { className: "value-para", children: "At MRS, we believe in delivering our commitments to our clients and stakeholders by providing world-class logistics and distribution services and incorporating global supply chain standards with a local approach to executing tasks." })
        ] })
      ] })
    ] })
  ] }) });
}
const Team1 = "/assets/team1-RIf7-DV0.png";
const WarehousingNeeds$2 = "/assets/Expert Team-bD1XXdJr.png";
function aboutTeam() {
  useEffect(() => {
    $(document).ready(function() {
      var $imgGallery = $(".team-container1");
      var originalHeight = $imgGallery.height();
      $(".see-all").on("click", function() {
        $imgGallery.stop().animate({
          maxHeight: $imgGallery.height() === originalHeight ? $imgGallery[0].scrollHeight : originalHeight
        }, 500, function() {
          $(".team-arrow").toggleClass("rotate");
          if ($(".for-opacity").hasClass("opacity-30")) {
            $(".for-opacity").removeClass("opacity-30");
          } else {
            $(".for-opacity").toggleClass("opacity-30");
          }
        });
      });
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "team-section section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black team-container1", children: [
    /* @__PURE__ */ jsx("h2", { className: "team-ttl js-split-text", children: "MRS Team, Driven by Expertise and Customer Commitment" }),
    /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "clm1", children: /* @__PURE__ */ jsx("img", { src: Team1, alt: "team1", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "800", "data-aos-once": "true" }) }),
      /* @__PURE__ */ jsxs("div", { className: "clm2", children: [
        /* @__PURE__ */ jsx("h2", { className: "foundr-name", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-delay": "800", "data-aos-once": "true", children: "Rajiv Safaya" }),
        /* @__PURE__ */ jsx("h3", { className: "position orange", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: "Co-founder & CEO" }),
        /* @__PURE__ */ jsx("p", { className: "abt-foundr", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "900", "data-aos-once": "true", children: "CA Rajiv Safaya, the visionary founder of MRS Supply Chain, brings 18 years of rich experience in managing corporate clients to the forefront of logistics and supply chain management. With an in-depth understanding of the complexities of Exim Trade and the challenges stakeholders encounter, he has strategically assembled a team of seasoned professionals. Guided by his foresight, MRS Supply Chain has expanded its reach beyond India, establishing a strong presence in international markets including Dubai, Singapore, and the USA, to better serve our global clientele." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row abt-team-clm", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm abt-team", children: [
        /* @__PURE__ */ jsx("h2", { className: "blue", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "700", "data-aos-once": "true", children: "Expert Team, Tailored Solutions: Navigating Logistics with Precision and Commitment" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "700", children: "Our team, composed of dynamic logistics professionals, is adept in navigating the intricate landscape of Customs Law, Export & Import Processes, SEZ Rules, Bonded Warehousing Compliance, and other related regulations, ensuring seamless Supply Chain Management. " }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "700", children: "At our core, each team member possesses a profound understanding of our client's unique needs, driven by an unwavering commitment to exceed expectations and deliver unparalleled satisfaction. Our growth trajectory is a testament to our deep-seated dedication to our clients and the trust fostered with our partners, marking our journey with consistent progress fueled by mutual respect and commitment." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: WarehousingNeeds$2, alt: "WarehousingNeeds", "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "400" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "team-container" })
  ] }) }) });
}
const Why = "/assets/why-OJPWgWsi.svg";
const MRS_Van = "/assets/MRS_Van-WZ1UvMfu.png";
function aboutWhyMRS() {
  useEffect(() => {
    $(".tab-link").click(function() {
      var tabID = $(this).attr("data-tab");
      $(this).addClass("active").siblings().removeClass("active");
      $("#tab-" + tabID).addClass("active").siblings().removeClass("active");
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "whyMrs-section section-padd-LR overflow", children: [
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black whyMRS-container1", children: [
      /* @__PURE__ */ jsx("img", { src: Why, alt: "AboutUs", className: "why-img", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "400", "data-aos-once": "true" }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsx("h3", { className: "grey why-mrs-txt", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "500", "data-aos-once": "true", children: "Your trusted ally in Gujarat, providing end-to-end supply chain solutions for seamless operations." }) }),
        /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsx("img", { src: MRS_Van, alt: "MRS_Van", className: "mrs-van", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "600", "data-aos-once": "true" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 black whyMRS-container2", children: /* @__PURE__ */ jsxs("div", { className: "why-wrapper", children: [
      /* @__PURE__ */ jsx("div", { className: "tab-wrapper", children: /* @__PURE__ */ jsxs("ul", { className: "tabs", children: [
        /* @__PURE__ */ jsx("li", { className: "tab-link active", "data-tab": "1", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "700", "data-aos-once": "true", children: "Technology" }),
        /* @__PURE__ */ jsx("li", { className: "tab-link", "data-tab": "2", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "800", "data-aos-once": "true", children: "Quality" }),
        /* @__PURE__ */ jsx("li", { className: "tab-link", "data-tab": "3", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "900", "data-aos-once": "true", children: "Sustainability" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "content-wrapper", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "1000", "data-aos-once": "true", children: [
        /* @__PURE__ */ jsx("div", { id: "tab-1", className: "tab-content active", children: /* @__PURE__ */ jsx("p", { children: "At MRS, we harness the power of cutting-edge technology to redefine logistics efficiency. Our advanced systems and innovative solutions ensure real-time visibility, seamless communication, and streamlined operations, setting new benchmarks in the logistics landscape." }) }),
        /* @__PURE__ */ jsx("div", { id: "tab-2", className: "tab-content", children: /* @__PURE__ */ jsx("p", { children: "Quality is the cornerstone of our operations at MRS. From meticulous handling of goods to precision in every process, we are committed to delivering excellence. Our unwavering dedication to high standards ensures that every client experience is synonymous with reliability and satisfaction." }) }),
        /* @__PURE__ */ jsx("div", { id: "tab-3", className: "tab-content", children: /* @__PURE__ */ jsx("p", { children: "Sustainability is integral to our ethos at MRS. We are dedicated to eco-friendly practices, from optimizing routes for fuel efficiency to leveraging green warehousing solutions. Our commitment to sustainability not only benefits the environment but also adds value to our clients' supply chains." }) })
      ] })
    ] }) })
  ] }) });
}
const About_CTA = "/assets/about_CTA-hGT2k6t7.png";
const white_Arrow = "data:image/svg+xml,%3csvg%20width='28'%20height='28'%20viewBox='0%200%2028%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M1%2013.9414L27.2631%2013.9414'%20stroke='white'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.6896%201L27.2632%2013.9412L15.6896%2026.8823'%20stroke='white'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
function innerCTA$5() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "cta-sec section-padd-LR overflow inner-cta-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container", children: /* @__PURE__ */ jsxs("div", { className: "client-img-bx global-cta", children: [
    /* @__PURE__ */ jsx("img", { className: "first_Company-img", src: About_CTA, alt: "About_CTA", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }),
    /* @__PURE__ */ jsxs("div", { className: "client-contnt-bx", children: [
      /* @__PURE__ */ jsxs("h2", { className: "white ttl-60px", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
        "We are the 1st Company in Kutch to Provide Single Largest Warehouse of Grade ",
        /* @__PURE__ */ jsx("span", { className: "bold", children: "A" }),
        " category"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "client-btn inner-cta-btn enquire_btn", id: "btn-styl", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsxs("a", { children: [
        /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Discover Now our Offering" }),
        " ",
        /* @__PURE__ */ jsx("img", { src: white_Arrow, alt: "Arrow", className: "inner-cta-img" })
      ] }) })
    ] })
  ] }) }) }) });
}
function Aboutpage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "pg-body viewport", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "About MRS Supply Chain | Leading Logistics Experts in India" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Learn more about MRS Supply Chain, a top supply chain company in India. Discover our expertise in logistics, warehousing, and transport solutions. Partner with the best in the industry."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "About MRS Supply Chain, Leading Supply Chain Company, Logistics Experts in India"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { id: "scroll-container", className: "scroll-container", children: [
      /* @__PURE__ */ jsx(Header2, {}),
      /* @__PURE__ */ jsx(AboutSpotlight, {}),
      /* @__PURE__ */ jsx(aboutAboutUs, {}),
      /* @__PURE__ */ jsx(aboutMissin, {}),
      /* @__PURE__ */ jsx(aboutTeam, {}),
      /* @__PURE__ */ jsx(aboutWhyMRS, {}),
      /* @__PURE__ */ jsx(innerCTA$5, {}),
      /* @__PURE__ */ jsx(formSection, {}),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] }) });
}
const Warehousing_Solution$8 = "/assets/Warehousing_Solution-HNF75iTw.jpg";
function ContactSpotlight() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight section inner-spotlight-sec section-padd-LR overflow contct-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsx("h1", { className: "js-split-text white", children: "Contact Us" }),
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "500", children: "Your Logistics Partner" }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "700" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: "We're Here to Help: Connect with Our Expert Team Today" }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Contact us" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Warehousing_Solution$8, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "1000" }) }) })
  ] }) });
}
const Phone_icon_white = "data:image/svg+xml,%3csvg%20width='683'%20height='683'%20viewBox='0%200%20683%20683'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask0_557_214'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='683'%20height='683'%3e%3cpath%20d='M0%200H682.667V682.667H0V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_557_214)'%3e%3cpath%20d='M191.377%2020C145.931%2020%20102.336%2038.056%2070.192%2070.1947C38.0587%20102.335%2020%20145.925%2020%20191.377C20%20451.664%20230.999%20662.667%20491.289%20662.667C536.736%20662.667%20580.331%20644.611%20612.473%20612.472C644.608%20580.332%20662.667%20536.741%20662.667%20491.289L448.444%20405.6L405.6%20512.711H405.577C275.449%20512.711%20169.956%20407.22%20169.956%20277.088V277.067L277.067%20234.223L191.377%2020Z'%20stroke='black'%20stroke-width='40'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/g%3e%3c/svg%3e";
const Mail_icon_white = "data:image/svg+xml,%3csvg%20width='683'%20height='683'%20viewBox='0%200%20683%20683'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask0_557_206'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='-1'%20width='683'%20height='684'%3e%3cpath%20d='M0%20-0.00012207H682.667V682.667H0V-0.00012207Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_557_206)'%3e%3cpath%20d='M37.824%20181.834C26.684%20174.412%2020%20161.922%2020%20148.545V148.512C20%20124.862%2039.1733%20105.69%2062.824%20105.69H619.841C643.491%20105.69%20662.664%20124.862%20662.664%20148.512V148.533V148.545C662.664%20161.922%20655.981%20174.412%20644.841%20181.834C590.483%20218.081%20426.688%20327.269%20365.1%20368.336C350.705%20377.933%20331.96%20377.933%20317.565%20368.336C255.976%20327.269%2092.1827%20218.081%2037.824%20181.834Z'%20stroke='black'%20stroke-width='40'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M20%20148.534V534.132C20%20545.496%2024.5093%20556.39%2032.5533%20564.423C40.5867%20572.467%2051.48%20576.976%2062.844%20576.976H619.82C631.184%20576.976%20642.077%20572.467%20650.111%20564.423C658.155%20556.39%20662.664%20545.496%20662.664%20534.132V148.534'%20stroke='black'%20stroke-width='40'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/g%3e%3c/svg%3e";
function addressSection() {
  const mystyle = {
    width: "100%",
    height: "450px",
    border: "0",
    "border-radius": "15px"
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "addressSection section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 flex black", children: [
    /* @__PURE__ */ jsxs("div", { className: "clm-2 add-clm1", id: "add-clm1", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "700", children: [
      /* @__PURE__ */ jsx("h2", { className: "white", children: "Reach Us" }),
      /* @__PURE__ */ jsx("h4", { className: "head-offc-ttl white", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "", children: "Head Office" }),
      /* @__PURE__ */ jsxs("p", { className: "address-para white", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "300", children: [
        "No 7, Ground Floor, 4th Cross, Papaiah Garden Road, ",
        /* @__PURE__ */ jsx("br", {}),
        "Banashankari, 3rd Stage, Bangalore - 560085, ",
        /* @__PURE__ */ jsx("br", {}),
        "Karnataka, India"
      ] }),
      /* @__PURE__ */ jsx("iframe", { src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7051926963177!2d77.55557877588683!3d12.926659815860383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f4815145bad%3A0x3aebf33ea9569338!2sMRS%20Shipping%20LLP!5e0!3m2!1sen!2sin!4v1712295826246!5m2!1sen!2sin", style: mystyle, allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "400", "data-aos-once": "true" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "clm-2", id: "add-clm2", children: [
      /* @__PURE__ */ jsx("h4", { className: "othr-offc-ttl", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "700", children: "Other Office" }),
      /* @__PURE__ */ jsxs("div", { className: "offices-bx", children: [
        /* @__PURE__ */ jsxs("div", { className: "locations", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "700", children: [
          /* @__PURE__ */ jsx("h4", { children: "Admin Office" }),
          /* @__PURE__ */ jsx("p", { className: "foo-addrss", children: 'Office No. 102,110,117, "Madhav Palace”, Plot No 55, Sec 8, Gandhidham, Kutch, Gujarat, India, 370201' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "locations", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "700", children: [
          /* @__PURE__ */ jsx("h4", { children: "Ahmedabad" }),
          /* @__PURE__ */ jsx("p", { className: "foo-addrss", children: "Near Namaste Circle, 4Th Floor, C-430, Indian Textile Plaza, Shahibaug, Ahmedabad, Ahmedabad, Gujarat, 380004 " })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "locations", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "700", children: [
          /* @__PURE__ */ jsx("h4", { children: "Mumbai" }),
          /* @__PURE__ */ jsx("p", { className: "foo-addrss", children: "Ground Floor, Shop No. 6, Agrawal Trade Centre, Belapur, Belapur, Navi Mumbai, Thane, Maharashtra, 400614" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "locations", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "700", children: [
          /* @__PURE__ */ jsx("h4", { children: "Singapore" }),
          /* @__PURE__ */ jsx("p", { className: "foo-addrss", children: "101 Upper Cross Street #04-36 People’s Park Centre Singapore 058357 " })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mail-dv", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "400", children: [
        /* @__PURE__ */ jsx("img", { className: "icn", src: Mail_icon_white, alt: "Email_icon" }),
        /* @__PURE__ */ jsx("a", { href: "mailto:connect@mrssupplychain.com", children: "connect@mrssupplychain.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "phone-dv frst_phone", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "600", children: [
        /* @__PURE__ */ jsx("img", { className: "icn", src: Phone_icon_white, alt: "Phone_icon" }),
        /* @__PURE__ */ jsx("a", { href: "tel:+912836235415", children: "+91 2836 235415" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "phone-dv oth_phone", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "600", children: [
        /* @__PURE__ */ jsx("h5", { children: "General Enquiries:" }),
        /* @__PURE__ */ jsx("a", { href: "tel:+919825813698", children: "+91 98258 13698" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "phone-dv oth_phone", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "600", children: [
        /* @__PURE__ */ jsx("h5", { children: "RFQ Enquiries:" }),
        /* @__PURE__ */ jsx("a", { href: "tel:+918980015415", children: "+91 89800 15415" })
      ] })
    ] })
  ] }) }) });
}
function Contactpage$1() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Contact Us - MRS" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "We're Here to Help: Connect with Our Expert Team Today"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(ContactSpotlight, {}),
    /* @__PURE__ */ jsx(addressSection, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function ServicesSpotlight() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight section inner-spotlight-sec section-padd-LR overflow wareHousing-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsxs("h1", { className: "js-split-text white", children: [
        "Your Warehousing",
        /* @__PURE__ */ jsx("br", {}),
        "Solution Partner"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: "Dependable. Streamlined." }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: "Seamless warehousing solutions designed to meet the diverse needs of your business." }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Services " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Warehousing Solutions" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Warehousing_Solution$8, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "1000" }) }) })
  ] }) });
}
function multiUserAbout$1() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "abt_us-section section-padd-LR overflow", children: [
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black multiuser-container1", children: [
      /* @__PURE__ */ jsxs("div", { className: "services-hdng black", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "400", children: [
        /* @__PURE__ */ jsxs("a", { href: "/services/multiuser-warehousing#built", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "600", children: [
          "Built to Suit",
          /* @__PURE__ */ jsx("br", {}),
          "Warehousing"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "/services/multiuser-warehousing#multiuser", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "700", children: [
          "Multiuser ",
          /* @__PURE__ */ jsx("br", {}),
          "Warehousing"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "/services/multiuser-warehousing#customs", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: [
          "Customs Bonded ",
          /* @__PURE__ */ jsx("br", {}),
          "  Warehouse"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "/services/multiuser-warehousing#plant", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: [
          "In-Plant Warehouse ",
          /* @__PURE__ */ jsx("br", {}),
          "Management"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "Your trusted partner in Gujarat for end-to-end supply chain needs." }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "At MRS, we take pride in being the trusted partner for numerous corporate giants in Gujarat, providing end-to-end supply chain management solutions that drive excellence. With a strategic presence near key sea ports such as Hazira, Kandla, and Mundra, and the privilege of overseeing a Free Trade Warehousing Zone in Mundra, we offer a remarkable total warehousing space of 3.5 Lakh Sq Ft." }) }),
        /* @__PURE__ */ jsx("div", { className: "clm-2", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsx("p", { className: "mob-mrgin-btm-o", children: 'Our warehousing solutions are designed to meet the diverse needs of businesses. From tailor-made "Built to Suit" facilities to versatile "Multi-user Warehousing," from the convenience of "Customs Bonded Warehouse" services to efficient "In-Plant Warehouse Management," we are more than just warehousing; we are your partner in optimising logistics, streamlining operations, and ensuring unmatched efficiency.' }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 multiuser-container2", id: "no-pad-mob", children: [
      /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsxs("div", { className: "user-numbers-sec", "data-aos": "fade-in", "data-aos-delay": "400", "data-aos-once": "true", children: [
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "0", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsxs("h4", { className: "numbers blue", children: [
            " 14 ",
            /* @__PURE__ */ jsx("span", { className: "num-ttl", children: "years" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Experience in 3PL and Warehousing Services." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "300", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsxs("h4", { className: "numbers blue", children: [
            "07 ",
            /* @__PURE__ */ jsx("sapn", { className: "num-ttl", children: "Lacs Sq ft" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Warehouses Leased Out for Food Grains and Bulk Cargo." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "500", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsxs("h4", { className: "numbers blue", children: [
            "3.5 ",
            /* @__PURE__ */ jsx("sapn", { className: "num-ttl", children: "Lacs" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Grade A Warehousing Space in Kutch." })
        ] })
      ] })
    ] })
  ] }) });
}
const BuiltWarehousing$4 = "/assets/BuiltWarehousing-gN_iTSZ4.jpg";
function multiUserAbout() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "built-to-suit-sec section-padd-LR overflow", id: "built", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 built-to-suit-container1 white", children: [
    /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Built to Suit Warehousing" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: "We recognize that one size does not fit all when it comes to warehousing solutions. That's where MRS Built-to-Suit Warehousing comes into play, offering numerous advantages for businesses seeking a truly customised and strategic warehousing approach." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: BuiltWarehousing$4, alt: "BuiltWarehousing", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900" }) })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt js-split-text", children: "At MRS, we offer a cutting-edge solution with your business in mind:" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("ul", { className: "built-ul", children: [
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "500", children: [
          /* @__PURE__ */ jsx("h3", { children: "Tailored to Your Needs" }),
          /* @__PURE__ */ jsx("p", { children: "Our Built-to-Suit Warehousing goes beyond standard offerings. We work closely with you to create a customised space that precisely aligns with your requirements. You specify your needs, we collaborate on the design, and once agreed upon, construction begins." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          /* @__PURE__ */ jsx("h3", { children: "Future-Ready Infrastructure" }),
          /* @__PURE__ */ jsx("p", { children: "With technology advancements and evolving business demands, outdated and undersized facilities can hinder your operations. Our Built-to-Suit Warehousing ensures your facility is equipped with the latest technology and infrastructure, setting you up for long-term success." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
          /* @__PURE__ */ jsx("h3", { children: "Tenant Commitment" }),
          /* @__PURE__ */ jsx("p", { children: "With a pre-leased agreement, you have the assurance of tenancy even before construction begins. This not only provides financial security but also peace of mind, knowing your space is reserved for your specific needs." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsx("h3", { children: "Cost-Efficiency" }),
          /* @__PURE__ */ jsx("p", { children: "You can redirect your savings towards your core business operations by eliminating the need for development expertise and minimising capital requirements, enhancing your overall efficiency." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsx("h3", { children: "Adapt to Industry Trends" }),
          /* @__PURE__ */ jsx("p", { children: "In an era of increasing consolidation within the warehousing industry, our Built-to-Suit Warehousing solutions accommodate the growing demand for larger and more advanced spaces." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "margin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "At MRS, we understand that your warehousing needs are unique. Our Built-to-Suit Warehousing is your key to a tailored, future-proof facility that not only meets but exceeds your expectations. " })
    ] })
  ] }) }) });
}
const MultiuserWarehousing$2 = "/assets/Multiuser-Warehousing-w3WfGqKP.jpg";
const GreyLine = "data:image/svg+xml,%3csvg%20width='1168'%20height='1'%20viewBox='0%200%201168%201'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cline%20x1='4.37114e-08'%20y1='0.5'%20x2='1168'%20y2='0.500102'%20stroke='%23304D75'%20stroke-dasharray='4%204'/%3e%3c/svg%3e";
const VersatileStorage$1 = "data:image/svg+xml,%3csvg%20width='97'%20height='96'%20viewBox='0%200%2097%2096'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M45.3525%2031.2299V56.8037'%20stroke='%23FF0000'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cmask%20id='mask0_346_174'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='4'%20y='6'%20width='83'%20height='83'%3e%3cpath%20d='M4.43457%206.29529H86.2706V88.1313H4.43457V6.29529Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_346_174)'%3e%3cpath%20d='M82.0662%2071.0613L53.935%2014.799C52.3618%2011.6525%2049.1093%209.49195%2045.3522%209.49195C41.5949%209.49195%2038.3424%2011.6525%2036.7693%2014.799L8.63815%2071.0613C7.99353%2072.3504%207.63086%2073.805%207.63086%2075.3444C7.63086%2080.6409%2011.9245%2084.9346%2017.221%2084.9346H73.4833C78.7796%2084.9346%2083.0735%2080.6409%2083.0735%2075.3444C83.0735%2073.805%2082.7106%2072.3504%2082.0662%2071.0613Z'%20stroke='%23565050'%20stroke-width='2'%20stroke-miterlimit='10'/%3e%3cpath%20d='M48.5487%2066.3936C48.5487%2068.1592%2047.1175%2069.5903%2045.352%2069.5903C43.5864%2069.5903%2042.1553%2068.1592%2042.1553%2066.3936C42.1553%2064.6281%2043.5864%2063.1969%2045.352%2063.1969C47.1175%2063.1969%2048.5487%2064.6281%2048.5487%2066.3936Z'%20fill='%232BB04C'/%3e%3c/g%3e%3c/svg%3e";
const CustomsBonded = "/assets/CustomsBonded-_DZKND6p.jpg";
const Inplant$3 = "/assets/In-Plant-nhVmcnQh.jpg";
function customBonded$1() {
  useEffect(() => {
    $(".cstm-bondReadMore").off("click").on("click", function() {
      $(".cstm-bondReadMore").toggleClass("rotate");
      $(".bond-moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
    $(".accordion-list > li > .answer").hide();
    $(".accordion-list > li").off("click").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
      } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
      }
      return false;
    });
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec section-padd-LR overflow", id: "customs", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 black built-to-suit-container1 custom-bonded-cntr1", children: /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: CustomsBonded, alt: "CustomsBonded", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "500" }) }),
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm white", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Customs Bonded Warehousing" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "500", children: "When it comes to MRS Customs Bonded Warehousing, it's not merely a solution; it's a strategic advantage meticulously designed to benefit businesses like yours. Backed by an illustrious history of being the go-to partner for numerous corporate giants in Gujarat, MRS embodies unmatched proficiency in end-to-end supply chain management. " }),
        /* @__PURE__ */ jsx("div", { className: "bond-moretext", children: /* @__PURE__ */ jsx("p", { children: "Our expansive network encompasses ten strategically positioned warehouses in close proximity to pivotal sea ports such as Hazira, Kandla, and Mundra. Additionally, we proudly operate a Free Trade Warehousing Zone in Mundra, delivering an extensive warehousing expanse totalling 5 Lakh Sq Ft. MRS Customs Bonded Warehousing is your key to a fortified supply chain, where customs compliance seamlessly aligns with secure storage, ensuring the utmost efficiency for your business." }) }),
        /* @__PURE__ */ jsx("a", { className: "cstm-bondReadMore white", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "Read more" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1", children: [
      /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt white js-split-text", children: "Advantages of MRS Customs Bonded Warehousing:" }),
      /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }),
      /* @__PURE__ */ jsxs("div", { className: "row built-row", id: "multi-usr-advnt-rw", children: [
        /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsxs("ul", { className: "accordion-list white", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Seamless Goods Handling" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Securely store bonded goods until all customs formalities are completed, allowing you to maintain uninterrupted operations. Our strategic locations ensure quick access to ports when needed." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Cost Efficiency" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "By choosing MRS Customs Bonded Warehousing, you can enjoy cost-effective storage solutions (eliminating the need for separate ISO container rentals)." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Tax Benefits" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Your goods remain tax-free until they are ready for sale or shipment, saving you money and providing ample time to complete necessary import formalities." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Safety and Compliance" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "For restricted and hazardous goods, our warehouses offer a secure environment for proper documentation and storage, ensuring compliance and safety for all." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Strategic Advantage" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Our extensive experience and commitment to continuous improvement projects mean that your goods are in expert hands, fostering long-lasting and mutually beneficial relationships." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Legal Documentation" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "We handle the paperwork for restricted goods, ensuring that you meet all legal requirements. Our Customs Bonded Warehouses allow for proper documentation and storage for up to — years." }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: Inplant$3, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800" }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "white mob-mrgin-btm-o", id: "multi-usr-advnt-para", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "At MRS, we don't just provide warehousing; we offer a competitive edge. Choose MRS Customs Bonded Warehousing to streamline your supply chain, reduce costs, and ensure compliance. With us, your goods are secure, your operations remain undisrupted, and your compliance is assured. It's not just a solution; it's a partnership in your success. " })
    ] }) })
  ] });
}
const In_Plant_warehousing = "/assets/In-Plant_warehousing-vztBAtcD.jpg";
const Line$3 = "data:image/svg+xml,%3csvg%20width='1132'%20height='1'%20viewBox='0%200%201132%201'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cline%20x1='4.37114e-08'%20y1='0.5'%20x2='1132'%20y2='0.500099'%20stroke='%230A0A0A'%20stroke-dasharray='4%204'/%3e%3c/svg%3e";
function inPlant$1() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "inPlant-sec section-padd-LR overflow", id: "plant", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1 inPlant-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "In-Plant Warehouse Management" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "At MRS, we are dedicated to elevating the efficiency of your manufacturing operations through our cutting-edge In-Plant Warehousing Services. We specialise in delivering comprehensive in-plant warehousing solutions meticulously designed to cater to the unique needs of your manufacturing processes." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: In_Plant_warehousing, alt: "In_Plant_warehousing", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }) })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt blue js-split-text", children: "Our services encompass:" }),
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "built-line-img",
        src: Line$3,
        alt: "Line",
        "data-aos": "fade-in",
        "data-aos-duration": "500",
        "data-aos-once": "true",
        "data-aos-delay": "600"
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("ul", { className: "built-ul inplant-ul ", children: [
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: [
          /* @__PURE__ */ jsx("h3", { className: "blue", children: "Tailored Storage Solutions" }),
          /* @__PURE__ */ jsx("p", { children: "We recognize that each manufacturing facility presents its own set of challenges and requirements. Our team of experts is adept at crafting storage solutions that optimise space utilisation, enhance material flow, and ultimately boost overall operational efficiency." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
          /* @__PURE__ */ jsx("h3", { children: "Advanced Inventory Management" }),
          /* @__PURE__ */ jsx("p", { children: "Leveraging state-of-the-art technology, our Inventory Management system provides real-time tracking and control of your materials. From raw materials to finished products, precision and efficiency in inventory management are guaranteed, mitigating the risks of overstocking or stock shortages." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          /* @__PURE__ */ jsx("h3", { children: "Efficient Material Handling" }),
          /* @__PURE__ */ jsx("p", { children: "Our in-plant warehousing services encompass the entire spectrum of material handling within your facility. We ensure that materials are stored, retrieved, and transported within the plant with utmost efficiency and safety, consequently reducing handling time and costs. We ensure that materials are stored, retrieved, and transported within the plant efficiently and safely, reducing handling time and costs." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
          /* @__PURE__ */ jsx("h3", { children: "Seamless Production Integration" }),
          /* @__PURE__ */ jsx("p", { children: "We closely align our warehousing services with your production schedules, ensuring the just-in-time delivery of materials to the production line. This seamless integration minimises downtime and significantly enhances overall productivity." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsx("h3", { children: "Scalable and Adaptable Solutions" }),
          /* @__PURE__ */ jsx("p", { children: "As your business continues to grow, our services grow alongside you. We offer flexible warehousing solutions capable of adapting to changing demands and increasing production volumes, ensuring that your expansion is fully supported at every stage." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: "Elevate your manufacturing efficiency with MRS In-Plant Warehousing Services – where precision, innovation, and adaptability converge to enhance your operational excellence." })
    ] })
  ] }) }) });
}
const VersatileStorage = "data:image/svg+xml,%3csvg%20width='67'%20height='74'%20viewBox='0%200%2067%2074'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M1.20656%200.845703H5.935C6.42203%200.845703%206.81687%201.24055%206.81687%201.72758V17.144H8.19766V2.00664C8.19766%201.51961%208.5925%201.12477%209.07953%201.12477H27.3708C27.8578%201.12477%2028.2527%201.51961%2028.2527%202.00664V17.144H30.8917V2.00664C30.8917%201.51961%2031.2866%201.12477%2031.7736%201.12477H50.065C50.552%201.12477%2050.9469%201.51961%2050.9469%202.00664V17.144H60.1831V1.72758C60.1831%201.24055%2060.578%200.845703%2061.065%200.845703H65.7934C66.2805%200.845703%2066.6753%201.24055%2066.6753%201.72758V72.2735C66.6753%2072.7605%2066.2805%2073.1554%2065.7934%2073.1554H61.065C60.578%2073.1554%2060.1831%2072.7605%2060.1831%2072.2735V68.5566H6.81703V72.2735C6.81703%2072.7605%206.42219%2073.1554%205.93516%2073.1554H1.20672C0.719688%2073.1554%200.324844%2072.7605%200.324844%2072.2735V1.72758C0.324844%201.24055%200.719531%200.845703%201.20656%200.845703ZM19.1683%2016.2076H24.0439C25.2039%2016.2076%2025.2039%2014.4438%2024.0439%2014.4438H19.1683C18.0083%2014.4438%2018.0083%2016.2076%2019.1683%2016.2076ZM20.2602%2013.726H22.952C24.112%2013.726%2024.112%2011.9623%2022.952%2011.9623H20.2602C19.1002%2011.9623%2019.1002%2013.726%2020.2602%2013.726ZM17.2666%202.88852V4.56383L17.5602%204.22492C17.9144%203.81539%2018.5511%203.82305%2018.8977%204.23398L19.1836%204.56398V2.88852H17.2666ZM20.9472%202.88852L20.9445%206.92398C20.9442%207.72445%2019.9377%208.11992%2019.4006%207.4993L18.2252%206.14273L17.0944%207.44773C16.5948%208.12352%2015.5031%207.7782%2015.5031%206.92398V2.88852H9.96141V17.144H26.4891V2.88852H20.9472ZM51.668%2028.4943V30.7596C51.668%2031.2466%2051.2731%2031.6415%2050.7861%2031.6415H48.2172C47.7302%2031.6415%2047.3353%2031.2466%2047.3353%2030.7596V28.4943H44.3217V39.6045H54.6816V28.4943H51.668ZM49.0991%2028.4943V29.8777H49.9044V28.4943H49.0991ZM42.5581%2039.6045V27.6126C42.5581%2027.1255%2042.953%2026.7307%2043.44%2026.7307H55.5634C56.0505%2026.7307%2056.4453%2027.1255%2056.4453%2027.6126V39.6045H60.1828V23.6363H6.81703V39.6045H10.5545V32.6726C10.5545%2032.1855%2010.9494%2031.7907%2011.4364%2031.7907H19.2502C19.7372%2031.7907%2020.132%2032.1855%2020.132%2032.6726V39.6045H24.9538V28.7921C24.9538%2028.3051%2025.3486%2027.9102%2025.8356%2027.9102H36.855C37.342%2027.9102%2037.7369%2028.3051%2037.7369%2028.7921V39.6045H42.5581ZM18.3681%2039.6045V33.5543H12.3181V39.6045H18.3681ZM35.9728%2039.6045V29.6738H26.7172V39.6045H35.9728ZM19.8769%2049.6837V51.3401L20.8547%2050.5762C21.1839%2050.319%2021.6389%2050.3337%2021.9497%2050.5866L22.9142%2051.3401V49.6837H19.8769ZM24.678%2049.6837L24.6747%2053.1438C24.6752%2053.8652%2023.8372%2054.2907%2023.2553%2053.8362L21.3955%2052.3834L19.5953%2053.7898C19.0392%2054.307%2018.1131%2053.9201%2018.1131%2053.1438V49.6837H10.3478V62.0648H32.4433V49.6837H24.678ZM8.58422%2062.0648V48.8019C8.58422%2048.3149%208.97906%2047.9201%209.46609%2047.9201H33.3252C33.8122%2047.9201%2034.207%2048.3149%2034.207%2048.8019V62.0648H38.0752V48.7968C38.0752%2048.3098%2038.47%2047.9149%2038.957%2047.9149H57.5336C58.0206%2047.9149%2058.4155%2048.3098%2058.4155%2048.7968V62.0648H60.183V46.0966H6.81703V62.0648H8.58422ZM47.258%2049.6787V51.0135L47.6217%2050.6485C47.9641%2050.3043%2048.5209%2050.3027%2048.8652%2050.6451L49.2323%2051.0135V49.6787H47.258ZM50.9961%2049.6787L50.9934%2053.144C50.9934%2053.9179%2050.0478%2054.3241%2049.4908%2053.764L48.2452%2052.5141L47.0459%2053.7174C46.52%2054.3312%2045.4942%2053.9674%2045.4942%2053.144V49.6787H39.8387V62.0648H56.6517V49.6787H50.9961ZM41.8624%2016.2079H46.738C47.898%2016.2079%2047.898%2014.4441%2046.738%2014.4441H41.8624C40.7024%2014.4441%2040.7024%2016.2079%2041.8624%2016.2079ZM42.9542%2013.7263H45.6461C46.8061%2013.7263%2046.8061%2011.9626%2045.6461%2011.9626H42.9542C41.7942%2011.9626%2041.7942%2013.7263%2042.9542%2013.7263ZM39.9606%202.88883V4.56414L40.2544%204.22523C40.6086%203.8157%2041.2453%203.82336%2041.5919%204.2343L41.8778%204.5643V2.88883H39.9606ZM43.6414%202.88883L43.6387%206.9243C43.6384%207.72477%2042.6319%208.12023%2042.0948%207.49961L40.9194%206.14305L39.7886%207.44805C39.2891%208.12383%2038.1973%207.77852%2038.1973%206.9243V2.88883H32.6556V17.1443H49.1833V2.88852L43.6414%202.88883ZM6.81703%2044.3327H60.1831V41.3679H6.81703V44.3327ZM60.1831%2066.793V63.8282H6.81703V66.793H60.1831ZM6.81703%2018.9076V21.8724H60.1831V18.9076H6.81703ZM64.9116%202.60945H61.9467V71.3916H64.9116V2.60945ZM5.05328%202.60945H2.08844V71.3916H5.05328V2.60945Z'%20fill='%23FC7B12'/%3e%3c/svg%3e";
const Flexible = "/assets/Flexible-jqQiJ7HL.svg";
const Scalable = "/assets/Scalable-q9T4fyyZ.svg";
function multiWarehousing() {
  useEffect(() => {
    $(".readMore-button").off("click").on("click", function() {
      $(".readMore-button").toggleClass("rotate");
      $(".moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "multiwarehouse section-padd-LR overflow", id: "multiuser", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 black built-to-suit-container1 multiwar-cont1", children: /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: MultiuserWarehousing$2, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "400" }) }),
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Multiuser Warehousing" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "700", children: "At MRS, we present international multi-user warehouses designed with extensive expertise in both B2B and B2C logistics operations across various sectors and goods. Our approach emphasises flexible warehouse space, resource sharing, and process optimization, delivering significant benefits to businesses like yours." }),
        /* @__PURE__ */ jsx("div", { className: "moretext", children: /* @__PURE__ */ jsx("p", { children: "Shared Space, Shared Success - With our extensive warehouse network, knowledge sharing, extensive experience, and ongoing collaborative improvement projects, we stand committed to providing the highest quality solutions for your products. Our multi-user warehousing concept fosters synergy, ensuring your goods are handled with care and precision." }) }),
        /* @__PURE__ */ jsx("a", { className: "readMore-button", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "Read more" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "inPlant-sec2 section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1", children: [
      /* @__PURE__ */ jsx("h3", { className: "we-offer-txt advtg-txt blue js-split-text", children: "Advantages of Multi-user Warehousing:" }),
      /* @__PURE__ */ jsx("img", { className: "built-line-img", src: GreyLine, alt: "GreyLine", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800" }),
      /* @__PURE__ */ jsxs("div", { className: "advant-containr", children: [
        /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: [
          /* @__PURE__ */ jsx("img", { src: VersatileStorage, alt: "VersatileStorage" }),
          /* @__PURE__ */ jsx("h4", { children: "Versatile Storage Solutions" }),
          /* @__PURE__ */ jsx("p", { children: "Whether you require short-term, medium-term, or long-term storage, our Multi-user Warehousing accommodates your unique needs." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
          /* @__PURE__ */ jsx("img", { src: Flexible, alt: "Flexible" }),
          /* @__PURE__ */ jsx("h4", { children: "Flexible Payment Options" }),
          /* @__PURE__ */ jsx("p", { children: "Embrace a feasible financial solution that aligns with your budget and cash flow requirements." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          /* @__PURE__ */ jsx("img", { src: Scalable, alt: "Scalable" }),
          /* @__PURE__ */ jsx("h4", { children: "Scalable Storage" }),
          /* @__PURE__ */ jsx("p", { children: "Gain access to extra storage space precisely when needed, ensuring you can seamlessly manage seasonal peaks in demand." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mob-mrgin-btm-o txt-center", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1200", children: "Choose MRS multi-user warehousing to unlock a world of efficiency, flexibility, and cost-effectiveness for your supply chain. Experience shared success in warehousing that adapts to your every requirement." })
    ] }) })
  ] });
}
function innerCTA$4() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "cta-sec section-padd-LR overflow inner-cta-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container", children: /* @__PURE__ */ jsxs("div", { className: "client-img-bx global-cta", children: [
    /* @__PURE__ */ jsx("img", { className: "first_Company-img", src: About_CTA, alt: "About_CTA", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }),
    /* @__PURE__ */ jsxs("div", { className: "client-contnt-bx", children: [
      /* @__PURE__ */ jsxs("h2", { className: "white ttl-60px", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
        "We are the 1st Company in Kutch to Provide Single Largest Warehouse of Grade ",
        /* @__PURE__ */ jsx("span", { className: "bold", children: "A" }),
        " category"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "client-btn inner-cta-btn enquire_btn", id: "btn-styl", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsxs("a", { children: [
        /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Contact Us for Warehousing Excellence" }),
        " ",
        /* @__PURE__ */ jsx("img", { src: white_Arrow, alt: "Arrow", className: "inner-cta-img" })
      ] }) })
    ] })
  ] }) }) }) });
}
function multiuserWarehousing$1() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Multiuser Warehousing Solutions in India | FMCG, Pharma Storage" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Explore MRS Supply Chain's compliant, Grade A warehousing for FMCG, pharmaceuticals, and medical devices. Secure storage tailored to your needs."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Multiuser Warehousing Solutions, Compliant Warehousing, Grade A Warehousing, Best Warehouse for FMCG, Warehousing for Pharma and Medical Devices"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(ServicesSpotlight, {}),
    /* @__PURE__ */ jsx(multiUserAbout$1, {}),
    /* @__PURE__ */ jsx(multiUserAbout, {}),
    /* @__PURE__ */ jsx(multiWarehousing, {}),
    /* @__PURE__ */ jsx(customBonded$1, {}),
    /* @__PURE__ */ jsx(inPlant$1, {}),
    /* @__PURE__ */ jsx(innerCTA$4, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
}
const Warehousing_Solution$7 = "/assets/Road_RailTransport-NAKvfX1m.jpg";
function CustomsServicesSpotlight$2() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow roadRailTrans-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1 servcs-spot-clm1", children: [
      /* @__PURE__ */ jsxs("h1", { className: "js-split-text white", children: [
        "Road & Rail",
        /* @__PURE__ */ jsx("br", {}),
        "Transport"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: "Dependable. Streamlined." }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "1000" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-up", "data-aos-duration": "900", "data-aos-once": "true", "data-aos-delay": "1000", children: "Associate with us to experience seamless, efficient road and rail services" }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "1100", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "#", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Services " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Road & Rail Transport" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Warehousing_Solution$7, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "800" }) }) })
  ] }) });
}
function BuiltmultiUserAbout$3() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "abt_us-section roadRailAbt-sec section-padd-LR overflow", children: [
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black", children: [
      /* @__PURE__ */ jsxs("div", { className: "services-hdng black roadRailAbt-hdngs", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1200", children: [
        /* @__PURE__ */ jsx("a", { href: "/services/road-and-rail-transport#rail", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1250", children: "Rail Freight" }),
        /* @__PURE__ */ jsx("a", { href: "/services/road-and-rail-transport#road", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1500", children: "Road Transportation" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "MRS Transport Solutions: Pioneering Combined Road and Rail Transport from Mundra Port to Northern India." }),
      /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "At MRS, we proudly offer an innovative combination of Road and Rail Transport services, creating a unique and economical logistics solution connecting Mundra Port to the Northern regions of India. This strategic integration of both transportation modes has significantly reduced costs by nearly 30%, providing our clients with an efficient, cost-effective, and tailored approach to their logistics needs." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 multiuser-container2 road-abt-contnr2", id: "no-pad-mob", children: [
      /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsxs("div", { className: "user-numbers-sec", "data-aos": "fade-in", "data-aos-delay": "400", "data-aos-once": "true", children: [
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "0", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: " 30%" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Cost Saving" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "300", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: "100%" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Safe Delivery" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "500", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: "50%" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Less Greenhouse Gas Emission" })
        ] })
      ] })
    ] })
  ] }) });
}
const BuiltWarehousing$3 = "/assets/RailFreight-yHHhWnRV.jpg";
function BuiltmultiUserAbout$2() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "built-to-suit-sec section-padd-LR overflow", id: "rail", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 built-to-suit-container1 white", children: [
    /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: BuiltWarehousing$3, alt: "BuiltWarehousing", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900" }) }),
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Rail Freight" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: "When it comes to rail transport, whether for small or large volumes, MRS Supply Chain offers the flexibility and affordability you need across Pan India. Our rail freight services are designed to cater to your unique requirements, ensuring seamless, reliable, and cost-effective solutions." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "built-ul road-built-ul", children: [
      /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "500", children: [
        /* @__PURE__ */ jsx("h3", { children: "Your Railway Partner:" }),
        /* @__PURE__ */ jsx("p", { children: " At MRS Supply Chain, we excel in providing rail freight services that connect Mundra Port to the Northern Part of India. Supported by cutting-edge logistics management and technology, we stand ready to meet the dynamic demands of today's rail transport landscape. Our approach is driven by a commitment to generating group synergy, allowing us to adapt swiftly to evolving needs." })
      ] }),
      /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
        /* @__PURE__ */ jsx("h3", { children: "Efficiency through Expertise" }),
        /* @__PURE__ */ jsx("p", { children: "Our team of rail transport experts meticulously scrutinises your rail supply and logistics chain, ensuring that your cargo is handled with utmost efficiency and care. We leave no stone unturned in our quest for speedy and secure railway freight services." })
      ] })
    ] }) })
  ] }) }) });
}
const Keyadvantages = "/assets/Keyadvantages-mOHu5tSf.jpg";
function BuiltcustomBonded$2() {
  useEffect(() => {
    $(".cstm-bondReadMore").off("click").on("click", function() {
      $(".cstm-bondReadMore").toggleClass("rotate");
      $(".bond-moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
    $(".accordion-list > li > .answer").hide();
    $(".accordion-list > li").off("click").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
      } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
      }
      return false;
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow roadRailadvantage-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt white js-split-text", children: "Key advantages of choosing rail freight services with MRS Supply Chain:" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row T-B-Padding", id: "road-advnt-accr-rw", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2", children: [
        /* @__PURE__ */ jsxs("ul", { className: "accordion-list road-accordn white", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Rail Freight Efficiency and Network" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsxs("ul", { className: "accordn-list", children: [
              /* @__PURE__ */ jsx("li", { children: "Cost-Efficiency: Enhance the cost-effectiveness of your rail cargo transport." }),
              /* @__PURE__ */ jsx("li", { children: "Extensive Rail Network: Tap into our vast rail distribution network for nationwide reach." })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Rail Transport Reliability and Precision" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsxs("ul", { className: "accordn-list", children: [
              /* @__PURE__ */ jsx("li", { children: "On-Time Delivery Assurance: Improve the reliability of your rail transport schedules for punctual deliveries." }),
              /* @__PURE__ */ jsx("li", { children: "Precision Rail Handling: We ensure precise rail cargo handling, eliminating offloading and over-carrying risks." }),
              /* @__PURE__ */ jsx("li", { children: "Damage-Free Rail Delivery: Cargo safety is our priority, assuring damage-free rail transport." })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Versatile Rail Cargo Handling" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsxs("ul", { className: "accordn-list", children: [
              /* @__PURE__ */ jsx("li", { children: "Versatile Cargo Solutions: We cater to various rail cargo types, including piece cargo, oversized goods, bulk cargo, and dangerous goods rail freight." }),
              /* @__PURE__ */ jsx("li", { children: "Piece Cargo Expertise: Manual or mechanical loading with closed containers and wagons." }),
              /* @__PURE__ */ jsx("li", { children: "Oversized or Heavyweight Rail Cargo: Crane-assisted loading with open cars, transporters, and platforms." })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Specialized Rail Transport Services" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsxs("ul", { className: "accordn-list", children: [
              /* @__PURE__ */ jsx("li", { children: "Safe Handling of Dangerous Goods: We specialise in rail transport of dangerous goods, adhering to special rules, marking, packaging, and safety standards." }),
              /* @__PURE__ */ jsx("li", { children: "Cargo Hazard Class Consideration: We utilise specialised containers based on the hazard class of your rail cargo." }),
              /* @__PURE__ */ jsx("li", { children: "Expert Rail Transportation Services: Our rail transport capabilities extend to various cargo types, including cars, vehicles, machines, oversized goods, perishables with temperature maintenance, and bulk lightweight cargoes." })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "white mob-mrgin-btm-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "By choosing MRS Rail Transport Services, you're not just opting for rail freight; you're choosing efficiency, reliability, and sustainability. Contact us today for a personalised railway freight services plan and elevate your rail operations to new heights. " })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: Keyadvantages, alt: "Keyadvantages", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "1000" }) })
    ] })
  ] }) }) });
}
function BuiltcustomBonded$1() {
  useEffect(() => {
    $(".cstm-bondReadMore").off("click").on("click", function() {
      $(".cstm-bondReadMore").toggleClass("rotate");
      $(".bond-moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
    $(".accordion-list > li > .answer").hide();
    $(".accordion-list > li").off("click").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
      } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
      }
      return false;
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow roadRailLast-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt blue js-split-text", children: "Key advantages of choosing rail freight services with MRS Supply Chain:" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: GreyLine, alt: "GreyLine", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row T-B-Padding50", id: "road-key-adv-rw", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: Inplant$3, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "800" }) }),
      /* @__PURE__ */ jsxs("div", { className: "clm-2", children: [
        /* @__PURE__ */ jsxs("ul", { className: "accordion-list accordn-last-sec", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { className: "black", children: "Diverse Delivery Products" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "We offer a range of delivery options, including both forward and reverse logistics, to suit different logistic needs." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { className: "black", children: "Multimodal Freight Services" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Our customised solutions are designed to provide flexibility and efficiency, integrating different modes of transport to optimise the supply chain." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { className: "black", children: "Guaranteed Timely and Safe Delivery" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "We commit to a 100% on-time delivery rate, ensuring your valuable consignments are delivered safely and promptly." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { className: "black", children: "Professional and Trained Drivers" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Our drivers are not only trained but also adhere to 8-hour shifts coupled with rest breaks, ensuring safety and reliability in your goods transportation." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mob-mrgin-btm-o road-trans-sec-para", id: "road-key-adv-para", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "Whether you need Express or Regular FTL/PTL services, MRS Road Transport is equipped to handle your logistics requirements with the utmost care and professionalism. Our commitment to quality, safety, and timely delivery makes us the ideal partner for your transportation needs. Connect with us to experience a service that not only meets but exceeds your expectations." })
      ] })
    ] })
  ] }) }) });
}
const MultiuserWarehousing$1 = "/assets/RoadTransportation-mfeEhGzR.jpg";
function BuiltmultiWarehousing$1() {
  useEffect(() => {
    $(".readMore-button").off("click").on("click", function() {
      $(".readMore-button").toggleClass("rotate");
      $(".moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "multiwarehouse section-padd-LR overflow road-trnsfm-sec", id: "road", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 black built-to-suit-container1 multiwar-cont1", children: /* @__PURE__ */ jsxs("div", { className: "row built-row road-trnsf-built-rw", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Road Transportation" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "700", children: "At MRS Supply Chain, we pride ourselves on offering a complete range of surface transport services tailored to meet the diverse needs of our customers. Our comprehensive suite of services includes Full Truck Load (FTL), Part Truck Load (PTL), Mid-Mile Goods Transport, Last Mile Delivery (LMD), Long-Haul Transportation, and specialised transportation options such as automobile carriers and liquid tankers." }),
        /* @__PURE__ */ jsx("div", { className: "moretext", children: /* @__PURE__ */ jsx("p", { children: "This array of services ensures that no matter the size or nature of your consignment, we have the perfect solution to meet your requirements." }) }),
        /* @__PURE__ */ jsx("a", { className: "readMore-button", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "Read more" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm road-trnsfm-img", children: /* @__PURE__ */ jsx("img", { src: MultiuserWarehousing$1, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "400" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "section-padd-LR overflow road-trans-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1", children: [
      /* @__PURE__ */ jsx("h3", { className: "we-offer-txt blue js-split-text road-transp-txt", children: "Why MRS Road Transportation Stands Out:" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "built-line-img",
          src: Line$3,
          alt: "Line",
          "data-aos": "fade-in",
          "data-aos-duration": "500",
          "data-aos-once": "true",
          "data-aos-delay": "600"
        }
      ),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "built-ul inplant-ul inplant-ul-bl", children: [
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: [
          /* @__PURE__ */ jsx("h3", { children: "Full Truck Load (FTL) & Part Truck Load (PTL) Services:" }),
          /* @__PURE__ */ jsx("p", { children: "Whether you require an entire truck or just a part of it, our FTL and PTL services are designed to cater to both large and smaller consignments, offering flexibility and efficiency in your cargo movement." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
          /* @__PURE__ */ jsx("h3", { children: "Mid-Mile & Last Mile Delivery:" }),
          /* @__PURE__ */ jsx("p", { children: "We understand the importance of the entire supply chain, from mid-mile goods transport ensuring the rapid movement of goods from warehouses to local distribution centres, to last mile delivery ensuring timely and safe delivery to the final destination." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          /* @__PURE__ */ jsx("h3", { children: "Long-Haul Transportation & Specialized Services:" }),
          /* @__PURE__ */ jsx("p", { children: "Our long-haul transportation services are perfect for moving goods over long distances, while our specialised transportation options like automobile carriers and liquid tankers are ideal for specific types of cargo requiring particular care. " })
        ] })
      ] }) })
    ] }) })
  ] });
}
function RoadRailTransport() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Road and Rail Transport Services in India" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Explore MRS Supply Chain's reliable road freight and cargo rail solutions for efficient transportation."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Road Transport Services, Rail Transport Solutions, Cargo Rail Transportation, Efficient Road Freight, Logistics Transportation"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(CustomsServicesSpotlight$2, {}),
    /* @__PURE__ */ jsx(BuiltmultiUserAbout$3, {}),
    /* @__PURE__ */ jsx(BuiltmultiUserAbout$2, {}),
    /* @__PURE__ */ jsx(BuiltcustomBonded$2, {}),
    /* @__PURE__ */ jsx(BuiltmultiWarehousing$1, {}),
    /* @__PURE__ */ jsx(BuiltcustomBonded$1, {}),
    /* @__PURE__ */ jsx(innerCTA$4, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Inplant$2 = "/assets/Pioneering_spot-PlRV5eBL.jpg";
function CustomsServicesSpotlight$1() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow freeTradeZone-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1 servcs-spot-clm1", children: [
      /* @__PURE__ */ jsxs("h1", { className: "js-split-text white", children: [
        "Pioneering Duty-Free",
        /* @__PURE__ */ jsx("br", {}),
        "Warehousing Solutions"
      ] }),
      /* @__PURE__ */ jsx(
        "h2",
        {
          className: "sldr-sub-ttl",
          "data-aos": "fade-up",
          "data-aos-duration": "800",
          "data-aos-once": "true",
          "data-aos-delay": "400",
          children: "Dependable. Streamlined."
        }
      ),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: Line$4,
          alt: "Line",
          "data-aos": "fade-in",
          "data-aos-duration": "800",
          "data-aos-once": "true",
          "data-aos-delay": "800"
        }
      ),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "white",
          "data-aos": "fade-up",
          "data-aos-duration": "900",
          "data-aos-once": "true",
          "data-aos-delay": "500",
          children: "Empower Your Business with MRS Supply Chain's Free Trade Zone Service"
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "btn inner-spt-btn white",
          "data-aos": "fade-up",
          "data-aos-duration": "1000",
          "data-aos-once": "true",
          "data-aos-delay": "600",
          children: [
            /* @__PURE__ */ jsxs("a", { className: "white-60", href: "/", children: [
              "Home",
              " "
            ] }),
            " > ",
            /* @__PURE__ */ jsx("a", { className: "white-60", children: "Services " }),
            " > ",
            /* @__PURE__ */ jsx("a", { className: "white-60", children: "Customs Brokerage and Regulatory Compliance" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: Inplant$2,
        alt: "Pioneering_spot",
        className: "lToR",
        "data-aos": "fade-in",
        "data-aos-duration": "800",
        "data-aos-once": "true",
        "data-aos-delay": "600"
      }
    ) }) })
  ] }) });
}
function CustomsmultiUserAbout$1() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "abt_us-section custom-broker-abt section-padd-LR overflow", children: [
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black multiuser-container1", children: [
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text delay-10s", children: "Pioneering Duty-Free Warehousing Solutions" }),
      /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "MRS Supply Chain's provision of Free Trade Warehousing Zone (FTWZ) facilities in Kandla, Mundra, and Nhava Sheva signifies a strategic foothold in some of India's busiest and most crucial trade hubs" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 multiuser-container2", id: "no-pad-mob", children: [
      /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsxs("div", { className: "user-numbers-sec", "data-aos": "fade-in", "data-aos-delay": "400", "data-aos-once": "true", children: [
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "0", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: " 25" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Nos International Clients" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "300", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: "15+" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Type of Cargo Handled" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "500", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: "30+" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Types of Value Added Services" })
        ] })
      ] })
    ] })
  ] }) });
}
const ftwz = "/assets/ftwz-VlbH8ihB.jpg";
function CustomsmultiUserAbout() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "built-to-suit-sec section-padd-LR overflow", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 built-to-suit-container1 white", children: /* @__PURE__ */ jsxs("div", { className: "row built-row", id: "pionerr-free-trade-rw", children: [
    /* @__PURE__ */ jsxs("div", { className: "width-60 built-cntnt-clm broker-clm", children: [
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Our Free Trade Warehousing Zone (FTWZ) Services" }),
      /* @__PURE__ */ jsx("h5", { className: "broker-sub-head", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: "A Gateway to Enhanced International Trade and Economic Growth" }),
      /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: "Our Free Trade Warehousing Zones in Kandla, Mundra, and Nava Sheva are designed as part of India's Special Economic Zones initiative. These zones are not just warehousing spaces; they are comprehensive solutions that boost international trade processes, improve business function, and offer immense benefits for storage and value-added activities in line with customs laws." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "width-40 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: ftwz, alt: "ftwz", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900" }) })
  ] }) }) }) });
}
const ftwzServices = "/assets/ftwzServices-iilG3BWD.jpg";
function customBonded() {
  useEffect(() => {
    $(".cstm-bondReadMore").off("click").on("click", function() {
      $(".cstm-bondReadMore").toggleClass("rotate");
      $(".bond-moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
    $(".accordion-list > li > .answer").hide();
    $(".accordion-list > li").off("click").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
      } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
      }
      return false;
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 accordin-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h2", { className: "ttl-45px white js-split-text", children: "Why Opt for MRS Supply Chain’s FTWZ Services?" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row paddng-top", id: "pinonr-accrd-rw", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: ftwzServices, alt: "ftwzServices", className: "accordn-img", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800" }) }),
      /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsxs("ul", { className: "accordion-list white", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Duty Deferral:" }),
          /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Maintain inventory in the FTZ without being subject to customs duties or taxes, facilitating efficient storage and distribution." }) })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Inventory Management: " }),
          /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Enjoy the advantages of storing goods with zero duty and tax implications, optimising cash flow and reducing transit times for shipping." }) })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Streamlined Customs Procedures: " }),
          /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Benefit from simplified customs procedures within the FTZ, minimizing paperwork and accelerating clearance times for imported goods." }) })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Strategic Partnerships: " }),
          /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "MRS Supply Chain has established strategic partnerships with government agencies, customs authorities, and industry associations in FTWZ jurisdictions. These partnerships enable businesses to stay abreast of regulatory changes, access preferential treatment, and leverage additional resources to optimize their FTWZ operations." }) })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Transparent Pricing Structure: " }),
          /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "MRS Supply Chain offers transparent pricing structures and competitive rates for their FTWZ solutions. With no hidden fees or unexpected charges, businesses can accurately forecast costs and budget effectively for their FTWZ operations." }) })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Access to Major Ports: " }),
          /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Kandla, Mundra, and Nhava Sheva boast some of the largest and busiest ports in India, handling a significant portion of the country's maritime trade. MRS Supply Chain's FTWZ facilities capitalize on this strategic advantage, providing seamless integration with port operations for efficient cargo handling and logistics management" }) })
        ] })
      ] }) })
    ] })
  ] }) }) });
}
const WarehousingNeeds$1 = "/assets/WarehousingNeeds-eXXtCje9.jpg";
function CustomsmultiWarehousing() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "multiwarehouse section-padd-LR overflow", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 black built-to-suit-container1 multiwar-cont1", children: /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
    /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text blue", children: "Choose MRS Supply Chain for Your Warehousing Needs" }),
      /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "700", children: "MRS Supply Chain is your ideal partner for navigating the intricacies of free trade warehousing. Our facilities in Kandla, Mundra, and Nava Sheva are tailored to enhance your operational efficiency and support your global trading activities. By choosing us, you're not just selecting a warehousing service; you're opting for a strategic partner in your growth and expansion in international trade." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: WarehousingNeeds$1, alt: "WarehousingNeeds", "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "400" }) })
  ] }) }) }) });
}
function innerCTA$3() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "cta-sec section-padd-LR overflow inner-cta-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container", children: /* @__PURE__ */ jsxs("div", { className: "client-img-bx global-cta", children: [
    /* @__PURE__ */ jsx("img", { className: "first_Company-img", src: About_CTA, alt: "About_CTA", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }),
    /* @__PURE__ */ jsxs("div", { className: "client-contnt-bx", children: [
      /* @__PURE__ */ jsx("h2", { className: "white ttl-60px", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "Experience the unique benefits of our strategically located FTWZ facilities." }),
      /* @__PURE__ */ jsx("div", { className: "client-btn inner-cta-btn enquire_btn", id: "btn-styl", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsxs("a", { children: [
        /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Contact Us for Warehousing Excellence" }),
        " ",
        /* @__PURE__ */ jsx("img", { src: white_Arrow, alt: "Arrow", className: "inner-cta-img" })
      ] }) })
    ] })
  ] }) }) }) });
}
function PioneeringWarehousing() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Duty-Free Warehousing Solutions in Gujarat | FTWZ & SEZ Storage in India" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Discover MRS Supply Chain's duty-free warehousing in Gujarat. FTWZ and SEZ solutions for customs-free storage."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Duty-Free Warehousing, FTWZ Solutions, SEZ Warehousing, Best Duty-Free Warehouse in Gujarat, Customs-Free Storage"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(CustomsServicesSpotlight$1, {}),
    /* @__PURE__ */ jsx(CustomsmultiUserAbout$1, {}),
    /* @__PURE__ */ jsx(CustomsmultiUserAbout, {}),
    /* @__PURE__ */ jsx(customBonded, {}),
    /* @__PURE__ */ jsx(CustomsmultiWarehousing, {}),
    /* @__PURE__ */ jsx(innerCTA$3, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function InPlantServicesSpotlight() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight section inner-spotlight-sec section-padd-LR overflow", id: "light-blue-bg", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsxs("h1", { className: "js-split-text white", children: [
        "Your Warehousing",
        /* @__PURE__ */ jsx("br", {}),
        "Solution"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "400", children: "Dependable. Streamlined." }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "800" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-up", "data-aos-duration": "900", "data-aos-once": "true", "data-aos-delay": "500", children: "Seamless warehousing solutions designed to meet the diverse needs of your business." }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "600", children: [
        /* @__PURE__ */ jsxs("a", { className: "white-60", href: "/", children: [
          "Home ",
          " > "
        ] }),
        /* @__PURE__ */ jsxs("a", { className: "white-60", children: [
          "Services ",
          " > "
        ] }),
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Warehousing Solutions" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Warehousing_Solution$8, alt: "supplyChainImage", className: "lToR" }) }) })
  ] }) });
}
function InPlantmultiUserAbout$1() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "abt_us-section section-padd-LR overflow", children: [
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black multiuser-container1", children: [
      /* @__PURE__ */ jsxs("div", { className: "services-hdng black", "data-aos": "fade-in", "data-aos-duration": "300", "data-aos-once": "true", "data-aos-delay": "200", children: [
        /* @__PURE__ */ jsxs("a", { href: "/services/in-plant-warehouse-management#built", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
          "Built to Suit",
          /* @__PURE__ */ jsx("br", {}),
          "Warehousing"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "/services/in-plant-warehouse-management#multiuser", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "700", children: [
          "Multiuser ",
          /* @__PURE__ */ jsx("br", {}),
          "Warehousing"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "/services/in-plant-warehouse-management#customs", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          "Customs Bonded ",
          /* @__PURE__ */ jsx("br", {}),
          "  Warehouse"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "/services/in-plant-warehouse-management#plant", className: "blue", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
          "In-Plant Warehouse ",
          /* @__PURE__ */ jsx("br", {}),
          "Management"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "Your trusted partner in Gujarat for end-to-end supply chain needs." }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "At MRS, we take pride in being the trusted partner for numerous corporate giants in Gujarat, providing end-to-end supply chain management solutions that drive excellence. With a strategic presence near key sea ports such as Hazira, Kandla, and Mundra, and the privilege of overseeing a Free Trade Warehousing Zone in Mundra, we offer a remarkable total warehousing space of 5 Lakh Sq Ft." }) }),
        /* @__PURE__ */ jsx("div", { className: "clm-2", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsx("p", { className: "mob-mrgin-btm-o", children: 'Our warehousing solutions are designed to meet the diverse needs of businesses. From tailor-made "Built to Suit" facilities to versatile "Multi-user Warehousing," from the convenience of "Customs Bonded Warehouse" services to efficient "In-Plant Warehouse Management," we are more than just warehousing; we are your partner in optimising logistics, streamlining operations, and ensuring unmatched efficiency.' }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 multiuser-container2", children: [
      /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsxs("div", { className: "user-numbers-sec", "data-aos": "fade-in", "data-aos-delay": "400", "data-aos-once": "true", children: [
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "0", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: " 41%" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Dolor sit amet, consectetur adipisci elit" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "300", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: "83%" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Dolor sit amet, consectetur adipisci elit" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "500", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: "67%" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Dolor sit amet, consectetur adipisci elit" })
        ] })
      ] })
    ] })
  ] }) });
}
function InPlantmultiUserAbout() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "built-to-suit-sec section-padd-LR overflow", id: "built", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 built-to-suit-container1 white", children: [
    /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Built to Suit Warehousing" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: "We recognize that one size does not fit all when it comes to warehousing solutions. That's where MRS Built-to-Suit Warehousing comes into play, offering numerous advantages for businesses seeking a truly customised and strategic warehousing approach." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: BuiltWarehousing$4, alt: "BuiltWarehousing", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900" }) })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt js-split-text", children: "At MRS, we offer a cutting-edge solution with your business in mind:" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("ul", { className: "built-ul", children: [
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "500", children: [
          /* @__PURE__ */ jsx("h3", { children: "Tailored to Your Needs" }),
          /* @__PURE__ */ jsx("p", { children: "Our Built-to-Suit Warehousing goes beyond standard offerings. We work closely with you to create a customised space that precisely aligns with your requirements. You specify your needs, we collaborate on the design, and once agreed upon, construction begins." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          /* @__PURE__ */ jsx("h3", { children: "Future-Ready Infrastructure" }),
          /* @__PURE__ */ jsx("p", { children: "With technology advancements and evolving business demands, outdated and undersized facilities can hinder your operations. Our Built-to-Suit Warehousing ensures your facility is equipped with the latest technology and infrastructure, setting you up for long-term success." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
          /* @__PURE__ */ jsx("h3", { children: "Tenant Commitment" }),
          /* @__PURE__ */ jsx("p", { children: "With a pre-leased agreement, you have the assurance of tenancy even before construction begins. This not only provides financial security but also peace of mind, knowing your space is reserved for your specific needs." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsx("h3", { children: "Cost-Efficiency" }),
          /* @__PURE__ */ jsx("p", { children: "By eliminating the need for development expertise and minimising capital requirements, you can redirect your savings towards your core business operations, enhancing your overall efficiency." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsx("h3", { children: "Adapt to Industry Trends" }),
          /* @__PURE__ */ jsx("p", { children: "In an era of increasing consolidation within the warehousing industry, our Built-to-Suit Warehousing solutions accommodate the growing demand for larger and more advanced spaces." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "margin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "At MRS, we understand that your warehousing needs are unique. Our Built-to-Suit Warehousing is your key to a tailored, future-proof facility that not only meets but exceeds your expectations. " })
    ] })
  ] }) }) });
}
function InPlantcustomBonded() {
  useEffect(() => {
    $(".cstm-bondReadMore").off("click").on("click", function() {
      $(".cstm-bondReadMore").toggleClass("rotate");
      $(".bond-moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
    $(".accordion-list > li > .answer").hide();
    $(".accordion-list > li").off("click").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
      } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
      }
      return false;
    });
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec section-padd-LR overflow", id: "customs", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 black built-to-suit-container1 custom-bonded-cntr1", children: /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: CustomsBonded, alt: "CustomsBonded" }) }),
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm white", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Customs Bonded Warehousing" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "500", children: "When it comes to MRS Customs Bonded Warehousing, it's not merely a solution; it's a strategic advantage meticulously designed to benefit businesses like yours. Backed by an illustrious history of being the go-to partner for numerous corporate giants in Gujarat, MRS embodies unmatched proficiency in end-to-end supply chain management. " }),
        /* @__PURE__ */ jsx("div", { className: "bond-moretext", children: /* @__PURE__ */ jsx("p", { children: "At MRS, we present international multi-user warehouses designed with extensive expertise in both B2B and B2C logistics operations across various sectors and goods. Our approach emphasises flexible warehouse space, resource sharing, and process optimization, delivering significant benefits to businesses like yours." }) }),
        /* @__PURE__ */ jsx("a", { className: "cstm-bondReadMore white", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "Read more" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1", children: [
      /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt white js-split-text", children: "Advantages of MRS Customs Bonded Warehousing:" }),
      /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }),
      /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
        /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsxs("ul", { className: "accordion-list white", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Seamless Goods Handling" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Securely store bonded goods until all customs formalities are completed, allowing you to maintain uninterrupted operations. Our strategic locations ensure quick access to ports when needed." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Cost Efficiency" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Securely store bonded goods until all customs formalities are completed, allowing you to maintain uninterrupted operations. Our strategic locations ensure quick access to ports when needed." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Tax Benefits" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Securely store bonded goods until all customs formalities are completed, allowing you to maintain uninterrupted operations. Our strategic locations ensure quick access to ports when needed." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Safety and Compliance" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Securely store bonded goods until all customs formalities are completed, allowing you to maintain uninterrupted operations. Our strategic locations ensure quick access to ports when needed." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Strategic Advantage" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Securely store bonded goods until all customs formalities are completed, allowing you to maintain uninterrupted operations. Our strategic locations ensure quick access to ports when needed." }) })
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Legal Documentation" }),
            /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("p", { children: "Securely store bonded goods until all customs formalities are completed, allowing you to maintain uninterrupted operations. Our strategic locations ensure quick access to ports when needed." }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: Inplant$3, alt: "Inplant" }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "white mob-mrgin-btm-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "At MRS, we don't just provide warehousing; we offer a competitive edge. Choose MRS Customs Bonded Warehousing to streamline your supply chain, reduce costs, and ensure compliance. With us, your goods are secure, your operations remain undisrupted, and your compliance is assured. It's not just a solution; it's a partnership in your success. " })
    ] }) })
  ] });
}
function inPlant() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "inPlant-sec section-padd-LR overflow", id: "plant", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1 inPlant-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "In-Plant Warehouse Management" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "At MRS, we are dedicated to elevating the efficiency of your manufacturing operations through our cutting-edge In-Plant Warehousing Services. We specialise in delivering comprehensive in-plant warehousing solutions meticulously designed to cater to the unique needs of your manufacturing processes." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: Inplant$3, alt: "Inplant" }) })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt blue js-split-text", children: "Our services encompass:" }),
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "built-line-img",
        src: Line$3,
        alt: "Line",
        "data-aos": "fade-in",
        "data-aos-duration": "500",
        "data-aos-once": "true",
        "data-aos-delay": "600"
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("ul", { className: "built-ul inplant-ul", children: [
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: [
          /* @__PURE__ */ jsx("h3", { children: "Tailored Storage Solutions" }),
          /* @__PURE__ */ jsx("p", { children: "We recognize that each manufacturing facility presents its own set of challenges and requirements. Our team of experts is adept at crafting storage solutions that optimise space utilisation, enhance material flow, and ultimately boost overall operational efficiency." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
          /* @__PURE__ */ jsx("h3", { children: "Advanced Inventory Management" }),
          /* @__PURE__ */ jsx("p", { children: "Leveraging state-of-the-art technology, our Inventory Management system provides real-time tracking and control of your materials. From raw materials to finished products, precision and efficiency in inventory management are guaranteed, mitigating the risks of overstocking or stock shortages." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          /* @__PURE__ */ jsx("h3", { children: "Efficient Material Handling" }),
          /* @__PURE__ */ jsx("p", { children: "Our in-plant warehousing services encompass the entire spectrum of material handling within your facility. We ensure that materials are stored, retrieved, and transported within the plant with utmost efficiency and safety, consequently reducing handling time and costs." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
          /* @__PURE__ */ jsx("h3", { children: "Seamless Production Integration" }),
          /* @__PURE__ */ jsx("p", { children: "We closely align our warehousing services with your production schedules, ensuring the just-in-time delivery of materials to the production line. This seamless integration minimises downtime and significantly enhances overall productivity." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsx("h3", { children: "Scalable and Adaptable Solutions" }),
          /* @__PURE__ */ jsx("p", { children: "As your business continues to grow, our services grow alongside you. We offer flexible warehousing solutions capable of adapting to changing demands and increasing production volumes, ensuring that your expansion is fully supported at every stage." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "margin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: "Elevate your manufacturing efficiency with MRS In-Plant Warehousing Services – where precision, innovation, and adaptability converge to enhance your operational excellence." })
    ] })
  ] }) }) });
}
function InPlantmultiWarehousing() {
  useEffect(() => {
    $(".readMore-button").off("click").on("click", function() {
      $(".readMore-button").toggleClass("rotate");
      $(".moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "multiwarehouse section-padd-LR overflow", id: "multiuser", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 black built-to-suit-container1 multiwar-cont1", children: /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: MultiuserWarehousing$2, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "400" }) }),
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Multiuser Warehousing" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "700", children: "At MRS, we present international multi-user warehouses designed with extensive expertise in both B2B and B2C logistics operations across various sectors and goods. Our approach emphasises flexible warehouse space, resource sharing, and process optimization, delivering significant benefits to businesses like yours." }),
        /* @__PURE__ */ jsx("div", { className: "moretext", children: /* @__PURE__ */ jsx("p", { children: "At MRS, we present international multi-user warehouses designed with extensive expertise in both B2B and B2C logistics operations across various sectors and goods. Our approach emphasises flexible warehouse space, resource sharing, and process optimization, delivering significant benefits to businesses like yours." }) }),
        /* @__PURE__ */ jsx("a", { className: "readMore-button", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "Read more" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "inPlant-sec2 section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1", children: [
      /* @__PURE__ */ jsx("h3", { className: "we-offer-txt advtg-txt blue js-split-text", children: "Advantages of Multi-user Warehousing:" }),
      /* @__PURE__ */ jsx("img", { className: "built-line-img", src: GreyLine, alt: "GreyLine", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800" }),
      /* @__PURE__ */ jsxs("div", { className: "advant-containr", children: [
        /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: [
          /* @__PURE__ */ jsx("img", { src: VersatileStorage$1, alt: "VersatileStorage" }),
          /* @__PURE__ */ jsx("h4", { children: "Versatile Storage Solutions" }),
          /* @__PURE__ */ jsx("p", { children: "Whether you require short-term, medium-term, or long-term storage, our Multi-user Warehousing accommodates your unique needs." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
          /* @__PURE__ */ jsx("img", { src: VersatileStorage$1, alt: "VersatileStorage" }),
          /* @__PURE__ */ jsx("h4", { children: "Flexible Payment Options" }),
          /* @__PURE__ */ jsx("p", { children: "Embrace a feasible financial solution that aligns with your budget and cash flow requirements." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          /* @__PURE__ */ jsx("img", { src: VersatileStorage$1, alt: "VersatileStorage" }),
          /* @__PURE__ */ jsx("h4", { children: "Scalable Storage" }),
          /* @__PURE__ */ jsx("p", { children: "Gain access to extra storage space precisely when needed, ensuring you can seamlessly manage seasonal peaks in demand." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mob-mrgin-btm-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1200", children: "Choose MRS multi-user warehousing to unlock a world of efficiency, flexibility, and cost-effectiveness for your supply chain. Experience shared success in warehousing that adapts to your every requirement." })
    ] }) })
  ] });
}
function multiuserWarehousing() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, { threshold: 0.5 });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(InPlantServicesSpotlight, {}),
    /* @__PURE__ */ jsx(InPlantmultiUserAbout$1, {}),
    /* @__PURE__ */ jsx(InPlantmultiUserAbout, {}),
    /* @__PURE__ */ jsx(InPlantmultiWarehousing, {}),
    /* @__PURE__ */ jsx(InPlantcustomBonded, {}),
    /* @__PURE__ */ jsx(inPlant, {}),
    /* @__PURE__ */ jsx(innerCTA$4, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Warehousing_Solution$6 = "/assets/CustomsBrokerage-Qgm4F1Lw.jpg";
function Spotlight() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow customBroker-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1 servcs-spot-clm1", children: [
      /* @__PURE__ */ jsxs("h1", { className: "js-split-text white customs-brok-txt", children: [
        "Customs Brokerage and",
        /* @__PURE__ */ jsx("br", {}),
        "Regulatory Compliance"
      ] }),
      /* @__PURE__ */ jsx(
        "h2",
        {
          className: "sldr-sub-ttl",
          "data-aos": "fade-up",
          "data-aos-duration": "600",
          "data-aos-once": "true",
          "data-aos-delay": "1100",
          children: "Dependable. Streamlined."
        }
      ),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: Line$4,
          alt: "Line",
          "data-aos": "fade-in",
          "data-aos-duration": "600",
          "data-aos-once": "true",
          "data-aos-delay": "1500"
        }
      ),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "white",
          "data-aos": "fade-up",
          "data-aos-duration": "600",
          "data-aos-once": "true",
          "data-aos-delay": "1300",
          children: "Navigating Complexities with Expertise and Precision"
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "btn inner-spt-btn",
          "data-aos": "fade-up",
          "data-aos-duration": "500",
          "data-aos-once": "true",
          "data-aos-delay": "1400",
          children: [
            /* @__PURE__ */ jsxs("a", { className: "white-60", href: "/", children: [
              "Home",
              " "
            ] }),
            " ",
            " > ",
            /* @__PURE__ */ jsx("a", { className: "white-60", children: "Services " }),
            " ",
            " > ",
            /* @__PURE__ */ jsx("a", { className: "white-60", children: "Customs Brokerage and Regulatory Compliance" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: Warehousing_Solution$6,
        alt: "supplyChainImage",
        className: "lToR",
        "data-aos": "fade-in",
        "data-aos-duration": "1000",
        "data-aos-once": "true",
        "data-aos-delay": "600"
      }
    ) }) })
  ] }) });
}
function About() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "abt_us-section roadRailAbt-sec section-padd-LR overflow", children: [
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black", children: [
      /* @__PURE__ */ jsxs("div", { className: "services-hdng black roadRailAbt-hdngs custom-hdng", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1500", children: [
        /* @__PURE__ */ jsxs("a", { href: "/services/customs-brokerage-and-regulatory-compliance#customs", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1800", children: [
          "Customs",
          /* @__PURE__ */ jsx("br", {}),
          "Brokerage Service"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "/services/customs-brokerage-and-regulatory-compliance#foreign", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1900", children: [
          "Foreign ",
          /* @__PURE__ */ jsx("br", {}),
          "Trade Compliance"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Seamless Imports/Exports , Stress-Free Compliance: Trust us as your Customs House Agents" }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "In the intricate world of global trade, regulatory compliance and documentation stand as pivotal elements, ensuring smooth business operations. At MRS Supply Chain, we understand the complexities and nuances of this domain. Our dedicated services are designed to streamline these processes, making them more efficient and less cumbersome for businesses of all sizes. " }) }),
        /* @__PURE__ */ jsx("div", { className: "clm-2", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "By leveraging our expertise in various domains, such as 100% EOU, SEZ, Public & Private Bonded Warehouse, MOOWR, and allied compliances, which require very specific expertise to make operations seamless, our team of experts helps you navigate the maze of international trade regulations and paperwork, ensuring your operations are compliant and efficient." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 multiuser-container2 road-abt-contnr2", id: "no-pad-mob", children: [
      /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsxs("div", { className: "user-numbers-sec custom-brkrgNumSec", "data-aos": "fade-in", "data-aos-delay": "400", "data-aos-once": "true", children: [
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: " 1.5K+" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Total no. of Clients Served" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: "18K+" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Total no. of MT Cargo Handled" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", children: [
          /* @__PURE__ */ jsx("h4", { className: "numbers blue", children: "2K+" }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Total no. of TEUs Handled of Import Cargo Handled Every Year" })
        ] })
      ] })
    ] })
  ] }) });
}
const BuiltWarehousing$2 = "/assets/ForeignTrade-uIwh1ipt.jpg";
function customsBrokServices() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "built-to-suit-sec section-padd-LR overflow", id: "customs", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 built-to-suit-container1 white", children: [
    /* @__PURE__ */ jsx("h3", { className: "ttl-45px js-split-text", children: "Customs Brokerage Service " }),
    /* @__PURE__ */ jsx("p", { className: "ttl-25px bold mrgin-btm-o", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: "Foreign Trade Compliance: Expert guidance for compliance and regulatory success" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row customs-row compliance-row", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsxs("ul", { className: "built-ul customsBrok-ul compliance-ul", children: [
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: [
          /* @__PURE__ */ jsx("h3", { children: "Experienced Customs Team" }),
          /* @__PURE__ */ jsx("p", { children: "Our team at MRS is not just skilled; they are seasoned experts in customs brokerage. With extensive qualifications and a wealth of experience, they handle a wide array of customs documentation for various cargo types. Our successful case studies reflect our proficiency in delivering exceptional service, consistently ensuring that our clients' consignments clear customs swiftly and without any hitches." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: [
          /* @__PURE__ */ jsx("h3", { children: "Centralised Documentation Cell (CDC)" }),
          /* @__PURE__ */ jsx("p", { children: "The Centralised Documentation Cell (CDC) at MRS is a cornerstone of our customs brokerage service. This specialised unit manages and simplifies the extensive documentation requirements inherent in international trade. By centralising this function, we have significantly enhanced the efficiency of the documentation process, reducing risks and saving valuable time for our clients." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: BuiltWarehousing$2, alt: "BuiltWarehousing", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000" }) })
    ] })
  ] }) }) });
}
const BuiltWarehousing$1 = "/assets/ForeignTradeCompliance-bWD_pz5x.jpg";
const Line$2 = "data:image/svg+xml,%3csvg%20width='1179'%20height='1'%20viewBox='0%200%201179%201'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cline%20x1='4.37114e-08'%20y1='0.5'%20x2='1179'%20y2='0.500103'%20stroke='%23002FD4'%20stroke-dasharray='4%204'/%3e%3c/svg%3e";
function foreignTrade() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "section-padd-LR overflow grey-bg", id: "foreign", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 built-to-suit-container1 black", children: [
    /* @__PURE__ */ jsx("h3", { className: "ttl-45px js-split-text", children: "Foreign Trade Compliance " }),
    /* @__PURE__ */ jsx("p", { className: "ttl-25px bold mrgin-btm-o blue", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: "Expert guidance for compliance and regulatory success" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$2, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row customs-row", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: BuiltWarehousing$1, alt: "BuiltWarehousing", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900" }) }),
      /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsx("p", { className: "ttl-25px trade-para", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "1000", children: "Our depth of knowledge in Foreign Trade compliance, including Free Trade Agreements and their compliance, Export and Import benefits, duty-free import licenses like EPCG, Advance Authorization, MOOWR scheme, etc., is unmatched. Our team stays abreast of the ever-changing regulations, ensuring that your business is not only compliant but also protected from potential noncompliance, penalties, and delays. We understand the intricacies of foreign trade laws and utilize this expertise to facilitate smooth and lawful international trade for our clients." }) })
    ] })
  ] }) }) });
}
const Comprehensive = "/assets/ComprehensiveCustoms-Bi66g5JW.jpg";
const Line$1 = "data:image/svg+xml,%3csvg%20width='1132'%20height='1'%20viewBox='0%200%201132%201'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cline%20x1='4.37114e-08'%20y1='0.5'%20x2='1132'%20y2='0.500099'%20stroke='%230A0A0A'%20stroke-dasharray='4%204'/%3e%3c/svg%3e";
function comprehensive() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 built-to-suit-container1 black", children: [
    /* @__PURE__ */ jsx("h3", { className: "ttl-45px js-split-text", children: "Comprehensive Customs & Foreign Trade Compliance Services " }),
    /* @__PURE__ */ jsx("p", { className: "ttl-25px bold mrgin-btm-o", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: "Your Partner in Comprehensive Customs & Foreign Trade Compliance Services" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$1, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row customs-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2", children: [
        /* @__PURE__ */ jsx("p", { className: "ttl-25px trade-para", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: "At MRS, we are more than just a service provider; we are your partner in navigating the complex world of customs. Our extensive range of customised customs services is designed to align with the unique requirements of your business. From the initial planning stages to the final delivery, our dedicated team is equipped to manage every aspect of the customs process. We ensure a seamless and stress-free experience, allowing you to focus on your core business operations while we handle the intricacies of customs compliance and documentation." }),
        /* @__PURE__ */ jsx("ul", { className: "built-ul customsBrok-ul", children: /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "500", children: [
          /* @__PURE__ */ jsx("h3", { children: "Pre/Post Shipment Consultancy Services:" }),
          /* @__PURE__ */ jsx("p", { children: "Our consultancy services are designed to assist businesses in both pre and post-shipment stages. We provide expert advice on the most efficient and cost-effective shipping methods, documentation requirements, and customs procedures. This proactive approach helps anticipate and resolve potential issues before they arise, ensuring smooth transit of your goods." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: Comprehensive, alt: "BuiltWarehousing", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "1000" }) })
    ] })
  ] }) }) });
}
const Line = "data:image/svg+xml,%3csvg%20width='1318'%20height='1'%20viewBox='0%200%201318%201'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cline%20x1='-4.37114e-08'%20y1='0.5'%20x2='1511'%20y2='0.499868'%20stroke='white'%20stroke-dasharray='4%204'/%3e%3c/svg%3e";
const Experienced = "/assets/Experienced-BE4PgPjX.svg";
const Diverse = "/assets/Diverse-Nj5aX5vs.svg";
const Custom = "/assets/Custom-cfbHuS7d.svg";
const Smooth = "data:image/svg+xml,%3csvg%20width='80'%20height='80'%20viewBox='0%200%2080%2080'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M69.4361%2033.1022C69.1064%2033.1022%2068.7767%2033.05%2068.4573%2032.948C67.9269%2032.7748%2067.3553%2033.0705%2067.1853%2033.6034C67.0145%2034.1355%2067.3078%2034.7047%2067.8408%2034.8755C68.3594%2035.0416%2068.8962%2035.1261%2069.4362%2035.1261C73.6279%2035.1261%2077.0378%2038.5359%2077.0378%2042.7276V55.1951C77.0378%2059.382%2073.6279%2062.7887%2069.4362%2062.7887H39.4255C38.8665%2062.7887%2038.4136%2063.2417%2038.4136%2063.8008C38.4136%2064.3598%2038.8665%2064.8126%2039.4255%2064.8126H69.4361C74.7433%2064.8126%2079.0614%2060.4984%2079.0614%2055.1951V42.7276C79.0614%2037.4205%2074.7433%2033.1022%2069.4361%2033.1022Z'%20fill='%23F1F3F4'/%3e%3cpath%20d='M69.4361%2058.3598H39.4255C38.8665%2058.3598%2038.4136%2058.8128%2038.4136%2059.3717C38.4136%2059.9306%2038.8665%2060.3835%2039.4255%2060.3835H69.4361C72.2972%2060.3835%2074.6255%2058.0553%2074.6255%2055.1942V42.7267C74.6255%2039.8656%2072.2972%2037.5381%2069.4361%2037.5381C66.8326%2037.5381%2064.4395%2036.2209%2063.0362%2034.0153C62.7358%2033.5424%2062.1112%2033.4065%2061.6392%2033.7046C61.1672%2034.0051%2061.0289%2034.6304%2061.3286%2035.1017C63.1058%2037.8948%2066.1369%2039.5621%2069.4361%2039.5621C71.1817%2039.5621%2072.6015%2040.982%2072.6015%2042.7268V55.1943C72.6015%2056.9399%2071.1817%2058.3598%2069.4361%2058.3598Z'%20fill='%23F1F3F4'/%3e%3cpath%20d='M36.3865%2073.1972V49.9794C36.3865%2048.3539%2035.0638%2047.0312%2033.4376%2047.0312C16.7338%2047.0312%2021.0133%2047.0312%203.88709%2047.0312C2.26162%2047.0312%200.938965%2048.3539%200.938965%2049.9794V73.1973C0.938965%2074.8236%202.26162%2076.1462%203.88709%2076.1462H33.4376C35.0638%2076.1461%2036.3865%2074.8234%2036.3865%2073.1972ZM21.4183%2049.0552V57.2448C21.4183%2057.8172%2020.9527%2058.2828%2020.3812%2058.2828H16.9444C16.3721%2058.2828%2015.9065%2057.8172%2015.9065%2057.2448V49.0552H21.4183ZM2.96287%2073.1972V49.9794C2.96287%2049.4694%203.37709%2049.0552%203.88709%2049.0552H13.8824V57.2448C13.8824%2058.9336%2015.2557%2060.3067%2016.9443%2060.3067H20.381C22.069%2060.3067%2023.4421%2058.9334%2023.4421%2057.2448V49.0552H33.4374C33.9474%2049.0552%2034.3624%2049.4694%2034.3624%2049.9794V73.1973C34.3624%2073.7073%2033.9474%2074.1223%2033.4374%2074.1223H3.88709C3.37709%2074.1222%202.96287%2073.7072%202.96287%2073.1972Z'%20fill='%23F1F3F4'/%3e%3cpath%20d='M13.0459%2066.0977H6.68717C6.12826%2066.0977%205.67529%2066.5506%205.67529%2067.1095C5.67529%2067.6684%206.12826%2068.1214%206.68717%2068.1214H13.0459C13.6048%2068.1214%2014.0578%2067.6684%2014.0578%2067.1095C14.0578%2066.5506%2013.6048%2066.0977%2013.0459%2066.0977Z'%20fill='%23F1F3F4'/%3e%3cpath%20d='M10.6512%2069.8262H6.68717C6.12826%2069.8262%205.67529%2070.2791%205.67529%2070.8382C5.67529%2071.3973%206.12826%2071.8501%206.68717%2071.8501H10.6512C11.2101%2071.8501%2011.6631%2071.3971%2011.6631%2070.8382C11.6631%2070.2793%2011.2101%2069.8262%2010.6512%2069.8262Z'%20fill='%23F1F3F4'/%3e%3cpath%20d='M63.0472%203.85352C57.3628%203.85352%2052.7388%208.47851%2052.7388%2014.1627C52.7388%2017.367%2055.821%2021.6279%2058.5674%2024.7916C56.4567%2025.4371%2055.2283%2026.5251%2055.2283%2027.8557C55.2283%2030.2741%2059.1622%2031.5398%2063.0488%2031.5398C66.9345%2031.5398%2070.8685%2030.274%2070.8685%2027.8557C70.8685%2026.5246%2069.6392%2025.4365%2067.5275%2024.7912C70.2739%2021.6274%2073.3556%2017.367%2073.3556%2014.1629C73.3556%208.47836%2068.7314%203.85352%2063.0472%203.85352ZM63.0472%205.87742C67.6152%205.87742%2071.3317%209.59398%2071.3317%2014.1627C71.3317%2017.2484%2067.0752%2022.6015%2063.0922%2026.5821C63.0716%2026.6027%2063.0227%2026.6027%2063.0021%2026.5821C59.0191%2022.6015%2054.7625%2017.2485%2054.7625%2014.1627C54.7627%209.59398%2058.4792%205.87742%2063.0472%205.87742ZM68.8446%2027.8557C68.8446%2028.2826%2066.8514%2029.5159%2063.0488%2029.5159C59.2453%2029.5159%2057.2522%2028.2826%2057.2522%2027.8557C57.2522%2027.6654%2057.9628%2026.9232%2060.0977%2026.488C60.6483%2027.0759%2061.1558%2027.598%2061.5713%2028.013C61.9658%2028.4084%2062.4906%2028.6257%2063.0474%2028.6257C63.6039%2028.6257%2064.1289%2028.4084%2064.5235%2028.013C64.9389%2027.5979%2065.4466%2027.0755%2065.9974%2026.4877C68.1333%2026.9227%2068.8446%2027.6652%2068.8446%2027.8557Z'%20fill='%23F1F3F4'/%3e%3cpath%20d='M68.1658%2013.798C68.1658%2010.9756%2065.8698%208.67969%2063.0475%208.67969C60.2251%208.67969%2057.9292%2010.9756%2057.9292%2013.798C57.9292%2016.6203%2060.2251%2018.9163%2063.0475%2018.9163C65.8698%2018.9163%2068.1658%2016.6205%2068.1658%2013.798ZM59.9531%2013.798C59.9531%2012.0919%2061.3414%2010.7036%2063.0475%2010.7036C64.7536%2010.7036%2066.1419%2012.0919%2066.1419%2013.798C66.1419%2015.5041%2064.7536%2016.8923%2063.0475%2016.8923C61.3414%2016.8923%2059.9531%2015.5041%2059.9531%2013.798Z'%20fill='%23F1F3F4'/%3e%3c/svg%3e";
const Deep = "/assets/Deep-KFLkL6rC.svg";
const Reduced = "/assets/Reduced-fUZewDb1.svg";
const Minimise = "/assets/Minimise-QWgoc7DK.svg";
const Enhanced$1 = "/assets/Enhanced-KSo9vWUq.svg";
function Advantages() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "compliance-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 white built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt advtg-txt js-split-text orange", children: "Key advantages of choosing MRS Supply Chain:" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line, alt: "GreyLine", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800" }),
    /* @__PURE__ */ jsxs("div", { className: "advant-containr compliance-containr", children: [
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("img", { src: Experienced, alt: "Experienced" }),
        /* @__PURE__ */ jsx("h4", { className: "orange", children: "Experienced Team" }),
        /* @__PURE__ */ jsx("p", { children: "A skilled and knowledgeable team well-versed in the nuances of international logistics." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("img", { src: Diverse, alt: "Diverse" }),
        /* @__PURE__ */ jsx("h4", { className: "orange", children: "Diverse Cargo Expertise" }),
        /* @__PURE__ */ jsx("p", { children: "Proficiency in handling a wide variety of cargo types, ensuring versatility in service." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("img", { src: Custom, alt: "Custom" }),
        /* @__PURE__ */ jsx("h4", { className: "orange", children: "Custom-Tailored Solutions" }),
        /* @__PURE__ */ jsx("p", { children: "Commitment to providing solutions specifically tailored to meet your unique requirements." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("img", { src: Smooth, alt: "Smooth" }),
        /* @__PURE__ */ jsx("h4", { className: "orange", children: "Smooth Cargo Movement" }),
        /* @__PURE__ */ jsx("p", { children: "Ensuring your cargo moves efficiently and compliantly through global trade channels." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("img", { src: Deep, alt: "Deep" }),
        /* @__PURE__ */ jsx("h4", { className: "orange", children: "Deep Regulatory Knowledge" }),
        /* @__PURE__ */ jsx("p", { children: "In-depth understanding of customs regulations and procedures." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("img", { src: Reduced, alt: "Reduced" }),
        /* @__PURE__ */ jsx("h4", { className: "orange", children: "Reduced Delays" }),
        /* @__PURE__ */ jsx("p", { children: "Expertise that translates into fewer delays in the shipping process." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("img", { src: Minimise, alt: "Minimise" }),
        /* @__PURE__ */ jsx("h4", { className: "orange", children: "Minimise Risk of Penalties" }),
        /* @__PURE__ */ jsx("p", { children: "Vigilant compliance strategies to minimise the risk of penalties and fines." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("img", { src: Enhanced$1, alt: "Enhanced" }),
        /* @__PURE__ */ jsx("h4", { className: "orange", children: "Enhanced Operational Efficiency" }),
        /* @__PURE__ */ jsx("p", { children: "Streamlining your logistics operations for greater efficiency and cost-effectiveness." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mob-mrgin-btm-o complieance-Advbottom-para txt-center", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: "Choose MRS multi-user warehousing to unlock a world of efficiency, flexibility, and cost-effectiveness for your supply chain. Experience shared success in warehousing that adapts to your every requirement." })
  ] }) }) });
}
function innerCTA$2() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "cta-sec section-padd-LR overflow inner-cta-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container", children: /* @__PURE__ */ jsxs("div", { className: "client-img-bx global-cta", children: [
    /* @__PURE__ */ jsx("img", { className: "first_Company-img", src: About_CTA, alt: "About_CTA", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }),
    /* @__PURE__ */ jsxs("div", { className: "client-contnt-bx", children: [
      /* @__PURE__ */ jsxs("h2", { className: "white ttl-60px", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
        "We are the 1st Company in Kutch to Provide Single Largest Warehouse of Grade ",
        /* @__PURE__ */ jsx("span", { className: "bold", children: "A" }),
        " category"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "client-btn inner-cta-btn enquire_btn", id: "btn-styl", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsxs("a", { children: [
        /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Discover our Offering Now" }),
        " ",
        /* @__PURE__ */ jsx("img", { src: white_Arrow, alt: "Arrow", className: "inner-cta-img" })
      ] }) })
    ] })
  ] }) }) }) });
}
function CustomsBrokerageCompliance() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Customs Brokerage Services & Regulatory Compliance in Gujarat" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Partner with the best CHA in Gujarat for seamless customs clearance & import-export compliance."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Customs Brokerage Services, Regulatory Compliance, Best CHA in Gujarat, Customs Clearance Solutions, Import and Export Compliance"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(Spotlight, {}),
    /* @__PURE__ */ jsx(About, {}),
    /* @__PURE__ */ jsx(customsBrokServices, {}),
    /* @__PURE__ */ jsx(foreignTrade, {}),
    /* @__PURE__ */ jsx(comprehensive, {}),
    /* @__PURE__ */ jsx(Advantages, {}),
    /* @__PURE__ */ jsx(innerCTA$2, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Warehousing_Solution$5 = "/assets/Tech-DrivenLast-bLbkh36p.jpg";
function CustomsServicesSpotlight() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow techLastMile-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1 servcs-spot-clm1", children: [
      /* @__PURE__ */ jsxs("h1", { className: "js-split-text white", children: [
        "Tech-Driven Last-Mile ",
        /* @__PURE__ */ jsx("br", {}),
        "Delivery Services"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: "Dependable. Streamlined." }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: "Revolutionising Last-Mile Delivery" }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Services " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Last-Mile Delivery" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Warehousing_Solution$5, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "1000" }) }) })
  ] }) });
}
function BuiltmultiUserAbout$1() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "roadRailAbt-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black tech-driven-numbrs1", children: [
    /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text delay-10s", children: "Tech-Driven Last-Mile Delivery Services" }),
    /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "In today's fast-paced world, the efficiency of last-mile delivery is not just an option but a necessity. MRS Supply Chain is at the forefront of revolutionizing this critical segment with our cutting-edge, tech-driven last-mile delivery services. We understand the pivotal role that timely and reliable deliveries play in customer satisfaction and operational success. By integrating advanced technology into our last-mile delivery processes, we ensure unmatched precision, speed, and reliability, setting new standards in the logistics and supply chain industry." })
  ] }) }) });
}
const BuiltWarehousing = "/assets/AboutLast-MileDelivery-9U3rsqRU.jpg";
function BuiltmultiUserAbout() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "built-to-suit-sec section-padd-LR overflow", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 built-to-suit-container1 white", children: /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
    /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: BuiltWarehousing, alt: "BuiltWarehousing", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800" }) }),
    /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: "Last-Mile Delivery" }),
      /* @__PURE__ */ jsx("p", { className: "last-mile-cntn", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: "At MRS Supply Chain, technology is the backbone of our last-mile delivery solutions. Our approach leverages the latest in AI, IoT, and machine learning to streamline delivery processes, from automated dispatching to dynamic route optimization. Real-time tracking and advanced analytics empower us to make informed decisions, adapt to changing conditions, and consistently deliver on time, every time." })
    ] })
  ] }) }) }) });
}
const Inplant$1 = "/assets/Last-MileDeliveryFeatures-s0RpdJzk.jpg";
function BuiltcustomBonded() {
  useEffect(() => {
    $(".cstm-bondReadMore").off("click").on("click", function() {
      $(".cstm-bondReadMore").toggleClass("rotate");
      $(".bond-moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
    $(".accordion-list > li > .answer").hide();
    $(".accordion-list > li").off("click").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
      } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
      }
      return false;
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow lastMile-accr-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt white js-split-text key-fetr-ttl", children: "Key Features of Our Last Mile Delivery Service:" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row T-B-Padding B-padding-o", id: "lastMile-accro-rw", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsxs("ul", { className: "accordion-list last-mile-accrdn white", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Customer Support: " }),
          /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("ul", { className: "accordn-list", children: /* @__PURE__ */ jsx("p", { children: "MRS Supply Chain provides dedicated customer support to address any inquiries or concerns related to last mile deliveries, ensuring a positive customer experience." }) }) })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Automated Dispatch: " }),
          /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("ul", { className: "accordn-list", children: /* @__PURE__ */ jsx("p", { children: "Our automated dispatch system intelligently assigns delivery tasks to drivers based on factors such as proximity to the delivery location, driver availability, and vehicle capacity. This automated process eliminates manual intervention, ensuring swift dispatch and minimizing idle time, ultimately leading to faster deliveries." }) }) })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Dynamic Route Optimization: " }),
          /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("ul", { className: "accordn-list", children: /* @__PURE__ */ jsx("p", { children: "Leveraging advanced route optimization algorithms, we dynamically adjust delivery routes in real-time to account for factors like traffic congestion, road closures, and delivery priority. By continuously optimizing routes, we maximize efficiency, reduce delivery times, and enhance overall service reliability." }) }) })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Cost Efficiency: " }),
          /* @__PURE__ */ jsx("div", { className: "answer", children: /* @__PURE__ */ jsx("ul", { className: "accordn-list", children: /* @__PURE__ */ jsx("p", { children: "By optimizing routes and leveraging technology, MRS Supply Chain maximizes cost efficiency in last mile deliveries, helping businesses minimize transportation costs and improve profitability." }) }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: Inplant$1, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "1000" }) })
    ] })
  ] }) }) });
}
const MultiuserWarehousing = "/assets/PartnerWithUs-d0JLMqDS.jpg";
function BuiltmultiWarehousing() {
  useEffect(() => {
    $(".readMore-button").off("click").on("click", function() {
      $(".readMore-button").toggleClass("rotate");
      $(".moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "multiwarehouse section-padd-LR overflow road-trnsfm-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 black built-to-suit-container1 multiwar-cont1", children: /* @__PURE__ */ jsxs("div", { className: "row built-row road-trnsf-built-rw", children: [
    /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text blue", children: "Why Partner with Us for Last-Mile Delivery?" }),
      /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "700", children: "MRS Supply Chain is not just a provider; we are your partner in achieving logistics excellence. Our commitment to innovation, combined with our deep understanding of the logistics and supply chain challenges, makes us the ideal choice for businesses looking to enhance their last-mile delivery capabilities. With MRS, you can expect a seamless, efficient, and future-proof delivery solution that grows with your business." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: MultiuserWarehousing, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "400" }) })
  ] }) }) }) });
}
const Enhanced = "/assets/Enhanced-Zbw22htF.svg";
const Operational = "/assets/Operational-mlFAVyz5.svg";
const Scalability = "data:image/svg+xml,%3csvg%20width='80'%20height='81'%20viewBox='0%200%2080%2081'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_2009_836)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M37.9391%2042.0046V21.2824L31.5941%2027.6274L28.3703%2024.4037L38.6069%2014.1671C39.497%2013.277%2040.9405%2013.277%2041.8306%2014.1671L52.0672%2024.4037L48.8434%2027.6274L42.4984%2021.2824V42.0046C47.8484%2042.4674%2052.8967%2044.5632%2057.0081%2048.0162L71.6695%2033.3548H62.6886V28.8107H77.1653C78.42%2028.8107%2079.4373%2029.828%2079.4373%2031.0827V45.5595H74.8933V36.5785L60.2319%2051.2399C64.1917%2055.9546%2066.3417%2061.8641%2066.3417%2068.0293V68.3418H61.7823V68.0293C61.7823%2062.2904%2059.5241%2056.8388%2055.4667%2052.7815C51.4094%2048.7241%2045.9578%2046.4659%2040.2189%2046.4659C34.48%2046.4659%2029.0284%2048.7241%2024.9711%2052.7815C20.9137%2056.8388%2018.6555%2062.2904%2018.6555%2068.0293V68.3418H14.0961V68.0293C14.0961%2061.8643%2016.2461%2055.9546%2020.2059%2051.2399L5.54453%2036.5785V45.5595H1L1%2031.0827C1%2029.828%202.01734%2028.8107%203.27203%2028.8107H17.7488V33.3548H8.76781L23.4292%2048.0162C27.5406%2044.5632%2032.5891%2042.4674%2037.9391%2042.0046Z'%20fill='%23FC7B12'%20stroke='%23E6E6E6'%20stroke-width='1.5'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2009_836'%3e%3crect%20width='80'%20height='80'%20fill='white'%20transform='matrix(0%20-1%201%200%200%2080.5)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const Eco = "/assets/Eco-rZcnIv8W.svg";
function benefitTechService() {
  useEffect(() => {
    $(".readMore-button").off("click").on("click", function() {
      $(".readMore-button").toggleClass("rotate");
      $(".moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "benefit-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt advtg-txt orange js-split-text", children: "Benefits of Choosing Our Tech-Driven Service" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: GreyLine, alt: "GreyLine", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800" }),
    /* @__PURE__ */ jsx("p", { className: "mob-mrgin-btm-o center benefit-para", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1200", children: "Choosing MRS Supply Chain's tech-driven last-mile delivery services brings numerous benefits:" }),
    /* @__PURE__ */ jsxs("div", { className: "advant-containr", children: [
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: [
        /* @__PURE__ */ jsx("img", { src: Enhanced, alt: "Enhanced" }),
        /* @__PURE__ */ jsx("h4", { children: "Enhanced Customer Satisfaction" }),
        /* @__PURE__ */ jsx("p", { children: "A skilled and knowledgeable team well-versed in the nuances of international logistics." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
        /* @__PURE__ */ jsx("img", { src: Operational, alt: "Operational" }),
        /* @__PURE__ */ jsx("h4", { children: "Operational Efficiency" }),
        /* @__PURE__ */ jsx("p", { children: "Proficiency in handling a wide variety of cargo types, ensuring versatility in service." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
        /* @__PURE__ */ jsx("img", { src: Scalability, alt: "Scalability" }),
        /* @__PURE__ */ jsx("h4", { children: "Scalability" }),
        /* @__PURE__ */ jsx("p", { children: "Commitment to providing solutions specifically tailored to meet your unique requirements." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
        /* @__PURE__ */ jsx("img", { src: Eco, alt: "Eco" }),
        /* @__PURE__ */ jsx("h4", { children: "Eco-Friendly Deliveries" }),
        /* @__PURE__ */ jsx("p", { children: "Ensuring your cargo moves efficiently and compliantly through global trade channels." })
      ] })
    ] })
  ] }) }) });
}
function innerCTA$1() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "cta-sec section-padd-LR overflow inner-cta-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container", children: /* @__PURE__ */ jsxs("div", { className: "client-img-bx global-cta", children: [
    /* @__PURE__ */ jsx("img", { className: "first_Company-img", src: About_CTA, alt: "About_CTA", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }),
    /* @__PURE__ */ jsxs("div", { className: "client-contnt-bx", children: [
      /* @__PURE__ */ jsxs("h2", { className: "white ttl-60px", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
        "We are the 1st Company in Kutch to Provide Single Largest Warehouse of Grade ",
        /* @__PURE__ */ jsx("span", { className: "bold", children: "A" }),
        " category"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "client-btn inner-cta-btn enquire_btn", id: "btn-styl", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsxs("a", { children: [
        /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Discover our Offering Now" }),
        " ",
        /* @__PURE__ */ jsx("img", { src: white_Arrow, alt: "Arrow", className: "inner-cta-img" })
      ] }) })
    ] })
  ] }) }) }) });
}
function TechDrivenService() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Tech-Driven Last-Mile Delivery Services in India" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Experience fast e-commerce delivery services powered by cutting-edge logistics technology."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Last-Mile Delivery Services, Tech-Driven Logistics, Efficient Last-Mile Solutions, Fast Delivery Services, E-commerce Delivery"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(CustomsServicesSpotlight, {}),
    /* @__PURE__ */ jsx(BuiltmultiUserAbout$1, {}),
    /* @__PURE__ */ jsx(BuiltmultiUserAbout, {}),
    /* @__PURE__ */ jsx(BuiltcustomBonded, {}),
    /* @__PURE__ */ jsx(benefitTechService, {}),
    /* @__PURE__ */ jsx(BuiltmultiWarehousing, {}),
    /* @__PURE__ */ jsx(innerCTA$1, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function ImportManageServicesSpotlight() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight section inner-spotlight-sec section-padd-LR overflow wareHousing-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsxs("h1", { className: "js-split-text white", children: [
        "Import",
        /* @__PURE__ */ jsx("br", {}),
        "Management"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: "Efficient, Reliable, and Compliant Import Management Services Across Industries" }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: "Streamline Your Imports with India’s Leading Import Management Partner." }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Services " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Import Management" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: ImportManagement, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "1000" }) }) })
  ] }) });
}
function ImportManagemultiUserAbout() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "abt_us-section section-padd-LR overflow", children: [
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black multiuser-container1", children: [
      /* @__PURE__ */ jsxs("div", { className: "services-hdng black", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "400", children: [
        /* @__PURE__ */ jsx("a", { href: "/services/import-management#AboutIME", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "600", children: "About MRS’s Import Management Expertise" }),
        /* @__PURE__ */ jsxs("a", { href: "/services/import-management#DetailedServicesBreakdown", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "700", children: [
          "Detailed ",
          /* @__PURE__ */ jsx("br", {}),
          "Services Breakdown"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "/services/import-management#BenefitsChoosingMRS", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: [
          "Benefits of ",
          /* @__PURE__ */ jsx("br", {}),
          " Choosing MRS"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "/services/import-management#CaseStudies", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: [
          "Case Studies/ ",
          /* @__PURE__ */ jsx("br", {}),
          "Success Stories"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "Your Trusted Partner in Gujarat for Comprehensive Import Management" }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "When working for an importer, managing the entire import process is crucial. This includes meticulous attention to documentation, customs clearance, and the timely release of goods. From the moment a container arrives at the port to its clearance and final handover to the importer, every step requires precision and timely execution to ensure a smooth import process." }) }),
        /* @__PURE__ */ jsx("div", { className: "clm-2", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsx("p", { className: "mob-mrgin-btm-o", children: "At MRS, we are proud to be the preferred import management partner for leading businesses across Gujarat. With our strategic presence near major ports like Hazira, Kandla, and Mundra, and the unique advantage of managing a Free Trade Warehousing Zone in Mundra, we facilitate seamless import processes backed by our robust infrastructure, including 3.5 Lakh Sq Ft of warehousing space." }) }),
        /* @__PURE__ */ jsx("div", { className: "clm-2", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsx("p", { className: "mob-mrgin-btm-o", children: "Our import management solutions are tailored to meet the unique requirements of diverse industries. From expert Customs Brokerage to streamlined Logistics Coordination, and from Compliance Assurance to End-to-End Handling, we go beyond just managing imports. We are your strategic partner in ensuring efficient, cost-effective, and compliant import operations that enhance your supply chain’s efficiency." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 multiuser-container2", id: "no-pad-mob", children: [
      /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsxs("div", { className: "user-numbers-sec", "data-aos": "fade-in", "data-aos-delay": "400", "data-aos-once": "true", children: [
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "0", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsxs("h4", { className: "numbers blue", children: [
            " 14 ",
            /* @__PURE__ */ jsx("span", { className: "num-ttl", children: "years" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Experience in 3PL and Warehousing Services." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "300", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsxs("h4", { className: "numbers blue", children: [
            "07 ",
            /* @__PURE__ */ jsx("sapn", { className: "num-ttl", children: "Lacs Sq ft" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Warehouses Leased Out for Food Grains and Bulk Cargo." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "user-numbers-dv", "data-aos": "fade-in", "data-aos-delay": "500", "data-aos-once": "true", children: [
          /* @__PURE__ */ jsxs("h4", { className: "numbers blue", children: [
            "3.5 ",
            /* @__PURE__ */ jsx("sapn", { className: "num-ttl", children: "Lacs" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "grey user-numbers-desc", children: "Grade A Warehousing Space in Kutch." })
        ] })
      ] })
    ] })
  ] }) });
}
function ImportManageBuiltoSuit() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "built-to-suit-sec section-padd-LR overflow", id: "DetailedServicesBreakdown", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 built-to-suit-container1 white", children: [
    /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Detailed Services Breakdown" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: "Import management oversees the efficient flow of goods from foreign suppliers to a business, handling logistics, documentation, and customs compliance. By navigating complex trade regulations and coordinating each step, it ensures timely, cost-effective delivery and smooth supply chain operations." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: BuiltWarehousing$4, alt: "BuiltWarehousing", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900" }) })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt js-split-text", children: "At MRS, we offer a cutting-edge solution with your business in mind:" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("ul", { className: "built-ul", children: [
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "500", children: [
          /* @__PURE__ */ jsx("h3", { children: "Customs Brokerage" }),
          /* @__PURE__ */ jsx("p", { children: "Expert handling of all customs documentation and procedures." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          /* @__PURE__ */ jsx("h3", { children: "Compliance Assurance" }),
          /* @__PURE__ */ jsx("p", { children: "Ensuring all imports meet India’s regulatory standards." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
          /* @__PURE__ */ jsx("h3", { children: "Logistics Coordination" }),
          /* @__PURE__ */ jsx("p", { children: "Streamlined logistics solutions from the point of origin to your doorstep." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsx("h3", { children: "End-to-End Handling" }),
          /* @__PURE__ */ jsx("p", { children: "From documentation to delivery, we manage every aspect of your import process." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "margin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "At MRS, we provide seamless import solutions. Our Customs Brokerage ensures expert handling of all documentation, while Compliance Assurance keeps you aligned with India’s regulations. With Logistics Coordination and End-to-End Handling, we manage everything from origin to delivery, so you can focus on your business." })
    ] })
  ] }) }) });
}
function ImportManageMultiuserWarehousing() {
  useEffect(() => {
    $(".readMore-button").off("click").on("click", function() {
      $(".readMore-button").toggleClass("rotate");
      $(".moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "multiwarehouse section-padd-LR overflow", id: "AboutIME", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 black built-to-suit-container1 multiwar-cont1", children: /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: MultiuserWarehousing$2, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "400" }) }),
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "About MRS’s Import Management Expertise" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "700", children: "MRS Supply Chain Solutions has cemented its position as a leader in import management services throughout India. With over a decade of expertise, we navigate the complexities of customs and import regulations to bring you a seamless, compliant, and efficient import process. Our robust network and deep understanding of international trade laws ensure your goods move smoothly and swiftly across borders." }),
        /* @__PURE__ */ jsx("div", { className: "moretext", children: /* @__PURE__ */ jsx("p", { children: "Shared Space, Shared Success - With our extensive warehouse network, knowledge sharing, extensive experience, and ongoing collaborative improvement projects, we stand committed to providing the highest quality solutions for your products. Our multi-user warehousing concept fosters synergy, ensuring your goods are handled with care and precision." }) }),
        /* @__PURE__ */ jsx("a", { className: "readMore-button", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "Read more" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "inPlant-sec2 section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1", children: [
      /* @__PURE__ */ jsx("h3", { className: "we-offer-txt advtg-txt blue js-split-text", children: "Advantages of Import Management with MRS" }),
      /* @__PURE__ */ jsx("img", { className: "built-line-img", src: GreyLine, alt: "GreyLine", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800" }),
      /* @__PURE__ */ jsxs("div", { className: "advant-containr", children: [
        /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: [
          /* @__PURE__ */ jsx("img", { src: VersatileStorage, alt: "VersatileStorage" }),
          /* @__PURE__ */ jsx("h4", { children: "Versatile Solutions" }),
          /* @__PURE__ */ jsx("p", { children: "Whether you need support for occasional shipments or ongoing import operations, our services are designed to meet your unique requirements." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
          /* @__PURE__ */ jsx("img", { src: Flexible, alt: "Flexible" }),
          /* @__PURE__ */ jsx("h4", { children: "Cost-Effective Options" }),
          /* @__PURE__ */ jsx("p", { children: "Benefit from tailored financial solutions that align with your budget and operational needs, ensuring maximum value for your investment." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "advan-bx", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          /* @__PURE__ */ jsx("img", { src: Scalable, alt: "Scalable" }),
          /* @__PURE__ */ jsx("h4", { children: "Scalable Operations" }),
          /* @__PURE__ */ jsx("p", { children: "Easily adjust to fluctuations in demand with our flexible import management capabilities, designed to handle everything from small shipments to large-scale operations." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mob-mrgin-btm-o txt-center", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1200", children: "Choose MRS for import management that delivers efficiency, compliance, and reliability. Experience seamless import processes tailored to your business needs, ensuring smooth operations and shared success." })
    ] }) })
  ] });
}
function ImportManageCustomsBonded() {
  useEffect(() => {
    $(".cstm-bondReadMore").off("click").on("click", function() {
      $(".cstm-bondReadMore").toggleClass("rotate");
      $(".bond-moretext").slideToggle();
      if ($(this).text() == "Read more") {
        $(this).text("Read less");
      } else {
        $(this).text("Read more");
      }
    });
    $(".accordion-list > li > .answer").hide();
    $(".accordion-list > li").off("click").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
      } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
      }
      return false;
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec section-padd-LR overflow", id: "BenefitsChoosingMRS", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 black built-to-suit-container1 custom-bonded-cntr1", children: /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
    /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: CustomsBonded, alt: "CustomsBonded", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "500" }) }),
    /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm white", children: [
      /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Benefits of Choosing MRS" }),
      /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "500", children: "Choosing MRS means partnering with an import management expert who prioritises your business’s efficiency and compliance. Our clients enjoy" }),
      /* @__PURE__ */ jsxs("div", { className: "bond-moretext", children: [
        /* @__PURE__ */ jsx("p", { children: "Cost Savings: Reduced operational costs through optimised import processes" }),
        "    ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("p", { children: "Time Efficiency: Faster turnaround times thanks to our streamlined operations." }),
        "  ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("p", { children: "Regulatory Compliance: Assurance of adherence to all import regulations, avoiding costly penalties." }),
        " ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("p", { children: "Single Point of Contact: Simplified communication with a dedicated manager for all your import needs." }),
        "  ",
        /* @__PURE__ */ jsx("br", {})
      ] }),
      /* @__PURE__ */ jsx("a", { className: "cstm-bondReadMore white", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: "Read more" })
    ] })
  ] }) }) }) });
}
function ImportManageinPlant() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "inPlant-sec section-padd-LR overflow", id: "CaseStudies", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1200 black built-to-suit-container1 inPlant-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "row built-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm", children: [
        /* @__PURE__ */ jsx("h2", { className: "ttl-45px js-split-text", children: "Case Studies Success Stories" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: "Feature two or three short case studies that show how MRS has successfully managed imports for other companies. Focus on diverse industries to show versatility." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: In_Plant_warehousing, alt: "In_Plant_warehousing", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }) })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt blue js-split-text", children: "Our services encompass:" }),
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "built-line-img",
        src: Line$3,
        alt: "Line",
        "data-aos": "fade-in",
        "data-aos-duration": "500",
        "data-aos-once": "true",
        "data-aos-delay": "600"
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("ul", { className: "built-ul inplant-ul ", children: [
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "400", children: [
          /* @__PURE__ */ jsx("h3", { className: "blue", children: "Tailored Import Solutions" }),
          /* @__PURE__ */ jsx("p", { children: "We understand that every business has unique import requirements. Our team of experts customises import strategies to optimize your supply chain, reduce costs, and ensure the smooth flow of goods from international suppliers." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
          /* @__PURE__ */ jsx("h3", { children: "Advanced Compliance Management" }),
          /* @__PURE__ */ jsx("p", { children: "Utilising cutting-edge systems, we ensure all your imports comply with international trade laws and India’s regulations. Our real-time tracking provides visibility and control, reducing the risk of delays or penalties." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: [
          /* @__PURE__ */ jsx("h3", { children: "Efficient Logistics Handling" }),
          /* @__PURE__ */ jsx("p", { children: "Our import management services cover every aspect of logistics, from port to destination. We coordinate, transport, and safely deliver your goods with precision and efficiency, reducing transit time and costs." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "900", children: [
          /* @__PURE__ */ jsx("h3", { children: "Seamless Integration with Operations" }),
          /* @__PURE__ */ jsx("p", { children: "Our import management integrates seamlessly with your existing processes, aligning shipments with your production or business schedules. This coordination minimises downtime and keeps your operations running smoothly." })
        ] }),
        /* @__PURE__ */ jsxs("li", { "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "1000", children: [
          /* @__PURE__ */ jsx("h3", { children: "Scalable and Adaptable Support" }),
          /* @__PURE__ */ jsx("p", { children: "As your business grows, so do our services. Whether you’re scaling up operations or managing fluctuating demand, our import solutions adapt to your needs, ensuring uninterrupted supply chain operations." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "800", children: "Partner with MRS for import management services designed to drive efficiency, compliance, and reliability at every step." })
    ] })
  ] }) }) });
}
function ImportManageinnerCTA() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "cta-sec section-padd-LR overflow inner-cta-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container", children: /* @__PURE__ */ jsxs("div", { className: "client-img-bx global-cta", children: [
    /* @__PURE__ */ jsx("img", { className: "first_Company-img", src: About_CTA, alt: "About_CTA", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }),
    /* @__PURE__ */ jsxs("div", { className: "client-contnt-bx", children: [
      /* @__PURE__ */ jsxs("h2", { className: "white ttl-60px", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
        "We are the 1st Company in Kutch to Provide Single Largest Warehouse of Grade ",
        /* @__PURE__ */ jsx("span", { className: "bold", children: "A" }),
        " category"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "client-btn inner-cta-btn enquire_btn", id: "btn-styl", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsxs("a", { children: [
        /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Contact Us for Warehousing Excellence" }),
        " ",
        /* @__PURE__ */ jsx("img", { src: white_Arrow, alt: "Arrow", className: "inner-cta-img" })
      ] }) })
    ] })
  ] }) }) }) });
}
const ImportanMagement = () => {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, { threshold: 0.5 });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(ImportManageServicesSpotlight, {}),
    /* @__PURE__ */ jsx(ImportManagemultiUserAbout, {}),
    /* @__PURE__ */ jsx(ImportManageBuiltoSuit, {}),
    /* @__PURE__ */ jsx(ImportManageMultiuserWarehousing, {}),
    /* @__PURE__ */ jsx(ImportManageCustomsBonded, {}),
    /* @__PURE__ */ jsx(ImportManageinPlant, {}),
    /* @__PURE__ */ jsx(ImportManageinnerCTA, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const Career_spot = "/assets/career_spot-_nWGXwO7.jpg";
function CareerSpotlight() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight section inner-spotlight-sec section-padd-LR overflow", id: "career-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsx("h1", { className: "js-split-text white", children: "Careers" }),
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "500", children: "Join Our Team" }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "700" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: "Explore Opportunities: Embark on a Rewarding Career with MRS Group" }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "800", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Careers" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Career_spot, alt: "Career_spot", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "1000" }) }) })
  ] }) });
}
function SectorAbout$6() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "roadRailAbt-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black tech-driven-numbrs1", children: [
    /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "Accelerate Your Career with MRS Group" }),
    /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "200", children: "Join the MRS Group family, where growth, innovation, and dedication meet. As a company revered for its high retention and internal growth, we thrive on delivering exceptional customer service and fostering rewarding career paths. Within MRS, opportunities abound across diverse roles, from IT and Operations to Sales, Account Management, and Customs. In the dynamic realm of digital logistics, we offer a vibrant, creative environment where exceeding customer expectations goes hand-in-hand with career development. At MRS, your career journey contributes to a legacy of quality, trust, and satisfaction, driving us forward in the ever-evolving logistics landscape." })
  ] }) }) });
}
const Collaborative = "/assets/Collaborative-IHvij86M.jpg";
const Commitment = "/assets/Commitment-Ni39rBkc.jpg";
const Continuous = "/assets/Continuous-SnpgjKJM.jpg";
const Diversity = "/assets/Diversity-4MRXcxMZ.jpg";
const Culture = "/assets/Culture-vXzr4nzj.svg";
function ourCulture() {
  useEffect(() => {
    new Swiper(".awards-sldr", {
      navigation: {
        nextEl: ".awards-swiper-button-next",
        prevEl: ".awards-swiper-button-prev"
      },
      slidesPerView: 3,
      spaceBetween: 50,
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1200: {
          slidesPerView: 3
        }
      }
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "awards-section section-padd-LR overflow culture-sec", children: [
    /* @__PURE__ */ jsx("div", { className: "awrd-ttl culture-ttl", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "400", "data-aos-once": "true", children: /* @__PURE__ */ jsx("img", { src: Culture, alt: "Culture", className: "cultr-ttl-img" }) }),
    /* @__PURE__ */ jsxs("div", { className: "main-container", children: [
      /* @__PURE__ */ jsx("h2", { className: "awrd-ttl-mob", children: "Culture" }),
      /* @__PURE__ */ jsx("h2", { className: "grey awrds-sub-ttl culture-sub-ttl orange", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "600", "data-aos-once": "true", children: "Our Culture: Thriving Together" }),
      /* @__PURE__ */ jsxs("div", { className: "swiper awards-sldr", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-delay": "800", "data-aos-once": "true", children: [
        /* @__PURE__ */ jsxs("div", { className: "awards-pegination-arrow", id: "culture-pegination-arrow", children: [
          /* @__PURE__ */ jsx("div", { className: "awards-swiper-button-next cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "1", children: [
            /* @__PURE__ */ jsx("path", { d: "M12 20H28", stroke: "#929292", strokeLinecap: "round" }),
            /* @__PURE__ */ jsx("path", { d: "M21 12L29 20L21 28", stroke: "#929292", strokeLinecap: "round" }),
            "    ",
            /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", transform: "matrix(-1 0 0 1 41 0)", stroke: "#929292" })
          ] }) }) }),
          /* @__PURE__ */ jsx("div", { className: "awards-swiper-button-prev cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "1", children: [
            /* @__PURE__ */ jsx("path", { d: "M29 20H13", stroke: "#929292", strokeLinecap: "round" }),
            /* @__PURE__ */ jsx("path", { d: "M20 12L12 20L20 28", stroke: "#929292", strokeLinecap: "round" }),
            "    ",
            /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", stroke: "#929292" })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper white", children: [
          /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "award-bx", children: [
            /* @__PURE__ */ jsx("img", { src: Collaborative, alt: "Collaborative" }),
            /* @__PURE__ */ jsx("h2", { children: "Collaborative Environment" }),
            /* @__PURE__ */ jsx("p", { children: "At MRS, teamwork is at the heart of our operations. We believe in the power of collaboration, fostering a supportive atmosphere where ideas are shared, and achievements are collective." })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "award-bx", children: [
            /* @__PURE__ */ jsx("img", { src: Commitment, alt: "Commitment" }),
            /* @__PURE__ */ jsx("h2", { children: "Commitment to Excellence" }),
            /* @__PURE__ */ jsx("p", { children: "Our dedication to quality shapes our culture. We strive for excellence in every task, ensuring our services exceed expectations and set industry standards." })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "award-bx", children: [
            /* @__PURE__ */ jsx("img", { src: Continuous, alt: "Continuous" }),
            /* @__PURE__ */ jsx("h2", { children: "Continuous Learning" }),
            /* @__PURE__ */ jsx("p", { children: "Growth is a constant pursuit at MRS. We invest in ongoing training and professional development, enabling our team to stay ahead in a fast-evolving industry." })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "award-bx", children: [
            /* @__PURE__ */ jsx("img", { src: Diversity, alt: "Diversity" }),
            /* @__PURE__ */ jsx("h2", { children: "Diversity and Inclusion" }),
            /* @__PURE__ */ jsx("p", { children: "We celebrate diversity, believing that a wide range of perspectives enhances our creativity and problem-solving abilities. An inclusive environment ensures everyone feels valued and respected." })
          ] }) })
        ] })
      ] })
    ] })
  ] }) });
}
function applyNow() {
  const form_career = useRef();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const nameinput_cr = React.useRef(null);
  const emailinput_cr = React.useRef(null);
  const orginput_cr = React.useRef(null);
  const phoneinput_cr = React.useRef(null);
  const fileinput = React.useRef(null);
  const handleFocus_cr = (e) => {
    e.target.classList.remove("error_line");
    let er1_cr = document.getElementById("nm_err");
    er1_cr.classList.remove("show_error");
    let er1_crv = document.getElementById("nm_err1");
    er1_crv.classList.remove("show_error");
    let er2_cr = document.getElementById("eml_err");
    er2_cr.classList.remove("show_error");
    let er2_crv = document.getElementById("eml_err1");
    er2_crv.classList.remove("show_error");
    let er3_cr = document.getElementById("cmp_err");
    er3_cr.classList.remove("show_error");
    let er6_cr = document.getElementById("file_err");
    er6_cr.classList.remove("show_error");
    let er6_crv = document.getElementById("file_err1");
    er6_crv.classList.remove("show_error");
  };
  const handleFocus_cr1 = (e) => {
    e.target.classList.remove("error_line");
    let er4_cr = document.getElementById("phn_err");
    er4_cr.classList.remove("show_error");
    let er4_crv = document.getElementById("phn_err1");
    er4_crv.classList.remove("show_error");
  };
  const sendEmailCr = async (e) => {
    e.preventDefault();
    let name_fld_cr = nameinput_cr.current.value;
    let email_fld_cr = emailinput_cr.current.value;
    let org_fld_cr = orginput_cr.current.value;
    let phone_fld_cr = phoneinput_cr.current.value;
    let file_fld = fileinput.current.value;
    let phone_fltr = document.getElementById("phone_fld_cr");
    var mob_regx = /^([+][9][1]|[9][1]|[0]){0,1}([7-9]{1})([0-9]{9})$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var alpha_allwd = /^[A-Za-z ]+$/;
    var allowedExtensions = /(\.doc|\.docx|\.odt|\.pdf|\.wps|\.wks|\.wpd)$/i;
    if (name_fld_cr == "") {
      let v1 = document.getElementById("name_fld_cr");
      v1.className += " error_line";
      let er1_cr = document.getElementById("nm_err");
      er1_cr.className += " show_error";
    } else if (!name_fld_cr.match(alpha_allwd)) {
      let v1 = document.getElementById("name_fld_cr");
      v1.className += " error_line";
      let er1_crv = document.getElementById("nm_err1");
      er1_crv.className += " show_error";
    } else if (phone_fld_cr == "") {
      let v4 = document.getElementById("phone_fld_cr");
      v4.className += " error_line";
      let er4_cr = document.getElementById("phn_err");
      er4_cr.className += " show_error";
    } else if (!mob_regx.test(phone_fltr.value)) {
      let v4 = document.getElementById("phone_fld_cr");
      v4.className += " error_line";
      let er4_cr = document.getElementById("phn_err1");
      er4_cr.className += " show_error";
    } else if (email_fld_cr == "") {
      let v2 = document.getElementById("email_fld_cr");
      v2.className += " error_line";
      let er2_cr = document.getElementById("eml_err");
      er2_cr.className += " show_error";
    } else if (!email_fld_cr.match(mailformat)) {
      let v2 = document.getElementById("email_fld_cr");
      v2.className += " error_line";
      let er2_crv = document.getElementById("eml_err1");
      er2_crv.className += " show_error";
    } else if (org_fld_cr == "") {
      let v3 = document.getElementById("org_fld_cr");
      v3.className += " error_line";
      let er3_cr = document.getElementById("cmp_err");
      er3_cr.className += " show_error";
    } else if (file_fld == "") {
      let v6 = document.getElementById("myFile");
      v6.className += " error_line";
      let er6_cr = document.getElementById("file_err");
      er6_cr.className += " show_error";
    } else if (!allowedExtensions.exec(file_fld)) {
      let er7_cr = document.getElementById("file_err1");
      er7_cr.className += " show_error";
      return false;
    } else {
      fetch(
        "https://script.google.com/macros/s/AKfycbz-1hyxx1HlednwMz-1VirzczXDIT7-Wi3JaQ9D4tZI6hu0qt6GxOD589B5Ugyud6gLuQ/exec",
        {
          method: "POST",
          body: new FormData(form_career.current)
        }
      ).then((res) => {
        console.log("SUCCESSFULLY SUBMITTED");
        setLoading(false);
      }).catch((err) => console.log(err));
      emailjs.sendForm(
        "service_7xurfxj",
        "template_bza8r36",
        e.target,
        "SsPYHKCapw4h-xBn_"
      ).then(
        (result) => {
          console.log(result.text);
          setStatusMessage("Your Message has been sent successfully");
          let bx = document.getElementById("thnk_box");
          bx.className += " thnk_show";
          let frm_bx = document.getElementById("career_form_bx");
          frm_bx.className += " form_hide";
        },
        (error) => {
          console.log(error.text);
          setStatusMessage(`${error.text} happened`);
        }
      );
      e.target.reset();
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "form-sec section-padd-LR", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 white", children: /* @__PURE__ */ jsxs("div", { className: "row apply-nw-rw", children: [
    /* @__PURE__ */ jsxs("div", { className: "clm-2 contnt-clm", children: [
      /* @__PURE__ */ jsx("h2", { className: "js-split-text", children: "Apply Now" }),
      /* @__PURE__ */ jsx(
        "p",
        {
          "data-aos": "fade-in",
          "data-aos-duration": "500",
          "data-aos-delay": "400",
          "data-aos-once": "true",
          children: "Embark on your career adventure with us: Fill out the application below."
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "clm-2", children: /* @__PURE__ */ jsxs("div", { className: "contact_form", children: [
      /* @__PURE__ */ jsxs(
        "form",
        {
          className: "conversion_form",
          ref: form_career,
          onSubmit: sendEmailCr,
          id: "career_form_bx",
          "data-aos": "fade-in",
          "data-aos-duration": "500",
          "data-aos-delay": "400",
          "data-aos-once": "true",
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "page_name",
                type: "hidden",
                name: "Page_name",
                value: "Careers Page"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label conv_frm_label", children: "Full Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "name",
                  className: "form-control",
                  placeholder: "Name",
                  id: "name_fld_cr",
                  ref: nameinput_cr,
                  onFocus: handleFocus_cr
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "nm_err", children: "Please Enter Name" }),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "nm_err1", children: "Letters and space only." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Phone No" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "phone",
                  className: "form-control",
                  placeholder: "Phone",
                  id: "phone_fld_cr",
                  ref: phoneinput_cr,
                  onFocus: handleFocus_cr1
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "phn_err", children: "Please Enter Phone No" }),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "phn_err1", children: "Please Enter Valid Phone No" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Email Address" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  name: "email",
                  className: "form-control",
                  placeholder: "Email",
                  id: "email_fld_cr",
                  ref: emailinput_cr,
                  onFocus: handleFocus_cr
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "eml_err", children: "Please Enter Email Address" }),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "eml_err1", children: "Please Enter Valid Email Address" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "conv_frm_spc", children: [
              /* @__PURE__ */ jsx("label", { className: "form-label", children: "Experience" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "experience",
                  className: "form-control",
                  placeholder: "Experience",
                  id: "org_fld_cr",
                  ref: orginput_cr,
                  onFocus: handleFocus_cr
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "cmp_err", children: "Please Enter Experience" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "conv_frm_spc", children: /* @__PURE__ */ jsxs("div", { className: "frm_inr_dv", children: [
              /* @__PURE__ */ jsx("label", { children: "Attach CV" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  placeholder: "Attach CV",
                  id: "myFile",
                  name: "cv",
                  ref: fileinput,
                  onFocus: handleFocus_cr
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "file_err", children: "Please Attach CV" }),
              /* @__PURE__ */ jsx("p", { className: "error_msg", id: "file_err1", children: "Please Attach valid file" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-6 btn_col", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "submit",
                className: "btn btn-primary conv_btn cont_form_btn",
                value: "Submit"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "thnk txt_wht white", id: "thnk_box", children: "Your form has been sent successfully" })
    ] }) })
  ] }) }) }) });
}
function Contactpage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Careers - MRS" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Explore Opportunities: Embark on a Rewarding Career with MRS Group"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(CareerSpotlight, {}),
    /* @__PURE__ */ jsx(SectorAbout$6, {}),
    /* @__PURE__ */ jsx(ourCulture, {}),
    /* @__PURE__ */ jsx(applyNow, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const PrivacyHdr = () => {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, { threshold: 0.5 });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "section inner-spotlight-sec section-padd-LR overflow blogarchive-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", children: [
    /* @__PURE__ */ jsx("h1", { className: "js-split-text white", children: "Privacy Policy" }),
    /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl blg-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "400" }),
    /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "600", children: [
      /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
      " > ",
      /* @__PURE__ */ jsx("a", { className: "white-60", children: "Privacy Policy" })
    ] })
  ] }) }) }) });
};
function PrivacyContent() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "section section-padd-LR hm-abt-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 privacy-sec", children: [
    /* @__PURE__ */ jsx("h2", { className: "black", children: "Personal Information " }),
    /* @__PURE__ */ jsx("p", { children: "Thank you for visiting the website of MRS Supply chain (MRS Supply chain, “we” “our” or “us”). By accessing this website (the “Site”), you agree to be bound by the terms set out in this Privacy Policy, which may be updated by us from time to time." }),
    /* @__PURE__ */ jsx("p", { children: "MRS Supply chain is committed to safeguarding all confidential information. The following describes our current policies regarding collection, use and disclosure of your personal information which we receive in the course of you accessing our Site and any other services provided through this Site." }),
    /* @__PURE__ */ jsx("p", { children: "Collection of personal information may include information received solicited or unsolicited through the use of this Site. These may include and is not limited to, your name and contact details. The personal information may be used by MRS Supply chain and/or any of its associates, including but not limited to any contractor, agent, business partners or service provider which provides administrative, data processing, financial, computer, telecommunications, payment or securities clearing, custodial or other services authorised by MRS Supply chain when carrying out customer’s instructions and/or the business of MRS Supply chain. Such information is only provided in accordance with the law and that our employees, agents and/or affiliates are required to treat the information confidentially and use it exclusively for the purpose for which it is provided. We do not share your personal information except where permitted by law or for lawful purposes." }),
    /* @__PURE__ */ jsx("p", { children: "This Privacy Policy concerns only the Site and does not concern any website to which the Site may link. Should you choose to visit these third-party sites, you should review their privacy policies to ensure that you understand and are comfortable with their practices concerning your personal information. Similarly, this Privacy Policy does not concern your interaction with MRS Supply chain in any matter other than your use of the Site. Finally, this Privacy Policy does not address our privacy practices with respect to any non-public personal information we may collect from you as an investor in us or in funds that we sponsor or manage; We address these practices in separate notices to investors or potential investors." }),
    /* @__PURE__ */ jsx("p", { children: "If you have any questions or comments about this Privacy Policy, you can contact us at email id connect@mrssupplychain.com" }),
    /* @__PURE__ */ jsx("p", { children: "When you enter and browse the Site, we may collect information you provide to us and we may collect information on you through technology." }),
    /* @__PURE__ */ jsx("p", { children: "In order to obtain access to certain information or materials provided via the Site, you may have to provide information that we collect and store in a way that allows us to relate it to you personally, including but not limited to your name, e-mail address, mailing address, phone number, facsimile number. We refer to such information as personally identifiable information. Additionally, we may collect and retain a record of all communications with you." }),
    /* @__PURE__ */ jsx("p", { children: "We may collect information about you through technology. For example, we may collect your internet protocol (IP) address each time you request a page during a visit to the Site. At times, we may also use IP addresses to collect information regarding the frequency with which users browse various parts of the Site. The Site may also use cookies. The Site may also use other technical methods to track and analyse the traffic patterns on the Site, such as the frequency with which our users visit various parts of the Site. These technical methods may involve the transmission of information either directly to us or to another party authorised by us to collect information on our behalf. We may collect the information from use of these technical methods in a form that is personally identifiable." }),
    /* @__PURE__ */ jsx("p", { children: "We may also use software tools such as JavaScript to measure and collect session information, including page response times, download errors, length of visits to certain pages, page interaction information, and methods used to browse away from the page. We may use this information to measure site activity, to develop ideas for improving our websites and for any other purpose to the extent permitted by applicable law." }),
    /* @__PURE__ */ jsx("p", { children: "MRS Supply chain does not disclose any non-public personally identifiable information to any non-affiliated third party, except where permitted by law." }),
    /* @__PURE__ */ jsx("p", { children: "To the extent permitted by any applicable Law, we may use your personally identifiable information in several ways. Although we do not sell your personal information to third parties, we may use or share certain personally identifiable information we collect about you when you visit and browse the Site as part of our normal business operations, or to send you administrative communications either about your interactions with us or about features of the Site, including any future changes to this Privacy Policy, to the extent permitted by law." }),
    /* @__PURE__ */ jsx("p", { children: "To the extent permitted by any applicable Law, we may also store your personally identifiable information and share it with our affiliates. We may use this information for marketing, research and other business purposes, and we may associate your personally identifiable information with other information we collect about you, such as details about your usage patterns and interests, in each case to the extent permitted by law." }),
    /* @__PURE__ */ jsx("p", { children: "We may also use service providers to facilitate our services or platform functions on our behalf. These companies and individuals may have access to your personally identifiable information, as permitted by law and as needed to perform their functions, but may not use it for another purpose." }),
    /* @__PURE__ */ jsx("p", { children: "We will disclose personal information when we believe that such disclosures are required by law, regulation, legal process or governmental request. We may also do so to help enforce our Terms of Use, protect your safety or security, including the safety and security of property that belongs to you, or protect the safety and security of our websites, databases or third parties, including the safety and security of tangible or intangible property that belongs to us or to third parties. Also, in the event that MRS Supply chain, or substantially all of its assets, are acquired or merged with another entity, user information may be one of the transferred assets. You will receive a notice if such an event occurs. MRS Supply chain, however, reserves the right to use any personal information in any manner permitted by law." }),
    /* @__PURE__ */ jsx("p", { children: "Non-personally identifiable information is information that does not personally identify you, including anonymous information and aggregate data. We may use this information to understand better how our visitors use the Site, research our visitors’ demographics, interest, and behaviour, improve the Site, provide visitors with customised services and information, and for other similar purposes. We may combine this information with personally identifiable information. We may share this information with others, such as investors, for information or promotional purposes to the extent permitted by law. MRS Supply chain, however, reserves the right to use this information in any manner permitted by law." }),
    /* @__PURE__ */ jsx("p", { children: "We will not be responsible or liable for any damages, losses or causes of action arising out of or in connection with the disclosure of your personally identifiable information." }),
    /* @__PURE__ */ jsx("p", { children: "In the event of discrepancies of this policy between the English version and other language version(s), the English version shall prevail. MRS Supply chain, 2022" }),
    /* @__PURE__ */ jsx("h2", { className: "black", children: "Also for Cookies" }),
    /* @__PURE__ */ jsx("p", { children: "The website mrssupplychain.com (“this website”) is operated by MRS Supply chain (MRS Supply chain, “we” “our” or “us”) and it uses cookies to enhance your browsing experience. By continuing to browse this website, you are agreeing to the use of cookies. Our Cookies Policy explains what cookies are, how we use cookies, managing cookies and further information about cookies." }),
    /* @__PURE__ */ jsx("h2", { className: "black", children: "What Are Cookies" }),
    /* @__PURE__ */ jsx("p", { children: "Cookies are small pieces of text files sent by your web browser and stored on your device by a website you visit." }),
    /* @__PURE__ */ jsx("h2", { className: "black", children: "How We Use Cookies" }),
    /* @__PURE__ */ jsx("p", { children: "We use analytical/performance cookies. These cookies allow us to recognise and count the number of visitors and to see how visitors move around this website when they are using it. These cookies do not collect information that identifies a visitor. All information these cookies collect is aggregated and is therefore anonymous. This helps us to improve the structure of this website." }),
    /* @__PURE__ */ jsx("h2", { className: "black", children: "Managing Cookies" }),
    /* @__PURE__ */ jsx("p", { children: "If you would like to delete cookies or instruct your web browser to disable cookies, please visit the help pages of your web browser." }),
    /* @__PURE__ */ jsx("h2", { className: "black", children: "Further Information about Cookies" }),
    /* @__PURE__ */ jsx("p", { children: "For further information, please refer to https://mrssupplychain.com/privacy-policy. In the event of discrepancies of this Cookies policy between the English version and other language version(s), the English version shall prevail." })
  ] }) }) });
}
function Privacypage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, { threshold: 0.5 });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(PrivacyHdr, {}),
    /* @__PURE__ */ jsx(PrivacyContent, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const safetyHdr = () => {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "section inner-spotlight-sec section-padd-LR overflow blogarchive-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", children: [
    /* @__PURE__ */ jsx("h1", { className: "js-split-text white", children: "Safety Policy" }),
    /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl blg-sub-ttl", "data-aos": "fade-up", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "400" }),
    /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "600", children: [
      /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
      " > ",
      /* @__PURE__ */ jsx("a", { className: "white-60", children: "Safety Policy" })
    ] })
  ] }) }) }) });
};
const WarehousingNeeds = "/assets/safety_contnt-wtQE4jJg.jpg";
function SafetyContent() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "multiwarehouse section-padd-LR overflow safety-contn-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1200 black built-to-suit-container1 multiwar-cont1", children: /* @__PURE__ */ jsxs("div", { className: "row safety-row", children: [
    /* @__PURE__ */ jsxs("div", { className: "clm-2 built-cntnt-clm safety-cntnt", children: [
      /* @__PURE__ */ jsx("h2", { className: "js-split-text blue", children: "Safety Policy" }),
      /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "700", children: "This policy reflects MRS Group’s dedication to maintaining and promoting a safe and healthy work environment at all our operating locations. Our objective is to effectively manage and reduce any risks associated with environmental health and safety that could impact the well-being of our employees and the efficiency of our operations. By implementing rigorous safety protocols, responsible processes, and a well-defined organisational structure, we aim to foster a secure and positive atmosphere. Our approach is designed to continuously improve our safety culture, contributing to the overall development and growth of our company." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: WarehousingNeeds, alt: "WarehousingNeeds", "data-aos": "fade-in", "data-aos-duration": "700", "data-aos-once": "true", "data-aos-delay": "400" }) })
  ] }) }) }) });
}
function safetyCTA() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "cta-sec section-padd-LR overflow inner-cta-sec safety-cta-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container", children: /* @__PURE__ */ jsxs("div", { className: "client-img-bx global-cta", children: [
    /* @__PURE__ */ jsx("img", { className: "first_Company-img", src: About_CTA, alt: "About_CTA", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600" }),
    /* @__PURE__ */ jsxs("div", { className: "client-contnt-bx", children: [
      /* @__PURE__ */ jsxs("h2", { className: "white ttl-60px", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
        "We are the 1st Company in Kutch to Provide Single Largest Warehouse of Grade ",
        /* @__PURE__ */ jsx("span", { className: "bold", children: "A" }),
        " category"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "client-btn inner-cta-btn enquire_btn", id: "btn-styl", "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsxs("a", { children: [
        /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Discover Now our Offering" }),
        " ",
        /* @__PURE__ */ jsx("img", { src: white_Arrow, alt: "Arrow", className: "inner-cta-img" })
      ] }) })
    ] })
  ] }) }) }) });
}
function SafetyPage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, { threshold: 0.5 });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(safetyHdr, {}),
    /* @__PURE__ */ jsx(SafetyContent, {}),
    /* @__PURE__ */ jsx(safetyCTA, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Warehousing_Solution$4 = "/assets/ArtsExhibitions-7ZIMfCgA.jpg";
function SectorSpotlight$5() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow arts-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", id: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "0", children: "Sector Solutions" }),
      /* @__PURE__ */ jsxs("h1", { className: "js-split-text white", children: [
        "Arts, Exhibitions, and ",
        /* @__PURE__ */ jsx("br", {}),
        "Luxury Goods "
      ] }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300", children: "Elevating the Art of Luxury Logistics" }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-in", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "300", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Sectors " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Arts, Exhibitions, and Luxury Goods" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Warehousing_Solution$4, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }) }) })
  ] }) });
}
function SectorAbout$5() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "roadRailAbt-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black tech-driven-numbrs1", children: [
    /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "Expert Handling and Storage for Arts, Exhibitions, and High-Value Goods" }),
    /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "200", children: "In the world of arts, exhibitions, and luxury goods, the importance of meticulous handling, secure transportation, and specialised storage cannot be overstated. MRS Supply Chain offers a suite of services tailored to meet the unique needs of this sector, ensuring that high-value commodities are managed with the utmost care and precision." })
  ] }) }) });
}
function SectorSolutions$5() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow sectorSolution-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt black js-split-text key-fetr-ttl", children: "Specialised Logistics Solutions for Arts, Exhibitions, and Luxury Goods:" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$1, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row T-B-Padding B-padding-o ", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 solution-clm", children: [
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "High-Value Commodities and Exhibition Cargo" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Handling and logistics for exhibitions, art pieces, and luxury items, ensuring their pristine condition and timely delivery for global showcases." }),
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Duty-Free Warehousing" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Secure, climate-controlled storage solutions that leverage duty-free benefits, providing an ideal environment for the preservation and staging of valuable goods." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: Inplant$2, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "500" }) })
    ] })
  ] }) }) });
}
function KeySector$5() {
  useEffect(() => {
    new Swiper(".sector-sldr", {
      navigation: {
        nextEl: ".sector-swiper-button-next",
        prevEl: ".sector-swiper-button-prev"
      },
      slidesPerView: 3.1,
      spaceBetween: 40,
      breakpoints: {
        320: {
          slidesPerView: 1.1
        },
        768: {
          slidesPerView: 2.1
        },
        1024: {
          slidesPerView: 3.1
        }
      }
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "sector-sec section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250", children: [
    /* @__PURE__ */ jsx("div", { className: "ovrflw-hdn", children: /* @__PURE__ */ jsx("h2", { className: "sectr-ttl black js-split-text", children: "Key Sectors we work with" }) }),
    /* @__PURE__ */ jsxs("div", { className: "swiper sector-sldr", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "500", children: [
      /* @__PURE__ */ jsxs("div", { className: "pegination-arrow2", children: [
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-next cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M12 20H28", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M21 12L29 20L21 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", transform: "matrix(-1 0 0 1 41 0)", stroke: "#929292" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-prev cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M29 20H13", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M20 12L12 20L20 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", stroke: "#929292" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Science_and_Health_Care, alt: "Science_and_Health_Care" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Renewable Energy and Infrastructure Projects:  " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Powering the future with specialised logistics for the renewable energy and infrastructure sectors, where precision meets scale." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/renewable-energy-and-infrastructure-projects", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: RenewableEnergy, alt: "RenewableEnergy" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Manufacturing, Automotive, Technology, and Consumer Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Driving innovation through integrated logistics, keeping the wheels of industry turning smoothly." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/manufacturing-automotive-technology-and-consumer-goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Industrial, alt: "Industrial" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Industrial Equipment:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Heavy-duty logistics for heavy-duty equipment, ensuring the backbone of industry remains strong and operational." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/industrial-sector", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Chemicals, alt: "Chemicals" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Agriculture, Chemicals, Construction, and Energy: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Cultivating success with tailored logistics for the essential sectors that fuel our world and build our futures." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/chemicals-construction-energy-and-agriculture", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Ecommerce$1, alt: "Ecommerce" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "E-commerce and Retail:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Revolutionising retail with cutting-edge logistics, delivering the future of commerce today." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/e-commerce-and-retail", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] }) }) });
}
function innerCTA() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "cta-sec section-padd-LR overflow inner-cta-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container", children: /* @__PURE__ */ jsxs("div", { className: "client-img-bx global-cta", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "900", children: [
    /* @__PURE__ */ jsx("img", { className: "first_Company-img", src: About_CTA, alt: "About_CTA" }),
    /* @__PURE__ */ jsxs("div", { className: "client-contnt-bx", children: [
      /* @__PURE__ */ jsxs("h2", { className: "white ttl-60px", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "600", children: [
        "We are the 1st Company in Kutch to Provide Single Largest Warehouse of Grade ",
        /* @__PURE__ */ jsx("span", { className: "bold", children: "A" }),
        " category"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "client-btn inner-cta-btn enquire_btn", id: "btn-styl", "data-aos": "fade-up", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "600", children: /* @__PURE__ */ jsxs("a", { children: [
        /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Elevate Your Supply Chain Today" }),
        " ",
        /* @__PURE__ */ jsx("img", { src: white_Arrow, alt: "Arrow", className: "inner-cta-img" })
      ] }) })
    ] })
  ] }) }) }) });
}
function ArtsPage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Secure Logistics for Luxury Goods & Art Exhibitions | MRSSupplyChain" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Explore secure logistics solutions for luxury goods and art exhibitions with MRSSupplyChain."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Luxury Goods Logistics, Art Exhibitions Transport, Secure Logistics for Luxury Items, Exhibition Goods Warehousing, High-Value Item Logistics"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(SectorSpotlight$5, {}),
    /* @__PURE__ */ jsx(SectorAbout$5, {}),
    /* @__PURE__ */ jsx(SectorSolutions$5, {}),
    /* @__PURE__ */ jsx(KeySector$5, {}),
    /* @__PURE__ */ jsx(innerCTA, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Warehousing_Solution$3 = "/assets/RenewablEenergy-3Id6HinR.jpg";
function SectorSpotlight$4() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow renewalEnergy-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", id: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "0", children: "Sector Solutions" }),
      /* @__PURE__ */ jsxs("h1", { className: "js-split-text white", children: [
        "Renewable Energy and ",
        /* @__PURE__ */ jsx("br", {}),
        "Infrastructure Projects "
      ] }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300", children: "Powering Progress with Logistics Solutions" }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-in", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "300", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Sectors " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Renewable Energy and Infrastructure Projects" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Warehousing_Solution$3, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }) }) })
  ] }) });
}
function SectorAbout$4() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "roadRailAbt-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black tech-driven-numbrs1", children: [
    /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "Experts in Project Cargo and Compliance for Renewable Energy and Infrastructure" }),
    /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "200", children: "In this segment, we have worked with one of the largest solar module manufacturing companies - Mundra Solar PV Ltd, under renewable energy and infrastructure projects." })
  ] }) }) });
}
const LogisticsIndustrialSector = "/assets/LogisticsIndustrialSector-JkArh1-B.jpg";
function SectorSolutions$4() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow sectorSolution-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt black js-split-text key-fetr-ttl", children: "Specialised Logistics Solutions for Renewable Energy and Infrastructure Projects:" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$1, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row T-B-Padding B-padding-o ", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 solution-clm", children: [
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "General and Project Cargo" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Specialised logistics for the transportation and handling of oversized, heavy, or otherwise challenging cargo essential for infrastructure and renewable energy projects." }),
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Regulatory Compliance and Documentation" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Expert assistance with the complex regulatory environment surrounding large projects, ensuring compliance and smooth operations." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: LogisticsIndustrialSector, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "500" }) })
    ] })
  ] }) }) });
}
function KeySector$4() {
  useEffect(() => {
    new Swiper(".sector-sldr", {
      navigation: {
        nextEl: ".sector-swiper-button-next",
        prevEl: ".sector-swiper-button-prev"
      },
      slidesPerView: 3.1,
      spaceBetween: 40,
      breakpoints: {
        320: {
          slidesPerView: 1.1
        },
        768: {
          slidesPerView: 2.1
        },
        1024: {
          slidesPerView: 3.1
        }
      }
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "sector-sec section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250", children: [
    /* @__PURE__ */ jsx("div", { className: "ovrflw-hdn", children: /* @__PURE__ */ jsx("h2", { className: "sectr-ttl black js-split-text", children: "Key Sectors we work with" }) }),
    /* @__PURE__ */ jsxs("div", { className: "swiper sector-sldr", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "500", children: [
      /* @__PURE__ */ jsxs("div", { className: "pegination-arrow2", children: [
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-next cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M12 20H28", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M21 12L29 20L21 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", transform: "matrix(-1 0 0 1 41 0)", stroke: "#929292" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-prev cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M29 20H13", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M20 12L12 20L20 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", stroke: "#929292" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: RenewableEnergy, alt: "RenewableEnergy" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Manufacturing, Automotive, Technology, and Consumer Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Driving innovation through integrated logistics, keeping the wheels of industry turning smoothly." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/manufacturing-automotive-technology-and-consumer-goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Industrial, alt: "Industrial" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Industrial Equipment:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Heavy-duty logistics for heavy-duty equipment, ensuring the backbone of industry remains strong and operational." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/industrial-sector", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Chemicals, alt: "Chemicals" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Agriculture, Chemicals, Construction, and Energy: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Cultivating success with tailored logistics for the essential sectors that fuel our world and build our futures." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/chemicals-construction-energy-and-agriculture", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Ecommerce$1, alt: "Ecommerce" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "E-commerce and Retail:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Revolutionising retail with cutting-edge logistics, delivering the future of commerce today." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/e-commerce-and-retail", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Arts, alt: "Arts" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Arts, Exhibitions, and Luxury Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Elevating the art of logistics for the world's treasures, ensuring every masterpiece arrives in perfect form." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/arts-exhibitions-and-luxury-Goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] }) }) });
}
function RenewableEnergyPage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Comprehensive Logistics for Renewable Energy & Infrastructure Projects | MRSSupplyChain" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Trust MRSSupplyChain for efficient logistics solutions tailored for renewable energy and infrastructure projects."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Renewable Energy Logistics, Infrastructure Supply Chain, Logistics for Renewable Projects, Efficient Infrastructure Transport, Supply Chain for Energy Projects"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(SectorSpotlight$4, {}),
    /* @__PURE__ */ jsx(SectorAbout$4, {}),
    /* @__PURE__ */ jsx(SectorSolutions$4, {}),
    /* @__PURE__ */ jsx(KeySector$4, {}),
    /* @__PURE__ */ jsx(innerCTA, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Warehousing_Solution$2 = "/assets/IndustrialSector-n2SPl2My.jpg";
function SectorSpotlight$3() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow indus-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", id: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "0", children: "Sector Solutions" }),
      /* @__PURE__ */ jsx("h1", { className: "js-split-text white", children: "Industrial Sector " }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300", children: "Efficient Handling and Tech-Enhanced Delivery for Industrial Assets" }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-in", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "300", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Sectors " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Industrial Sector" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Warehousing_Solution$2, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }) }) })
  ] }) });
}
function SectorAbout$3() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "roadRailAbt-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black tech-driven-numbrs1", children: [
    /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "Empowering the Industrial Sector with Precision Logistics and Smart Delivery Systems" }),
    /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "200", children: "In the industrial sector, the movement of heavy machinery and equipment demands a logistics partner with the capability to manage challenging loads. MRS Supply Chain provides robust solutions for the transportation, storage, and final delivery of industrial equipment, ensuring operational continuity." })
  ] }) }) });
}
function SectorSolutions$3() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow sectorSolution-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt black js-split-text key-fetr-ttl", children: "Specialised Logistics Solutions for the Industrial Sector:" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$1, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row T-B-Padding B-padding-o ", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 solution-clm", children: [
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "General and Project Cargo" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Logistics services for the transportation and handling of heavy industrial equipment, ensuring safety and efficiency." }),
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Tech-Driven Last-Mile Delivery" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Leveraging technology to optimise the final delivery phase, enhancing efficiency and reliability for industrial clients." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: LogisticsIndustrialSector, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "500" }) })
    ] })
  ] }) }) });
}
function KeySector$3() {
  useEffect(() => {
    new Swiper(".sector-sldr", {
      navigation: {
        nextEl: ".sector-swiper-button-next",
        prevEl: ".sector-swiper-button-prev"
      },
      slidesPerView: 3.1,
      spaceBetween: 40,
      breakpoints: {
        320: {
          slidesPerView: 1.1
        },
        768: {
          slidesPerView: 2.1
        },
        1024: {
          slidesPerView: 3.1
        }
      }
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "sector-sec section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250", children: [
    /* @__PURE__ */ jsx("div", { className: "ovrflw-hdn", children: /* @__PURE__ */ jsx("h2", { className: "sectr-ttl black js-split-text", children: "Key Sectors we work with" }) }),
    /* @__PURE__ */ jsxs("div", { className: "swiper sector-sldr", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "500", children: [
      /* @__PURE__ */ jsxs("div", { className: "pegination-arrow2", children: [
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-next cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M12 20H28", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M21 12L29 20L21 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", transform: "matrix(-1 0 0 1 41 0)", stroke: "#929292" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-prev cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M29 20H13", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M20 12L12 20L20 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", stroke: "#929292" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Science_and_Health_Care, alt: "Science_and_Health_Care" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Renewable Energy and Infrastructure Projects:  " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Powering the future with specialised logistics for the renewable energy and infrastructure sectors, where precision meets scale." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/renewable-energy-and-infrastructure-projects", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: RenewableEnergy, alt: "RenewableEnergy" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Manufacturing, Automotive, Technology, and Consumer Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Driving innovation through integrated logistics, keeping the wheels of industry turning smoothly." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/manufacturing-automotive-technology-and-consumer-goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Chemicals, alt: "Chemicals" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Agriculture, Chemicals, Construction, and Energy: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Cultivating success with tailored logistics for the essential sectors that fuel our world and build our futures." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/chemicals-construction-energy-and-agriculture", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Ecommerce$1, alt: "Ecommerce" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "E-commerce and Retail:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Revolutionising retail with cutting-edge logistics, delivering the future of commerce today." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/e-commerce-and-retail", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Arts, alt: "Arts" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Arts, Exhibitions, and Luxury Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Elevating the art of logistics for the world's treasures, ensuring every masterpiece arrives in perfect form." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/arts-exhibitions-and-luxury-Goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] }) }) });
}
function IndustrialSectorPage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Streamlined Industrial Logistics & Supply Chain Solutions | MRSSupplyChain" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Partner with MRSSupplyChain for comprehensive logistics solutions tailored for the industrial sector."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Industrial Logistics, Heavy Industry Supply Chain, Industrial Warehousing, Logistics for Industrial Goods, Efficient Industrial Transport"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(SectorSpotlight$3, {}),
    /* @__PURE__ */ jsx(SectorAbout$3, {}),
    /* @__PURE__ */ jsx(SectorSolutions$3, {}),
    /* @__PURE__ */ jsx(KeySector$3, {}),
    /* @__PURE__ */ jsx(innerCTA, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Warehousing_Solution$1 = "/assets/chemicals-ifHoFVIv.jpg";
function SectorSpotlight$2() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow chemical-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1 width-50", id: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "0", children: "Sector Solutions" }),
      /* @__PURE__ */ jsx("h1", { className: "js-split-text white", children: "Chemicals, Construction, Energy, and Agriculture " }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300", children: "Navigating the Complexities of Bulk Logistics in Key Economic Sectors" }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-in", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "300", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Sectors " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Agriculture, Chemicals, Construction, Energy" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Warehousing_Solution$1, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }) }) })
  ] }) });
}
function SectorAbout$2() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "roadRailAbt-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black tech-driven-numbrs1", children: [
    /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "Essential Logistics for Core Industries: Chemicals, Construction, Energy, and Agriculture" }),
    /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "200", children: "These foundational sectors of the global economy—agriculture, chemicals, construction, and energy—require specialised logistics solutions for the handling of bulk materials. MRS Supply Chain's expertise ensures that these critical resources are moved efficiently and safely." })
  ] }) }) });
}
const Inplant = "/assets/Chemical_Solutions-I60VlKXF.jpg";
function SectorSolutions$2() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow sectorSolution-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt black js-split-text key-fetr-ttl", children: "Specialised Solutions for the Safe and Efficient Movement of Bulk Materials" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$1, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row T-B-Padding B-padding-o ", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 solution-clm", children: [
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Liquid/Dry Bulk and Break-Bulk Cargo" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Tailored logistics solutions for the transportation of bulk materials, from liquids to granular products, essential for these industries." }),
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Duty-Free Warehousing" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Strategic warehousing solutions near major transportation hubs, facilitating the seamless movement of bulk goods in international trade." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: Inplant, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "500" }) })
    ] })
  ] }) }) });
}
function KeySector$2() {
  useEffect(() => {
    new Swiper(".sector-sldr", {
      navigation: {
        nextEl: ".sector-swiper-button-next",
        prevEl: ".sector-swiper-button-prev"
      },
      slidesPerView: 3.1,
      spaceBetween: 40,
      breakpoints: {
        320: {
          slidesPerView: 1.1
        },
        768: {
          slidesPerView: 2.1
        },
        1024: {
          slidesPerView: 3.1
        }
      }
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "sector-sec section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250", children: [
    /* @__PURE__ */ jsx("div", { className: "ovrflw-hdn", children: /* @__PURE__ */ jsx("h2", { className: "sectr-ttl black js-split-text", children: "Key Sectors we work with" }) }),
    /* @__PURE__ */ jsxs("div", { className: "swiper sector-sldr", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "500", children: [
      /* @__PURE__ */ jsxs("div", { className: "pegination-arrow2", children: [
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-next cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M12 20H28", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M21 12L29 20L21 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", transform: "matrix(-1 0 0 1 41 0)", stroke: "#929292" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-prev cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M29 20H13", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M20 12L12 20L20 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", stroke: "#929292" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Science_and_Health_Care, alt: "Science_and_Health_Care" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Renewable Energy and Infrastructure Projects:  " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Powering the future with specialised logistics for the renewable energy and infrastructure sectors, where precision meets scale." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/renewable-energy-and-infrastructure-projects", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: RenewableEnergy, alt: "RenewableEnergy" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Manufacturing, Automotive, Technology, and Consumer Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Driving innovation through integrated logistics, keeping the wheels of industry turning smoothly." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/manufacturing-automotive-technology-and-consumer-goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Industrial, alt: "Industrial" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Industrial Equipment:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Heavy-duty logistics for heavy-duty equipment, ensuring the backbone of industry remains strong and operational." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/industrial-sector", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Ecommerce$1, alt: "Ecommerce" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "E-commerce and Retail:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Revolutionising retail with cutting-edge logistics, delivering the future of commerce today." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/e-commerce-and-retail", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Arts, alt: "Arts" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Arts, Exhibitions, and Luxury Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Elevating the art of logistics for the world's treasures, ensuring every masterpiece arrives in perfect form." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/arts-exhibitions-and-luxury-Goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] }) }) });
}
function chemicalsPage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Integrated Logistics Solutions for Chemicals, Construction, Energy, & Agriculture | MRSSupplyChain" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Explore comprehensive logistics solutions for chemicals, construction, energy, and agriculture sectors with MRSSupplyChain."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Chemical Logistics, Construction Supply Chain, Energy Logistics, Agricultural Goods Transport, Hazardous Cargo Warehousing"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(SectorSpotlight$2, {}),
    /* @__PURE__ */ jsx(SectorAbout$2, {}),
    /* @__PURE__ */ jsx(SectorSolutions$2, {}),
    /* @__PURE__ */ jsx(KeySector$2, {}),
    /* @__PURE__ */ jsx(innerCTA, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Ecommerce = "/assets/E-commerce-cdnjKsW8.jpg";
function SectorSpotlight$1() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow eCom-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", id: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "0", children: "Sector Solutions" }),
      /* @__PURE__ */ jsx("h1", { className: "js-split-text white", children: "E-commerce and Retail " }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300", children: "Elevating Customer Satisfaction with Innovative Logistics Services" }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-in", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "300", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Sectors " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "E-commerce and Retail" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Ecommerce, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }) }) })
  ] }) });
}
function SectorAbout$1() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "roadRailAbt-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black tech-driven-numbrs1", children: [
    /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "Revolutionising E-commerce and Retail Logistics" }),
    /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "200", children: "The dynamic world of e-commerce and retail demands logistics solutions that can keep pace with rapid turnover and the expectation of prompt delivery. MRS Supply Chain's tech-driven services are designed to meet these challenges, ensuring customer satisfaction and operational excellence." })
  ] }) }) });
}
function SectorSolutions$1() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow sectorSolution-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt black js-split-text key-fetr-ttl", children: "Specialised Solutions for the Safe and Efficient Movement of Bulk Materials" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$1, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row T-B-Padding B-padding-o ", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 solution-clm", children: [
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Tech-Driven Last-Mile Delivery" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Innovative delivery solutions that address the fast-paced demands of e-commerce and retail, ensuring timely and accurate delivery to the end customer." }),
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Duty-Free Warehousing" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Flexible warehousing solutions that support the diverse storage and distribution needs of the retail sector, from inventory management to order fulfilment." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: Inplant$1, alt: "Inplant", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "500" }) })
    ] })
  ] }) }) });
}
function KeySector$1() {
  useEffect(() => {
    new Swiper(".sector-sldr", {
      navigation: {
        nextEl: ".sector-swiper-button-next",
        prevEl: ".sector-swiper-button-prev"
      },
      slidesPerView: 3.1,
      spaceBetween: 40,
      breakpoints: {
        320: {
          slidesPerView: 1.1
        },
        768: {
          slidesPerView: 2.1
        },
        1024: {
          slidesPerView: 3.1
        }
      }
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "sector-sec section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250", children: [
    /* @__PURE__ */ jsx("div", { className: "ovrflw-hdn", children: /* @__PURE__ */ jsx("h2", { className: "sectr-ttl black js-split-text", children: "Key Sectors we work with" }) }),
    /* @__PURE__ */ jsxs("div", { className: "swiper sector-sldr", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "500", children: [
      /* @__PURE__ */ jsxs("div", { className: "pegination-arrow2", children: [
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-next cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M12 20H28", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M21 12L29 20L21 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", transform: "matrix(-1 0 0 1 41 0)", stroke: "#929292" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-prev cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M29 20H13", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M20 12L12 20L20 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", stroke: "#929292" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Science_and_Health_Care, alt: "Science_and_Health_Care" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Renewable Energy and Infrastructure Projects:  " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Powering the future with specialised logistics for the renewable energy and infrastructure sectors, where precision meets scale." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/renewable-energy-and-infrastructure-projects", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: RenewableEnergy, alt: "RenewableEnergy" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Manufacturing, Automotive, Technology, and Consumer Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Driving innovation through integrated logistics, keeping the wheels of industry turning smoothly." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/manufacturing-automotive-technology-and-consumer-goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Industrial, alt: "Industrial" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Industrial Equipment:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Heavy-duty logistics for heavy-duty equipment, ensuring the backbone of industry remains strong and operational." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/industrial-sector", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Chemicals, alt: "Chemicals" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Agriculture, Chemicals, Construction, and Energy: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Cultivating success with tailored logistics for the essential sectors that fuel our world and build our futures." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/chemicals-construction-energy-and-agriculture", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Arts, alt: "Arts" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Arts, Exhibitions, and Luxury Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Elevating the art of logistics for the world's treasures, ensuring every masterpiece arrives in perfect form." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/arts-exhibitions-and-luxury-Goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] }) }) });
}
function EcommercePage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Optimized E-commerce Logistics & Retail Supply Chain Solutions | MRSSupplyChain" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Discover efficient logistics solutions for e-commerce and retail sectors with MRSSupplyChain."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "E-commerce Logistics, Retail Supply Chain, Online Retail Warehousing, Fast Retail Delivery, Efficient E-commerce Transport"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(SectorSpotlight$1, {}),
    /* @__PURE__ */ jsx(SectorAbout$1, {}),
    /* @__PURE__ */ jsx(SectorSolutions$1, {}),
    /* @__PURE__ */ jsx(KeySector$1, {}),
    /* @__PURE__ */ jsx(innerCTA, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const Warehousing_Solution = "/assets/manufacturing_sector-OQ3jQEpA.jpg";
function SectorSpotlight() {
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "service-spotlight custom-brokerage-sec section inner-spotlight-sec section-padd-LR overflow manufactr-hdr", children: [
    /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", id: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsx("h2", { className: "sldr-sub-ttl", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "0", children: "Sector Solutions" }),
      /* @__PURE__ */ jsx("h1", { className: "js-split-text white manufctr-ttl", children: "Manufacturing, Automotive, Technology, and Consumer Goods " }),
      /* @__PURE__ */ jsx("img", { src: Line$4, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }),
      /* @__PURE__ */ jsx("p", { className: "white", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300", children: "Powering Progress with Logistics Solutions" }),
      /* @__PURE__ */ jsxs("div", { className: "btn inner-spt-btn white", "data-aos": "fade-in", "data-aos-duration": "1000", "data-aos-once": "true", "data-aos-delay": "300", children: [
        /* @__PURE__ */ jsx("a", { className: "white-60", href: "/", children: "Home " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Sectors " }),
        " > ",
        /* @__PURE__ */ jsx("a", { className: "white-60", children: "Manufacturing, Automotive, Technology, and Consumer Goods" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "inner-img-sec", children: /* @__PURE__ */ jsx("div", { className: "inner-spot-clm-2", children: /* @__PURE__ */ jsx("img", { src: Warehousing_Solution, alt: "supplyChainImage", className: "lToR", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "300" }) }) })
  ] }) });
}
function SectorAbout() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "roadRailAbt-sec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 black tech-driven-numbrs1", children: [
    /* @__PURE__ */ jsx("h2", { className: "ttl-45px trusted-ttl js-split-text", children: "Driving Manufacturing and Consumer Goods Forward" }),
    /* @__PURE__ */ jsx("p", { className: "mob-mrgin-o", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "200", children: "The sectors of manufacturing, automotive, technology, and consumer goods are the backbone of the global economy, requiring integrated logistics solutions that support production and distribution. MRS Supply Chain offers a comprehensive suite of services to ensure these industries remain at the forefront of efficiency and innovation." })
  ] }) }) });
}
function SectorSolutions() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "custom-bonded-sec2 section-padd-LR overflow sectorSolution-sec", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 built-to-suit-container1", children: [
    /* @__PURE__ */ jsx("h3", { className: "we-offer-txt bond-txt black js-split-text key-fetr-ttl", children: "Streamlining Production and Distribution with Expert Solutions" }),
    /* @__PURE__ */ jsx("img", { className: "built-line-img", src: Line$1, alt: "Line", "data-aos": "fade-in", "data-aos-duration": "500", "data-aos-once": "true", "data-aos-delay": "" }),
    /* @__PURE__ */ jsxs("div", { className: "row built-row T-B-Padding B-padding-o ", children: [
      /* @__PURE__ */ jsxs("div", { className: "clm-2 solution-clm", children: [
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Regulatory Compliance and Documentation" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Navigating the intricate web of customs and international trade regulations is critical for these sectors, and MRS provides the expertise needed to ensure seamless operations." }),
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Tech-Driven Last-Mile Delivery" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Advanced delivery services tailored to the needs of fast-paced manufacturing and consumer goods sectors, enhancing supply chain efficiency." }),
        /* @__PURE__ */ jsx("h3", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Duty-Free Warehousing" }),
        /* @__PURE__ */ jsx("p", { "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "", children: "Strategic warehousing solutions that complement the manufacturing process, from raw materials storage to finished goods distribution, ensuring a smooth supply chain flow." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "clm-2 built-img-clm", children: /* @__PURE__ */ jsx("img", { src: MultiuserWarehousing$2, alt: "MultiuserWarehousing", "data-aos": "fade-in", "data-aos-duration": "600", "data-aos-once": "true", "data-aos-delay": "500" }) })
    ] })
  ] }) }) });
}
function KeySector() {
  useEffect(() => {
    new Swiper(".sector-sldr", {
      navigation: {
        nextEl: ".sector-swiper-button-next",
        prevEl: ".sector-swiper-button-prev"
      },
      slidesPerView: 3.1,
      spaceBetween: 40,
      breakpoints: {
        320: {
          slidesPerView: 1.1
        },
        768: {
          slidesPerView: 2.1
        },
        1024: {
          slidesPerView: 3.1
        }
      }
    });
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "sector-sec section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250", children: [
    /* @__PURE__ */ jsx("div", { className: "ovrflw-hdn", children: /* @__PURE__ */ jsx("h2", { className: "sectr-ttl black js-split-text", children: "Key Sectors we work with" }) }),
    /* @__PURE__ */ jsxs("div", { className: "swiper sector-sldr", "data-aos": "fade-in", "data-aos-duration": "800", "data-aos-once": "true", "data-aos-delay": "500", children: [
      /* @__PURE__ */ jsxs("div", { className: "pegination-arrow2", children: [
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-next cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M12 20H28", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M21 12L29 20L21 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", transform: "matrix(-1 0 0 1 41 0)", stroke: "#929292" })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "sector-swiper-button-prev cursor", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "41", height: "41", viewBox: "0 0 41 41", fill: "none", children: /* @__PURE__ */ jsxs("g", { opacity: "0.7", children: [
          /* @__PURE__ */ jsx("path", { d: "M29 20H13", stroke: "#929292", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M20 12L12 20L20 28", stroke: "#929292", strokeLinecap: "round" }),
          "    ",
          /* @__PURE__ */ jsx("circle", { cx: "20.5", cy: "20.5", r: "20", stroke: "#929292" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "swiper-wrapper", children: [
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Science_and_Health_Care, alt: "Science_and_Health_Care" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Renewable Energy and Infrastructure Projects:  " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Powering the future with specialised logistics for the renewable energy and infrastructure sectors, where precision meets scale." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/renewable-energy-and-infrastructure-projects", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Industrial, alt: "Industrial" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Industrial Equipment:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Heavy-duty logistics for heavy-duty equipment, ensuring the backbone of industry remains strong and operational." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/industrial-sector", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Chemicals, alt: "Chemicals" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Agriculture, Chemicals, Construction, and Energy: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Cultivating success with tailored logistics for the essential sectors that fuel our world and build our futures." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/chemicals-construction-energy-and-agriculture", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Ecommerce$1, alt: "Ecommerce" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "E-commerce and Retail:" }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Revolutionising retail with cutting-edge logistics, delivering the future of commerce today." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/e-commerce-and-retail", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "swiper-slide", children: /* @__PURE__ */ jsxs("div", { className: "sector-bx", children: [
          /* @__PURE__ */ jsx("img", { src: Arts, alt: "Arts" }),
          /* @__PURE__ */ jsxs("div", { className: "content-dv", children: [
            /* @__PURE__ */ jsx("h2", { children: "Arts, Exhibitions, and Luxury Goods: " }),
            /* @__PURE__ */ jsxs("div", { className: "inner-content-dv", children: [
              /* @__PURE__ */ jsx("p", { children: "Elevating the art of logistics for the world's treasures, ensuring every masterpiece arrives in perfect form." }),
              /* @__PURE__ */ jsx("a", { className: "btn grey", id: "btn-styl", href: "/sector/arts-exhibitions-and-luxury-Goods", children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" }) })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] }) }) });
}
function ManufacturingPage() {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "Supply Chain Solutions for Manufacturing & Consumer Goods | MRSSupplyChain" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Discover optimized logistics solutions for manufacturing, automotive, technology, and consumer goods industries with MRSSupplyChain."
        }
      ),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "keywords",
          content: "Manufacturing Logistics, Automotive Supply Chain, Technology Goods Logistics, Consumer Goods Warehousing, Efficient Supply Chain for Manufacturing"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx(SectorSpotlight, {}),
    /* @__PURE__ */ jsx(SectorAbout, {}),
    /* @__PURE__ */ jsx(SectorSolutions, {}),
    /* @__PURE__ */ jsx(KeySector, {}),
    /* @__PURE__ */ jsx(innerCTA, {}),
    /* @__PURE__ */ jsx(formSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const BlogArchive = () => {
  useEffect(() => {
    function handleAnimation(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      let split = new SplitType(target, {
        split: "lines"
      });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    document.querySelectorAll(".js-split-text").forEach((element) => {
      let observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.5
      });
      observer.observe(element);
    });
    AOS.init();
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: "News & Blog - MRS" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Latest Happenings" })
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx("div", { className: "section inner-spotlight-sec section-padd-LR overflow blogarchive-sec", children: /* @__PURE__ */ jsx("div", { className: "main-container width-1250 flex", children: /* @__PURE__ */ jsxs("div", { className: "inner-spot-clm-1", children: [
      /* @__PURE__ */ jsx("h1", { className: "js-split-text white", children: "News & Blog" }),
      /* @__PURE__ */ jsx(
        "h2",
        {
          className: "sldr-sub-ttl blg-sub-ttl",
          "data-aos": "fade-up",
          "data-aos-duration": "800",
          "data-aos-once": "true",
          "data-aos-delay": "400",
          children: "Latest Happenings"
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "btn inner-spt-btn white",
          "data-aos": "fade-up",
          "data-aos-duration": "1000",
          "data-aos-once": "true",
          "data-aos-delay": "600",
          children: [
            /* @__PURE__ */ jsxs("a", { className: "white-60", href: "/", children: [
              "Home",
              " "
            ] }),
            " > ",
            /* @__PURE__ */ jsx("a", { className: "white-60", children: "News & Blog" })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "blog-archive-sec section-padd-LR", children: /* @__PURE__ */ jsx("div", { className: "main-container", children: /* @__PURE__ */ jsx("div", { className: "blog-bx", children: /* @__PURE__ */ jsx("div", { className: "blg-content-dv", children: /* @__PURE__ */ jsx("ul", { className: "blg-list", children: postsData.map((post) => /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: post.featureImage,
          className: "featureImg",
          alt: post.imgAltTag
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "date-box", children: /* @__PURE__ */ jsxs("p", { children: [
        post.category,
        " · ",
        post.publishDate
      ] }) }),
      /* @__PURE__ */ jsx("h2", { className: "post-ttl", children: post.title }),
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "btn grey",
          id: "btn-styl",
          href: `/blog/${post.slug}`,
          children: /* @__PURE__ */ jsx("span", { className: "btn_name", children: "Read more" })
        }
      )
    ] }, post.id)) }) }) }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const date_icon_white = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.83203%202.20801V5.14551'%20stroke='white'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.668%202.20801V5.14551'%20stroke='white'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M3.42578%209.15039H20.0716'%20stroke='white'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M20.5625%208.57259V16.8955C20.5625%2019.833%2019.0938%2021.7913%2015.6667%2021.7913H7.83333C4.40625%2021.7913%202.9375%2019.833%202.9375%2016.8955V8.57259C2.9375%205.63509%204.40625%203.67676%207.83333%203.67676H15.6667C19.0938%203.67676%2020.5625%205.63509%2020.5625%208.57259Z'%20stroke='white'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.3689%2013.6648H15.3777'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.3689%2016.6023H15.3777'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M11.7458%2013.6648H11.7546'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M11.7458%2016.6023H11.7546'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.1228%2013.6648H8.13159'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.1228%2016.6023H8.13159'%20stroke='white'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const PostDetails = ({
  title,
  content,
  featureImage,
  featureImage1,
  category,
  publishDate,
  metaTitle,
  metaDescription,
  ogImage,
  schema
}) => {
  const [pgUrl, setPgUrl] = useState("");
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;
    setPgUrl(window.location.href);
    function handleAnimation(entries, observer2) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          animateText(entry.target);
          observer2.unobserve(entry.target);
        }
      });
    }
    function animateText(target) {
      if (typeof SplitType === "undefined" || typeof gsap === "undefined")
        return;
      let split = new SplitType(target, { split: "lines" });
      let tl = gsap.timeline();
      tl.from(split.lines, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: 0.2
      });
    }
    const observer = new IntersectionObserver(handleAnimation, {
      threshold: 0.5
    });
    document.querySelectorAll(".js-split-text").forEach((element) => {
      observer.observe(element);
    });
    if (typeof AOS !== "undefined")
      AOS.init();
  }, []);
  const altText = featureImage ? featureImage.split("/").pop().replace(/\.[^/.]+$/, "") : "feature-image";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: metaTitle }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: metaDescription }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: metaTitle }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: metaDescription }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) })
    ] }),
    /* @__PURE__ */ jsx(Header2, {}),
    /* @__PURE__ */ jsx("div", { className: "blogInside-spotlgtSec section-padd-LR overflow", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1250 ", children: [
      /* @__PURE__ */ jsx("h5", { className: "white", children: category }),
      /* @__PURE__ */ jsx("h1", { className: "white", children: title }),
      /* @__PURE__ */ jsxs("div", { className: "date-bx", children: [
        /* @__PURE__ */ jsx("img", { src: date_icon_white, alt: "date_icon_white" }),
        /* @__PURE__ */ jsx("p", { className: "white", children: publishDate })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "blogInside-contntSec section-padd-LR", children: /* @__PURE__ */ jsxs("div", { className: "main-container width-1100 flex", children: [
      /* @__PURE__ */ jsx("img", { src: featureImage, alt: altText, className: "featureImg-inside" }),
      /* @__PURE__ */ jsx("div", { className: "width-10", children: /* @__PURE__ */ jsx("div", { className: "share-icn", children: pgUrl && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(FacebookShareButton, { url: pgUrl, quote: "Hello", children: /* @__PURE__ */ jsx(FacebookIcon, { size: 30, round: true }) }),
        /* @__PURE__ */ jsx(LinkedinShareButton, { url: pgUrl, children: /* @__PURE__ */ jsx(LinkedinIcon, { size: 30, round: true }) }),
        /* @__PURE__ */ jsx(TwitterShareButton, { url: pgUrl, children: /* @__PURE__ */ jsx(XIcon, { size: 30, round: true }) })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "width-90 blg-cntnt", children: [
        /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: content } }),
        /* @__PURE__ */ jsx("a", { href: "/blog", className: "blg_back_btn", children: "< Back to blog page" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };
  const closePopup = () => setIsPopupOpen(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "popupParent", children: /* @__PURE__ */ jsx("button", { className: "quote-button", onClick: openPopup, children: "Let's Connect" }) }),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Homepage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(Aboutpage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/careers", element: /* @__PURE__ */ jsx(Contactpage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contact-us", element: /* @__PURE__ */ jsx(Contactpage$1, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/privacy-policy", element: /* @__PURE__ */ jsx(Privacypage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/safety-policy", element: /* @__PURE__ */ jsx(SafetyPage, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/services/multiuser-warehousing",
          element: /* @__PURE__ */ jsx(multiuserWarehousing$1, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/services/road-and-rail-transport",
          element: /* @__PURE__ */ jsx(RoadRailTransport, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/services/pioneering-duty-free-warehousing-solutions",
          element: /* @__PURE__ */ jsx(PioneeringWarehousing, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/services/in-plant-warehouse-management",
          element: /* @__PURE__ */ jsx(multiuserWarehousing, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/services/customs-brokerage-and-regulatory-compliance",
          element: /* @__PURE__ */ jsx(CustomsBrokerageCompliance, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/services/import-management",
          element: /* @__PURE__ */ jsx(ImportanMagement, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/services/tech-driven-last-mile-delivery-services",
          element: /* @__PURE__ */ jsx(TechDrivenService, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/sector/arts-exhibitions-and-luxury-Goods",
          element: /* @__PURE__ */ jsx(ArtsPage, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/sector/renewable-energy-and-infrastructure-projects",
          element: /* @__PURE__ */ jsx(RenewableEnergyPage, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/sector/industrial-sector",
          element: /* @__PURE__ */ jsx(IndustrialSectorPage, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/sector/chemicals-construction-energy-and-agriculture",
          element: /* @__PURE__ */ jsx(chemicalsPage, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/sector/e-commerce-and-retail",
          element: /* @__PURE__ */ jsx(EcommercePage, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/sector/manufacturing-automotive-technology-and-consumer-goods",
          element: /* @__PURE__ */ jsx(ManufacturingPage, {})
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(BlogArchive, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/blog/:slug",
          element: /* @__PURE__ */ jsx(DynamicPostDetails, { postsData })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(QuoteForm, { isOpen: isPopupOpen, togglePopup: closePopup })
  ] });
};
const DynamicPostDetails = ({ postsData: postsData2 }) => {
  const { slug } = useParams();
  const post = postsData2.find((p) => p.slug === slug);
  if (!post)
    return /* @__PURE__ */ jsx("div", { children: "Post not found" });
  return /* @__PURE__ */ jsx(
    PostDetails,
    {
      title: post.title,
      content: post.content,
      featureImage: post.featureImage,
      category: post.category,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      ogImage: post.ogImage,
      schema: post.schema,
      publishDate: post.publishDate
    }
  );
};
function render(url, manifest) {
  const helmetContext = {};
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) })
  );
  const { helmet } = helmetContext;
  return {
    html: appHtml,
    helmet: {
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      link: helmet.link.toString(),
      script: helmet.script.toString()
    }
  };
}
export {
  render
};
