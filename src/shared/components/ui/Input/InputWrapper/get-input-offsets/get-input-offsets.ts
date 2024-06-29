export function getInputOffsets(
    inputWrapperOrder: ('label' | 'input' | 'error')[],
    { hasError }: { hasError: boolean },
) {
    const inputIndex = inputWrapperOrder.findIndex((part) => part === 'input');
    const aboveInput = inputWrapperOrder.slice(0, inputIndex);
    const belowInput = inputWrapperOrder.slice(inputIndex + 1);
    const offsetTop =
        (hasError && aboveInput.includes('error'));
    const offsetBottom =
        (hasError && belowInput.includes('error'));
    return { offsetBottom, offsetTop };
}