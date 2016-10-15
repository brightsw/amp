del messages.txt
type messages-*.txt>>messages.txt
del ..\..\messages_zh_CN.properties
native2ascii -encoding UTF-8 messages.txt ..\..\messages_zh_CN.properties

del ui.txt
echo { >>ui.txt
type ui-*.txt>>ui.txt
echo.>>ui.txt
echo "ui.end": "end" >>ui.txt
echo } >>ui.txt
del ..\..\..\..\webapp\api\langs\zh-CN.json
type ui.txt>>..\..\..\..\webapp\api\langs\zh-CN.json