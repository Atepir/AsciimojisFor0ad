## Variables
PWD = $(shell pwd)
# Primary output
PRIMOUT = AsciimojisFor0ad.zip
# Final and complete output for a quick install
OUT = $(PWD)/out/mod.zip
SRC = asciimojisFor0ad/*

## Flags
ZFLAGS = -r

## BIN TARGETS
$(OUT): $(PRIMOUT) mod.json
	zip $(ZFLAGS) $(OUT) $(PRIMOUT) mod.json && rm $(PRIMOUT)

$(PRIMOUT): $(SRC)
	zip $(ZFLAGS) $(PRIMOUT) $(SRC)

## OTHER TARGETS
clean:
	rm -Rf $(OUT) $(PWD)/out/*
