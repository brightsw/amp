del messages.txt
type messages-*.txt>>messages.txt
del ..\..\messages_en_US.properties
native2ascii -encoding UTF-8 messages.txt ..\..\messages_en_US.properties

del ui.txt
echo { >>ui.txt
type ui-*.txt>>ui.txt
echo.>>ui.txt
echo "ui.end": "end" >>ui.txt
echo } >>ui.txt
del ..\..\..\..\webapp\api\langs\en-US.json
type ui.txt>>..\..\..\..\webapp\api\langs\en-US.json