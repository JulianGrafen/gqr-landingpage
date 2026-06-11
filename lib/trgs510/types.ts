export type Trgs510ResultCode =
  | '+'
  | '-'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8';

export type Trgs510Status = 'allowed' | 'restricted' | 'forbidden';

export type Trgs510Severity = 'green' | 'yellow' | 'red';

export type StorageClassId =
  | '1'
  | '2 A'
  | '2 B'
  | '3'
  | '4.1 A'
  | '4.1 B'
  | '4.2'
  | '4.3'
  | '5.1 A'
  | '5.1 B'
  | '5.1 C'
  | '5.2'
  | '6.1 A'
  | '6.1 B'
  | '6.1 C'
  | '6.1 D'
  | '6.2'
  | '7'
  | '8 A'
  | '8 B'
  | '10-13'
  | '10*'
  | '11*'
  | '12*'
  | '13*';

export interface StorageClass {
  id: StorageClassId;
  label: string;
  shortDescription: string;
  searchTerms: string[];
}

export type Trgs510Matrix = Record<StorageClassId, Record<StorageClassId, Trgs510ResultCode>>;

export interface Trgs510RuleExplanation {
  code: Trgs510ResultCode;
  status: Trgs510Status;
  severity: Trgs510Severity;
  label: string;
  shortText: string;
  detail: string;
  sourceReference: string;
}

export interface Trgs510CheckResult extends Trgs510RuleExplanation {
  firstClass: StorageClass;
  secondClass: StorageClass;
}
