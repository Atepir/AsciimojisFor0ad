## Variables
PWD = $(shell pwd)
OUT = $(PWD)out/AsciimojisFor0ad.zip
# Final and complete output for a quick install
OUT2 = $(PWD)out/mod.zip
SRC = AsciimojisFor0ad

## Flags
ZFLAGS = -r

## BIN TARGETS
$(OUT): $(SRC)
	zip $(ZFLAGS) $(OUT) $(SRC)

$(OUT2): $(OUT) mod.json
	zip $(ZFLAGS) $(OUT2) $(OUT) mod.json

## OTHER TARGETS
clean:
	rm -Rf $(OUT)