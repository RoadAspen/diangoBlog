// /**
//  * tezign ownership
//  * @owner weichenchen
//  * @team N1
//  */
// import { EContentType, IObject, NMTemplate } from '@tezign-intelligence-common-product/interfaces/lib';
// import { DetailTemplateRender } from '@tezign/nebula';
// import React, { Fragment, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

// export function recursionMap<T extends NMTemplate.TLayouts>(tree: T[], fn: (data: any) => ReactNode): ReactNode {
//   return tree
//     .map((item, index) => {
//       if (item.contentType === EContentType.WRAPPER) {
//         return recursionMap(item.list || [], fn);
//       }
//       if (item.contentType === EContentType.LAYOUT) {
//         return recursionMap(item.list || [], fn);
//       }
//       return <Fragment key={index}>{fn(item)}</Fragment>;
//     })
//     .flat();
// }

// interface Props {
//   initData: any;
//   property: number;
//   sceneCode: string;
//   isShowNewTrack: Boolean;
// }

// export default function TemplateSimple(props: Props) {
//   const { initData, property, sceneCode, isShowNewTrack } = props;
//   const [template, setTemp] = useState<NMTemplate.IDetail>();
//   const tempR = useRef<DetailTemplateRender>();

//   const renderContent = useCallback((item: NMTemplate.ILayoutGroup | NMTemplate.ILayoutControl) => {
//     if (item.contentType === EContentType.GROUP) {
//       return tempR.current?.render((item as NMTemplate.ILayoutGroup).modelName, item.mode);
//     }
//     return tempR.current?.render((item as NMTemplate.ILayoutControl).code, item.mode);
//   }, []);

//   // 模板初始化
//   const initTemplate = useCallback(
//     (initData?: IObject) => {
//       const detailTemplateR = new DetailTemplateRender({
//         sceneCode,
//         subType: '1',
//         onChange() {},
//         extraProp: {
//           property,
//           is_show_new_track: isShowNewTrack,
//           initData: initData,
//         },
//       });

//       detailTemplateR.init().then(async (mTemplate) => {
//         await detailTemplateR.setValue(initData || {});
//         // console.log("detailTemplateR", detailTemplateR);
//         // console.log("mTemplate", mTemplate);
//         tempR.current = detailTemplateR;
//         setTemp(mTemplate);
//       });
//     },
//     [property, sceneCode, isShowNewTrack],
//   );

//   useEffect(() => {
//     // 编辑
//     initTemplate(initData);
//   }, [initTemplate, initData]);
//   return <div>{template && recursionMap(template.groupList, renderContent)}</div>;
// }
