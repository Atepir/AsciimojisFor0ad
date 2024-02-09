## Variables
PWD = $(shell pwd)
# Primary output
PRIMOUT = asciimojis.zip
# Final and complete output for a quick install
OUT = $(PWD)/mod.zip
SRC = gui/* mod.json

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
