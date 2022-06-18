const DemoElementBackgroundColor = (props: IDemoElementGridProps) => {
    const {moduleAttribute, moduleRule, cssFabricClassName} = props;

    return <div className={cssFabricClassName + ' w-sm-auto w-8 h-sm-2 h-8 pad-1 overflow-none border'}>
    <div className={"text-ellipsis"}>{cssFabricClassName}</div>
    </div>
}