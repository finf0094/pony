export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AlignType = 'left' | 'center' | 'right';
export type FontWeightType = '300' | '400' | '500' | '600' | '700';
export type JustifyType =
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

export interface HasAlign {
    align?: AlignType;
}

export interface HasFullWidth {
    fullWidth?: boolean;
}

export interface HasFontWeight {
    fontWeight?: FontWeightType;
}

export interface HasJustify {
    justify?: JustifyType;
}


