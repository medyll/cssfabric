<script lang="ts">
  export let moduleAttribute, moduleRule, cssFabricClassName;

</script>


<div class={"flex-h flex-wrap relative"}>
    <div class={"h-16 w-64"}>
        <div class={"h-full flex-v overflow-j relative"}>
            <h5 class={"border-b-1 pad-tb-4"}>table : {cssFabricClassName}</h5>
            <div class={"flex-main  overflow-auto marg-t-4"}>
                <table class={"table tbl-layout  w-full tbl-" + cssFabricClassName}>
                    <thead>
                    <tr>
                        <!--{[...Array(6)].map((name, val) => (
                                <th>Title</th>
                        ))}-->
                    </tr>
                    </thead>
                    <tbody>
                    <!--{[...Array(30)].map((name, val) => (
                        <tr key={val}>
                            {[...Array(6)].map((name, val) => (
                                    <td>{val + 1}</td>
                            ))}
                        </tr>
                    ))}-->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
 