type OperatorFunction = (a: number, b: number) => number;

type Element = {type: 'value', value: number } | {type: 'operator', fn: OperatorFunction};

const OPERATOR_FUNCTIONS: {[op: string]: OperatorFunction} = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
};

function parseElement(s: string): Element {
    const fn = OPERATOR_FUNCTIONS[s];
    return fn ? {type: 'operator', fn} : {type: 'value', value: parseInt(s, 10)};
}

export default function exaluate(rpn: string): number {
    const elements = rpn.split(',').map(parseElement);
    const stack: number[] = [];

    for (const element of elements) {
        if (element.type === 'value') {
            stack.push(element.value);
        } else {
            if (stack.length < 2) {
                throw new Error('Invalid RPN expression ' + rpn);
            }
            const [b, a] = [stack.pop()!, stack.pop()!];
            stack.push(element.fn(a, b));
        }
    }

    if (stack.length !== 1) {
        throw new Error('Invalid RPN expression ' + rpn);
    }

    return stack[0];
}
