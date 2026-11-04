export type InputConfig = {
    tag: 'input' | 'textarea';
    htmlType?: string;
    multiline?: boolean;
    props?: Record<string, unknown>;
};

export const inputRegistry = {
    text: { tag: 'input', htmlType: 'text' },
    number: { tag: 'input', htmlType: 'number' },
    email: { tag: 'input', htmlType: 'email' },
    password: { tag: 'input', htmlType: 'password' },
    date: { tag: 'input', htmlType: 'date' },
    time: { tag: 'input', htmlType: 'time' },
    textarea: { tag: 'textarea', multiline: true, props: { rows: 4 } },
} as const satisfies Record<string, InputConfig>;

export type InputType = keyof typeof inputRegistry;
