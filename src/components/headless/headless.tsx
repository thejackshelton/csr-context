import {
	component$,
	createContextId,
	type Signal,
	Slot,
	useContext,
	useContextProvider,
	useSignal,
	useTask$,
} from "@builder.io/qwik";

type Context = {
	isChild: Signal<boolean>;
};

const headlessContextId = createContextId<Context>("headless-comp");

export const Root = component$(() => {
	const isChild = useSignal(false);

	const context: Context = {
		isChild,
	};

	useContextProvider(headlessContextId, context);

	return (
		<div>
			<Slot />
			<p>
				Does Root render function know about isChild?{" "}
				{context.isChild.value ? "Yes" : "No"}
			</p>
		</div>
	);
});

export const Child = component$(() => {
	const context = useContext(headlessContextId);

	useTask$(() => {
		context.isChild.value = true;
	});

	return (
		<div>
			<Slot />
		</div>
	);
});

export const Headless = {
	Root,
	Child,
};
