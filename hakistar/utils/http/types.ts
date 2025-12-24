export interface RequestConfig {
	url:string;
	method?:"GET" | "POST";
	data?:any;
	header?:Record<string,string>
}