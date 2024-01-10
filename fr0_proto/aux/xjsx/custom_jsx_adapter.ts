type IDestJsxFn = any;
type IVNodeTag = string | IComponentFn;
type IKey = string | undefined;

type IClassName = string | false | undefined;

type IComponentFn = Function;

type IPropsIfValue = object | any[] | string | boolean | undefined;
type IPropsQValue = string | false | (string | false | undefined)[];

type IComponentPropsExtra = {
  if?: IPropsIfValue;
  q?: IPropsQValue;
};

const enclose = <T>(item: T | T[]): T[] => Array.isArray(item) ? item : [item];

function cx(...classNames: IClassName[]) {
  return classNames.filter((it) => !!it).join(" ");
}

function addClassNamesToProps(props: any, ...classNames: IClassName[]) {
  return { ...props, class: cx(props.class, ...classNames) };
}

export function customJsxAdapter(
  destJsxFn: IDestJsxFn,
  tag: IVNodeTag,
  props: IComponentPropsExtra,
  key: IKey,
) {
  if ("if" in props && !props.if) return null;
  const { q: propsQ, ...restProps } = props;

  if (typeof tag === "function" && propsQ) {
    const originalFunctionComponent = tag;
    tag = (props: IComponentPropsExtra) => {
      const res = originalFunctionComponent(props);
      if (res === null) return null;
      res.props = addClassNamesToProps(res.props, ...enclose(propsQ));
      return res;
    };
  }

  let modProps = props;
  if (typeof tag !== "function" && propsQ) {
    modProps = addClassNamesToProps(restProps, ...enclose(propsQ));
  }

  return destJsxFn(tag, modProps, key);
}
