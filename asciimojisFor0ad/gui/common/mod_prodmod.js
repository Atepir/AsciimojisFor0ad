autociv_patchApplyN("hasSameMods", function (target, that, args)
{
	let mod = ([name, _version]) => !/^asciimojisFor0ad*/i.test(name);
	return target.apply(that, args.map(mods => mods.filter(mod)));
})
