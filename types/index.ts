import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Product {
  Id: string;
  style: string;
  customer: string;
  color: string[];
  unitPrice: number;
  startDate: string;
}

export interface Stage {
  stageID: string;
  productId: string;
  stageName: string;
  timeWork: number;
  description: string;
  unitPriceSecond: number;
  unitPriceProductivity: number;
  unitPriceMain: number;
  department: number;
  Product: {
    style: string;
    customer: string;
  };
  Department: {
    departmentName: string;
  }
}

