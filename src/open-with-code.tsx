import {
  Action,
  ActionPanel,
  Icon,
  List,
  Toast,
  clearSearchBar,
  closeMainWindow,
  popToRoot,
  showToast,
} from "@raycast/api";
import { useMemo, useState } from "react";
import { fetchGhqList } from "./utils/ghq";
import { openWithCode } from "./utils/code";

export default function Command() {
  const [query, setQuery] = useState<string>("");

  const ghqList = useMemo(() => fetchGhqList(query), [query]);

  return (
    <List onSearchTextChange={setQuery} isShowingDetail>
      {ghqList?.map((ghq) => (
        <List.Item
          icon={ghq.icon}
          key={ghq.fullPath}
          title={ghq.subPath}
          detail={<List.Item.Detail markdown={ghq.readme} />}
          actions={
            <ActionPanel>
              <Action
                title={"Open With Code"}
                icon={Icon.Code}
                onAction={async () => {
                  openWithCode(ghq.fullPath);
                  await showToast({ style: Toast.Style.Success, title: "Success", message: "Open VS Code" });
                  await clearSearchBar({ forceScrollToTop: true });
                  await popToRoot({ clearSearchBar: true });
                  await closeMainWindow({ clearRootSearch: true });
                }}
              ></Action>
              <Action.ShowInFinder path={ghq.fullPath}></Action.ShowInFinder>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
