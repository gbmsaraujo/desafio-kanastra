import pandas as pd


class PandasDriver:
    def __init__(self) -> None:
        self.__pd = pd

    def create_csv_dataframe(self, data) -> pd.DataFrame:
        try:
            df = self.__pd.read_csv(data)
            return df
        except Exception as e:
            raise Exception(f"Impossível criar dataframe_csv, erro: {str(e)}")
